import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner";
import { Montserrat, Merriweather, JetBrains_Mono } from "next/font/google";
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
  title: "Fuzzrage",
  description: "Fuzzrage is a solidity smart contract cloud platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`antialiased ${montserrat.variable} ${merriweather.variable} ${jetbrainsMono.variable}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  )
}