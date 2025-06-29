import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  Twitter,
  ShoppingBag,
  Heart,
  RectangleGoggles,
  GithubIcon,
  Camera,
} from "lucide-react";
import Image from "next/image";

interface LinkItem {
  title: string;
  url: string;
  icon: React.ReactNode;
}

interface WorkItem {
  title: string;
  image: string;
  url?: string;
}

const links: LinkItem[] = [
  {
    title: "Twitter",
    url: "https://twitter.com/owo_KRHa",
    icon: <Twitter className="w-6 h-6" />,
  },
  {
    title: "VRChat",
    url: "https://vrchat.com/home/user/usr_6c5d6ee7-188e-4502-bf2e-a744d189081b",
    icon: <RectangleGoggles className="w-6 h-6" />,
  },
  {
    title: "Booth",
    url: "https://krha.booth.pm/",
    icon: <ShoppingBag className="w-6 h-6" />,
  },
  {
    title: "ほしいも",
    url: "https://www.amazon.jp/hz/wishlist/ls/3A46FRUNXAH2S?ref_=wl_share",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    title: "GitHub",
    url: "https://www.amazon.jp/hz/wishlist/ls/3A46FRUNXAH2S?ref_=wl_share",
    icon: <GithubIcon className="w-6 h-6" />,
  },
];

const works: WorkItem[] = [
  {
    title: "VRChat用アバター衣装の製作・販売",
    image: "/work5.png",
    url: "https://krha.booth.pm/",
  },
  {
    title: "VRChat内のワールド制作",
    image: "/work1.gif",
    url: "https://vrchat.com/home/user/usr_6c5d6ee7-188e-4502-bf2e-a744d189081b",
  },
  {
    title: "告知用動画製作(Cafe Royal Milk)",
    image: "/work2.gif",
    url: "https://x.com/Mil_Crysta/status/1733048782445576630?s=20",
  },
  {
    title: "VRChat用トグルメニュー生成ツール",
    image: "/work4.gif",
    url: "https://github.com/KRHa0024/ToggleMenuGenerator",
  },
  {
    title: "ゲームアセットの製作(般若心経.inc)",
    image: "/work6.png",
    url: "https://youtu.be/tdNqsA_HLEs?si=rWEvx2aaSwGuatp8",
  },
  {
    title: "3DCGアニメーション",
    image: "/work3.gif",
    url: "https://youtu.be/S-MUI8WSaUw",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* プロフィールセクション */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            {/* プロフィール画像 */}
            <div className="flex justify-center">
              <div className="size-48 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src="/icon_base.png"
                  alt="プロフィール画像"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
            </div>

            <div>
              {/* 名前 */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-700 leading-tight m-plus-rounded">
                くろ～は
              </h1>
              {/* 読み方 */}
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                kuroha
              </p>
            </div>

            {/* ひとこと */}
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              ぶいちゃで暮らしてます
            </p>

            {/* ギャラリーボタン */}
            <div className="pt-4">
              <Link
                href="/galleries"
                className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-white border border-gray-300 text-gray-700 font-semibold shadow-sm hover:bg-pink-50 hover:border-pink-400 hover:text-pink-700 transition-all duration-200 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <Camera className="w-6 h-6 text-pink-700" />
                <span>Gallery</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* リンク集セクション */}
      <main className="flex-1 pb-16">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* セクションタイトル */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 leading-tight m-plus-rounded">
              Links
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed mt-2">
              各種SNSやサービスへのリンク集
            </p>
          </div>

          {/* リンクカード */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {links.map((link, index) => (
              <LinkCard key={index} {...link} />
            ))}
          </div>
        </div>
      </main>

      {/* Workセクション */}
      <main className="flex-1 pb-16">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* セクションタイトル */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 leading-tight m-plus-rounded">
              Works
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed mt-2">
              今まで作ったものとか
            </p>
          </div>
          
          {/* Workカード */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {works.map((work, index) => (
              <WorkCard key={index} {...work} />
            ))}
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="py-8 border-t border-gray-200 mt-auto">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} KRHa. All rights reserved.
              <br />
              アイコン: かなめなか様
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LinkCard({ title, url, icon }: LinkItem) {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`
        bg-white border border-gray-300 rounded-2xl p-6 
        shadow-sm transition-all duration-200 ease-in-out
        cursor-pointer focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2
        hover:shadow-md hover:border-pink-400 hover:bg-pink-50
        group
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${title}に移動`}
    >
      <div className="flex space-x-4 items-center">
        {/* アイコン */}
        <div className="flex-shrink-0 p-3 bg-gray-50 rounded-full transition-colors duration-150 ease-in-out group-hover:bg-white">
          <div className="text-pink-700 transition-transform duration-150 ease-in-out group-hover:scale-105">
            {React.cloneElement(icon as React.ReactElement)}
          </div>
        </div>

        {/* コンテンツ */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-600 leading-snug">
              {title}
            </h2>
            <ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2 transition-transform duration-150 ease-in-out group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkCard({ title, image, url }: WorkItem) {
  const handleClick = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (url && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`
        bg-white border border-gray-200 rounded-4xl overflow-hidden
        shadow-sm transition-all duration-200 ease-in-out
        focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2
        hover:shadow-md hover:border-pink-400 hover:bg-pink-50
        ${url ? 'cursor-pointer' : ''}
        group
      `}
      onClick={url ? handleClick : undefined}
      onKeyDown={url ? handleKeyDown : undefined}
      tabIndex={url ? 0 : undefined}
      role={url ? "button" : undefined}
      aria-label={url ? `${title}を開く` : undefined}
    >
      {/* 画像 */}
      <div className="aspect-video bg-gray-100 overflow-hidden rounded-2xl mt-4 ml-4 mr-4">
        <Image
          src={image}
          alt={title}
          width={400}
          height={225}
          className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
        />
      </div>
      
      {/* タイトル */}
      <div className="flex p-4 justify-center">
        <h2 className="text-base font-medium text-gray-700 leading-snug line-clamp-2">
          {title}
        </h2>
      </div>
    </div>
  );
}