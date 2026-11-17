export const dynamic = "force-static";

export default function sitemap() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://consult-jade.vercel.app";

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
