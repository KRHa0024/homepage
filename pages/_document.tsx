import { Html, Head, Main, NextScript } from 'next/document';

const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    var resolved;
    if (theme === 'dark') resolved = 'dark';
    else if (theme === 'light') resolved = 'light';
    else resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.classList.add(resolved);
  } catch (e) {}
})();
`;

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
