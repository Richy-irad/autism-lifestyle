import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import localFont from "next/font/local";
import { CartProvider } from "@/lib/contexts/CartContext";
import { AddressContextProvider } from "@/lib/contexts/addressContext";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter/static/Inter_28pt-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/static/Inter_28pt-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/static/Inter_28pt-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/static/Inter_28pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/static/Inter_28pt-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/static/Inter_28pt-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/static/Inter_28pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/static/Inter_28pt-ExtraBold.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/static/Inter_28pt-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

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
    <div
      className={`${inter.variable} ${josefinSans.variable} overflow-x-hidden`}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <CartProvider>
        <AddressContextProvider>
          <Component {...pageProps} />
        </AddressContextProvider>
      </CartProvider>
    </div>
  );
}
