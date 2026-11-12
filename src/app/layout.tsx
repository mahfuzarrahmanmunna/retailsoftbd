import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { DemoModal } from "@/components/demo/DemoModal";
import { Motion } from "@/components/motion/Motion";
import { site } from "@/lib/content";
import "./globals.css";

// One family for English and Bangla, so mixed text looks consistent.
const body = Hind_Siliguri({
  variable: "--font-body",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Headings and labels: a neutral, highly legible sans.
const head = Inter({ variable: "--font-head", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });

// Set before first paint so the soft fade-ins don't flash. Skipped for reduced-motion visitors.
const motionFlag = `if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("motion")`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    locale: "en_US",
    alternateLocale: ["bn_BD"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  parentOrganization: { "@type": "Organization", name: site.parent },
  email: site.contact.email,
  telephone: site.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, House 13, H.P. Bhabon, Merul Khula Madani Avenue, Satarkul, North Badda",
    addressLocality: "Dhaka",
    postalCode: "1212",
    addressCountry: "BD",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${head.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> */}
      <body className="min-h-svh" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only fixed left-4 top-4 z-[101] rounded-lg bg-brand px-5 py-3 font-semibold text-white focus:not-sr-only"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingContact />
        <DemoModal />
        <Motion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
