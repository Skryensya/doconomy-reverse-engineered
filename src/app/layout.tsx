import type { Metadata } from "next";
import { Montserrat, Karla, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import Header from "@/components/Header";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Asimov 2.0",
  description: "Asimov consultores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${karla.variable} ${ibmPlexMono.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          <div className="relative h-full">
            {/* <div className="bg-diagonal fixed inset-0 -z-10 mx-auto max-w-[2000px] border-x border-border">
              <div className="max-width-container h-full bg-background"></div>
            </div> */}
            

            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
