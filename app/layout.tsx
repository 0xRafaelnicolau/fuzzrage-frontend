import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Montserrat, Merriweather, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/components/home/config";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans"
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning style={{ scrollbarGutter: "stable" }}>
        <head />
        <body
          className={`min-h-screen bg-background w-full mx-auto scroll-smooth antialiased ${montserrat.variable} ${merriweather.variable} ${jetbrainsMono.variable}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  )
}