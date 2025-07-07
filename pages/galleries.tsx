import React, { useState } from "react";
// import fs from "fs";
// import path from "path";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Galleries({ images }: { images: string[] }) {
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  // プレビューを開く
  const openPreview = (idx: number) => {
    setPreviewIdx(idx);
    setModalVisible(true);
    setImgLoading(true);
  };
  // プレビューを閉じる
  const closePreview = () => {
    setModalVisible(false);
    setTimeout(() => setPreviewIdx(null), 250); // アニメーション後に非表示
  };
  // 前の画像
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewIdx !== null) {
      setImgLoading(true);
      setPreviewIdx((previewIdx + images.length - 1) % images.length);
    }
  };
  // 次の画像
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewIdx !== null) {
      setImgLoading(true);
      setPreviewIdx((previewIdx + 1) % images.length);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 py-12">
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-white border border-gray-300 text-gray-700 font-semibold shadow-sm hover:bg-pink-50 hover:border-pink-400 hover:text-pink-700 transition-all duration-200 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <span>← ホームに戻る</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-700 mb-8 text-center m-plus-rounded">Gallery</h1>
          {images.length === 0 ? (
            <p className="text-center text-gray-500">画像がありません</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((id, idx) => (
                <button
                  key={idx}
                  className={`aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 hover:shadow-md hover:border-pink-400 hover:bg-pink-50 border border-gray-200 group w-full flex items-center justify-center`}
                  style={{ outline: 'none' }}
                  onClick={() => openPreview(idx)}
                  tabIndex={0}
                  aria-label={`画像${idx + 1}を拡大表示`}
                >
                  <Image
                    src={getThumbUrl(id)}
                    alt={`gallery-${idx}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
      {/* プレビュー用モーダル */}
      {previewIdx !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${modalVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={closePreview}
        >
          <button
            className="z-60 absolute top-6 right-8 text-white text-3xl font-bold bg-black/40 rounded-full px-3 py-1 hover:bg-pink-500 transition-colors"
            style={{ zIndex: 60 }}
            onClick={closePreview}
            aria-label="閉じる"
          >
            ×
          </button>
          <button
            className="z-60 absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-white bg-black/40 rounded-full p-2 hover:bg-pink-500 transition-colors"
            style={{ zIndex: 60 }}
            onClick={prevImage}
            aria-label="前の画像"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>
          <div className="max-w-3xl w-full flex flex-col items-center relative">
            {imgLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="loader" />
              </div>
            )}
            <Image
              src={getPreviewUrl(images[previewIdx])}
              alt={`gallery-preview-${previewIdx}`}
              width={1920}
              height={1080}
              className={`object-contain w-screen h-screen max-w-full max-h-[90vh] transition-opacity duration-300 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
              priority
              onLoadingComplete={() => setImgLoading(false)}
            />
          </div>
          <button
            className="z-60 absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-white bg-black/40 rounded-full p-2 hover:bg-pink-500 transition-colors"
            style={{ zIndex: 60 }}
            onClick={nextImage}
            aria-label="次の画像"
          >
            <ArrowRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}

const twitterImageIds = [
  "Gu9gNv3XEAAa9SL",
  "Guy12GGWYAAADu6",
  "GuZMGMBaEAA3jRg",
  "GuJ2rnlbQAAHiWH",
  "Gt1hRaEXMAAy5bl",
  "Gt1Z6aLXkAAWp8X",
  "Gtl_T5va0AAvYHa",
  "GtQxrZJbMAAuywT",
  "Gs841WJakAArJxu",
  "GstJ3KgagAAiqzR",
  "GsdoIF-bgAAOnKK",
  "GsJFnB1aUAE2w_E",
  "Gr5reFEWcAAgleb",
  "GrlXCX1XcAAIctQ",
  "GrVaVVybAAEm8iS",
  "GrA_5SkasAAKAD1",
  "Gq2rQEsXYAEyDnI",
  "Gqc4gzIWwAAKDwa",
  "GqSWginbAAQvVbo",
  "Gp4elX_awAE0JYR",
  "GpzxdjhaYAAGt7c",
  "GpUwgOobYAEQZoF",
  "GpALA3vbMAAFGcy",
  "Gow1tgIaAAAq29I",
  "Gowq0mgacAACs5O",
  "GohH1XLW4AAYOEN",
  "GoM3FuNaoAALfwR",
  "Gn9QCaebwAE0ujV",
  "Gnop3tuacAATIJ7",
  "GnjVaPoaMAUeZoi",
  "Gm_YUd1boAAx8hQ",
  "Gm1CHoabEAAhhX8",
  "GmgVIuwaEAMzOI8",
  "GmLwj3QboAEbson",
  "Gl3SwgsbYAAruIp",
  "GlnxnSUbIAA2GUr",
  "GlTNz0wa4AUNKKa",
  "GkqBcpNWkAA98fB",
  "GkkwJTCXsAA7Xxm",
  "GkAozsgaAAQYK7s",
  "GkADS94akAEnl6b",
  "Gi4_KUXa4AIzOqq",
  "Giz1304bkAAshEK",
  "Giz9nD-boAA9Ajj",
  "GiUtMOzaYAAM5xP",
  "GiPkMrjaQAAOBQY",
  "GiAB9imaAAA1lcZ",
  "GhR8kgwbAAA0Ljp",
  "GhMkGwBbIAAlfcG",
  "Gg39SryaMAALybs",
];

// サムネイル用URL生成（small）
const getThumbUrl = (id: string) => `https://pbs.twimg.com/media/${id}?format=jpg&name=small`;
// プレビュー用URL生成（4096x4096）
const getPreviewUrl = (id: string) => `https://pbs.twimg.com/media/${id}?format=jpg&name=4096x4096`;

export async function getStaticProps() {
  return { props: { images: twitterImageIds } };
}
