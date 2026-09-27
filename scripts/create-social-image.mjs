import sharp from "sharp";
import { fileURLToPath } from "node:url";

await sharp(fileURLToPath(new URL("../public/social-preview.svg", import.meta.url)))
  .png().toFile(fileURLToPath(new URL("../public/social-preview.png", import.meta.url)));
