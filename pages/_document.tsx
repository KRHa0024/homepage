import { Html, Head, Main, NextScript } from 'next/document';

const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    var resolved;
    if (theme === 'dark') resolved = 'dark';
    else if (theme === 'light') resolved = 'light';
    else resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var bg = resolved === 'dark' ? '#111827' : '#ffffff';
    document.documentElement.classList.add(resolved);
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
  } catch (e) {}
})();
`;

export default function Document() {
  return (
    <Html lang="ja" style={{ backgroundColor: '#111827' }} suppressHydrationWarning>
      <Head>
        <style>{`
          html, body { background-color: #111827; }
          html.light, html.light body { background-color: #ffffff; }
          html.dark, html.dark body { background-color: #111827; }
        `}</style>
      </Head>
      <body style={{ backgroundColor: '#111827' }}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
