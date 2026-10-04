import type { Metadata } from "next";
import { Inter, Rajdhani, Exo, Anton, Barlow_Condensed, Bebas_Neue, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["800"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["400"],
});

const gobold = Anton({
  variable: "--font-gobold",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Epigrotive Gaming — Building The Next Era Of Gaming & Esports",
  description:
    "Powering the gaming ecosystem through esports, media, content and brand experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${rajdhani.variable} ${exo.variable} ${gobold.variable} ${barlow.variable} ${bebas.variable} ${robotoCondensed.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-ink font-body">
        {children}
      </body>
    </html>
  );
}
