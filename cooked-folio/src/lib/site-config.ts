import { Metadata } from "next";

// =================================================================================
// 1. BASE CONFIGURATION
// =================================================================================

const BASE_URL =
  process.env.NEXT_PUBLIC_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
export const siteConfig = {
  name: "Rohith N R",
  username: "Not4Rohith",

  // SEO-friendly description
  description:
    "Computer Science student building AI-powered web applications with Python, FastAPI, Next.js, Machine Learning and C++.",

  url: BASE_URL,

  ogImage: "/og-image.png?v1",

  links: {
    twitter: "https://x.com/NotRohith4",
    github: "https://github.com/not4rohith",
    linkedin:
      "https://www.linkedin.com/in/rohith-n-r-not4rohith",
    instagram:
      "https://www.instagram.com/not_rohith.44",
  },
};

// =================================================================================
// 2. METADATA GENERATOR
// =================================================================================

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string | Array<any>;
  noIndex?: boolean;
}

export function constructMetadata({
  title = "Rohith N R | Software Engineer Portfolio",
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    // =================================================================================
    // BASIC SEO
    // =================================================================================

    title: {
      default: title,
      template: "%s",
    },

    description,

    metadataBase: new URL(siteConfig.url),

    // =================================================================================
    // OPEN GRAPH (Discord, WhatsApp, Facebook, LinkedIn)
    // =================================================================================

    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: "Rohith N R",
      locale: "en_US",
      type: "website",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // =================================================================================
    // TWITTER / X
    // =================================================================================

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@NotRohith4",
    },

    // =================================================================================
    // ICONS
    // =================================================================================

    icons: {
      icon: icons,
      shortcut: icons,
      apple: icons,
    },

    // =================================================================================
    // SEARCH ENGINE INDEXING
    // =================================================================================

    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}