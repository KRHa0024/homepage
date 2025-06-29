import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Noto_Sans_JP, M_PLUS_Rounded_1c } from 'next/font/google';

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