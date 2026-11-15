export const dynamic = "force-static";

export default function manifest() {
  return {
    name: "Vikas Consulting & Web Solutions",
    short_name: "VikasConsult",
    description:
      "Enterprise cloud architecture, Appwrite backend services, and high-performance Next.js web applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFB",
    theme_color: "#FD366E",
    icons: [
      {
        src: "/appwrite.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
