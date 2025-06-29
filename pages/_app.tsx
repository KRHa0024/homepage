import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Noto_Sans_JP } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={notoSansJP.className}>
      <Component {...pageProps} />
    </div>
  );
}