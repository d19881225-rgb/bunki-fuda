type WriteText = (text: string) => Promise<void>;
type NativeShare = (data: { title: string; url: string }) => Promise<void>;
export type ShareResult = { kind: "shared" | "cancelled" | "copied" } | { kind: "manual"; url: string };
export type CopyResult = { kind: "copied" } | { kind: "manual"; text: string };

export async function copyText(text: string, writeText?: WriteText): Promise<CopyResult> {
  try {
    if (!writeText) return { kind: "manual", text };
    await writeText(text);
    return { kind: "copied" };
  } catch { return { kind: "manual", text }; }
}

export async function copyLink(url: string, writeText?: WriteText): Promise<ShareResult> {
  const result = await copyText(url, writeText);
  return result.kind === "manual" ? { kind: "manual", url: result.text } : result;
}

export async function shareLink(title: string, url: string, nativeShare?: NativeShare, writeText?: WriteText): Promise<ShareResult> {
  if (!nativeShare) return copyLink(url, writeText);
  try {
    await nativeShare({ title, url });
    return { kind: "shared" };
  } catch (error) {
    if (typeof error === "object" && error !== null && "name" in error && error.name === "AbortError") return { kind: "cancelled" };
    return copyLink(url, writeText);
  }
}
