import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { ThemeProvider } from "@/lib/theme-context";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Grain from "@/components/layout/Grain";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import ScrollProgress from "@/components/layout/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;
const description = profile.summary;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Vaibhav Shukla",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "GenAI",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// Runs before hydration to set the theme class synchronously, avoiding FOUC.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jbMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col has-custom-cursor" suppressHydrationWarning>
        <ThemeProvider>
          <Preloader />
          <ScrollProgress />
          <Navbar />
          <SmoothScroll>
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
          <CustomCursor />
          <Grain />
        </ThemeProvider>
      </body>
    </html>
  );
}
