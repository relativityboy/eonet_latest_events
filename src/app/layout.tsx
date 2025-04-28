import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {PageTitle, PageTitleProvider} from "@/components/PageTitle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "EONET - LATEST EVENTS",
    description: "UI to recent Nasa EONET data",
    icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col antialiased eonet h-full px-5 py-5 md:px-10 font-[family-name:var(--font-geist-sans)]`}
      ><PageTitleProvider>
          <div className="shrink-0">
            <PageTitle/>
          </div>
          <div className="flex-1">
              {children}
          </div>
      </PageTitleProvider>
      </body>
    </html>
  );
}
