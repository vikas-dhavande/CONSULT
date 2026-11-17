import "./app.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://vikas-consult.pages.dev";
const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME ||
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME ||
  "Vikas";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Cloud Architecture & Appwrite Integration`,
    template: `%s | ${siteName}`,
  },
  description:
    `Enterprise-grade cloud consulting, full-stack solutions, and seamless Appwrite backend integration built on Next.js.`,
  keywords: [
    "Appwrite",
    "Next.js",
    "Cloud Consulting",
    "Web Architecture",
    "API Integration",
    siteName,
    "Serverless",
    "Jamstack",
    "Cloudflare Pages",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteName} | Cloud Architecture & Appwrite Integration`,
    description:
      `Enterprise-grade cloud consulting, full-stack solutions, and seamless Appwrite backend integration built on Next.js.`,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: "/appwrite.svg",
        width: 800,
        height: 600,
        alt: "Vikas Consulting Appwrite Integration",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikas Consulting | Cloud Architecture & Appwrite Integration",
    description:
      "Enterprise-grade cloud consulting, full-stack solutions, and seamless Appwrite backend integration built on Next.js.",
    images: ["/appwrite.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/appwrite.svg",
    shortcut: "/appwrite.svg",
    apple: "/appwrite.svg",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/appwrite.svg`,
        sameAs: ["https://cloud.appwrite.io"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description:
          "Enterprise-grade cloud consulting and Appwrite backend integration.",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/appwrite.svg" />
        <link rel="icon" type="image/svg+xml" href="/appwrite.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:opsz,wght@14..32,100..900&family=Poppins:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={"min-h-screen bg-background text-foreground font-[Inter] text-sm antialiased flex flex-col justify-between"}
      >
        <Navbar />
        <div className="flex-1 w-full flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
