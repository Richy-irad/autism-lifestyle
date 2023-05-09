import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const josefinSans = localFont({
  src: [
    {
      path: "../../public/fonts/static/JosefinSans-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/static/JosefinSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/static/JosefinSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/static/JosefinSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/static/JosefinSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/static/JosefinSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/static/JosefinSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-josefin-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${josefinSans.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
