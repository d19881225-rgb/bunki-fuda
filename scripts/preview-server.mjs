import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../out");
const prefix = "/bunki-fuda";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method ?? "")) { response.writeHead(405).end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname === "/" || pathname === prefix) { response.writeHead(302, { Location: `${prefix}/` }).end(); return; }
    if (!pathname.startsWith(`${prefix}/`)) { response.writeHead(404).end(); return; }
    let path = resolve(root, `.${pathname.slice(prefix.length)}`);
    if (!path.startsWith(`${root}${sep}`) && path !== root) { response.writeHead(403).end(); return; }
    if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
    const content = await readFile(path);
    response.writeHead(200, { "Content-Type": types[extname(path)] ?? "application/octet-stream", "Cache-Control": "no-store" });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(await readFile(resolve(root, "404.html")).catch(() => "Not found"));
  }
}).listen(4318, "127.0.0.1", () => console.log("Preview: http://127.0.0.1:4318/bunki-fuda/"));
