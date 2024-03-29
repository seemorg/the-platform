import { type Metadata, type Viewport } from "next";

export const config = {
  title: "Library | Seemore",
  shortTitle: "Seemore",
  siteName: "Seemore Library",
  description: "Access thousands of Islamic texts in seconds.",
  themeColor: "#AA4A44",
  locale: "en_US",
  image: {
    url: "/cover.png",
    width: 1500,
    height: 600,
    alt: "Seemore Library Cover",
  },
  url: "https://library.digitalseem.org",
};

export const getMetadata = ({
  title: baseTitle,
  description = config.description,
}: {
  title?: string;
  description?: string;
} = {}): Metadata => {
  const images = [config.image];
  const title = baseTitle
    ? `${baseTitle} | ${config.shortTitle}`
    : config.title;

  return {
    title: {
      template: "%s | Seemore",
      default: "Library",
    },
    description,
    metadataBase: new URL(config.url),
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    openGraph: {
      type: "website",
      siteName: config.siteName,
      locale: config.locale,
      url: "/",
      title,
      description,
      images,
    },
    alternates: {
      canonical: "/",
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
};

export const getViewport = (): Viewport => {
  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: config.themeColor,
  };
};
