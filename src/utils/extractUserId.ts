export default function extractUserId(id: string) {
  let tag = "@";
  return tag + id.split("@")[0];
}
