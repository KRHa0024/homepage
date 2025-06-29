import React from 'react';
import { ExternalLink, Twitter, ShoppingBag, Heart, RectangleGoggles } from 'lucide-react';

interface LinkItem {
  title: string;
  url: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const links: LinkItem[] = [
  {
    title: 'Twitter',
    url: 'https://twitter.com/owo_KRHa',
    description: '最新の情報や日常をつぶやいています',
    icon: <Twitter className="w-6 h-6" />,
    color: 'hover:bg-blue-50 hover:border-blue-400'
  },
  {
    title: 'VRChat',
    url: 'https://vrchat.com/home/user/usr_6c5d6ee7-188e-4502-bf2e-a744d189081b',
    description: 'バーチャル世界で交流しましょう',
    icon: <RectangleGoggles className="w-6 h-6" />,
    color: 'hover:bg-blue-50 hover:border-blue-400'
  },
  {
    title: 'Booth',
    url: 'https://krha.booth.pm/',
    description: '制作物やグッズを販売しています',
    icon: <ShoppingBag className="w-6 h-6" />,
    color: 'hover:bg-blue-50 hover:border-blue-400'
  },
  {
    title: '欲しいものリスト',
    url: 'https://www.amazon.jp/hz/wishlist/ls/3A46FRUNXAH2S?ref_=wl_share',
    description: '応援していただける方はこちらから',
    icon: <Heart className="w-6 h-6" />,
    color: 'hover:bg-red-50 hover:border-red-400'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Link Collection
            </h1>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
              各種SNSやサービスへのリンクをまとめています。お気軽にフォローや訪問をお願いします。
            </p>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="pb-16">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {links.map((link, index) => (
              <LinkCard key={index} {...link} />
            ))}
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2025 KRHa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LinkCard({ title, url, description, icon, color }: LinkItem) {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`
        bg-white border border-gray-300 rounded-2xl p-6 
        shadow-sm transition-all duration-200 ease-in-out
        cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
        hover:shadow-md ${color}
        group
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${title}に移動 - ${description}`}
    >
      <div className="flex items-start space-x-4">
        {/* アイコン */}
        <div className="flex-shrink-0 p-3 bg-gray-50 rounded-full transition-colors duration-150 ease-in-out group-hover:bg-white">
          <div className="text-blue-700 transition-transform duration-150 ease-in-out group-hover:scale-105">
            {React.cloneElement(icon as React.ReactElement, {
              className: `w-6 h-6 ${
                title === '欲しいものリスト' ? 'text-red-600' : 'text-blue-700'
              }`
            })}
          </div>
        </div>

        {/* コンテンツ */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 leading-snug">
              {title}
            </h2>
            <ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2 transition-transform duration-150 ease-in-out group-hover:translate-x-1" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}