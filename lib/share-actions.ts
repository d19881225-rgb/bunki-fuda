type WriteText = (url: string) => Promise<void>;
type NativeShare = (data: { title: string; url: string }) => Promise<void>;
export type ShareResult = { kind: "shared" | "cancelled" | "copied" } | { kind: "manual"; url: string };

export async function copyLink(url: string, writeText?: WriteText): Promise<ShareResult> {
  try {
    if (!writeText) return { kind: "manual", url };
    await writeText(url);
    return { kind: "copied" };
  } catch { return { kind: "manual", url }; }
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
