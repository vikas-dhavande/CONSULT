"use client";

export async function triggerWebsiteRefresh(
  message = "Refreshing Animations & Pipeline…"
) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("website-refresh", { detail: { message } })
    );
  }
  // Brief delay for refresh animation feedback
  await new Promise((resolve) => setTimeout(resolve, 600));
}
