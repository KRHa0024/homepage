import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Noto_Sans_JP, M_PLUS_Rounded_1c } from 'next/font/google';
import Head from "next/head";

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ['900'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>くろはにほへと</title>
        <meta name="description" content="ホームページ" />
        <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <style jsx global>{`
        .m-plus-rounded {
          font-family: ${mPlusRounded.style.fontFamily};
        }
      `}</style>
      <div className={notoSansJP.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}