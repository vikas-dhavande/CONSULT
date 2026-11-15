export async function clearCookieAction(name) {
  if (typeof document !== "undefined") {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;`;
  }
  return { success: true };
}
