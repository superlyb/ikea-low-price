import { createContext, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Banner from "./components/Banner";
import CardList from "./components/Card/";
import Category from "./components/Category";
import Logo from "./components/Logo";
import { ProductContextType, RoomType } from "@/types";
import { CategoryColorMap } from "@/const";

export const ProductContext = createContext<Partial<ProductContextType>>({
  category: "all",
  isDark: false,
});

const SiteTitle = "IKEA Low Price Products | 宜家低价好物";
const SiteDesc =
  "IKEA Low Price Products | 宜家低价好物；宜家折扣价商品；宜家特价榜";

export default function Home() {
  const [category, setCategory] = useState<RoomType>("all");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="theme-color"
          content={isDarkMode ? "#35363a" : CategoryColorMap[category]}
        />
        <title>{SiteTitle}</title>
        <meta name="description" content={SiteDesc} />
        <meta content={SiteDesc} name="description" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SiteTitle} />
        <meta property="og:title" content={SiteTitle} />
        <meta property="og:description" content={SiteDesc} />
      </Head>

      <Logo />

      <main className="sm:px-16 xl:px-48 2xl:px-64">
        <ProductContext.Provider
          value={{ category, setCategory, isDark: isDarkMode }}
        >
          <Banner />
          <Category />
          <CardList />
        </ProductContext.Provider>
      </main>

      <footer className="flex justify-center text-gray-700 py-4 font-bold dark:text-white">
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=PTQZ7QCPST8Y6 "
          className="hover:underline mx-3"
        >
          打赏开发者
        </a>
      </footer>
    </>
  );
}
