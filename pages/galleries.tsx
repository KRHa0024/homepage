import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const BLOB_BASE_URL = process.env.NEXT_PUBLIC_BLOB_BASE_URL || "";

const getRelativePath = (urlStr: string) => {
  try {
    const url = new URL(urlStr);
    return url.pathname;
  } catch {
    return urlStr;
  }
};

const getImageUrl = (index: number, total: number) => {
  const fileNumber = total - index;
  const basePath = getRelativePath(BLOB_BASE_URL);
  return `${basePath}${fileNumber}.jpeg`;
};

const getThumbUrl = (index: number, total: number) => {
  const fileNumber = total - index;
  const lastIndex = BLOB_BASE_URL.lastIndexOf("/twitter_images/");
  if (lastIndex === -1) {
    const basePath = getRelativePath(BLOB_BASE_URL);
    return `${basePath}${fileNumber}.jpeg`;
  }

  const thumbBaseUrl = 
    BLOB_BASE_URL.substring(0, lastIndex) + 
    "/twitter_images_thumb/" + 
    BLOB_BASE_URL.substring(lastIndex + "/twitter_images/".length);
    
  return `${getRelativePath(thumbBaseUrl)}${fileNumber}.jpeg`;
};

export default function Galleries() {
  const [totalImages, setTotalImages] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchImageCount = async () => {
      if (!BLOB_BASE_URL) {
        setLoading(false);
        return;
      }

      try {
        const urlObj = new URL(BLOB_BASE_URL);
        const pathParts = urlObj.pathname.split("/").filter(Boolean);
        if (pathParts.length < 1) throw new Error("Invalid Blob URL format");

        const containerName = pathParts[0];
        const prefix = pathParts.slice(1).join("/") + "/";
        const listUrl = `${urlObj.origin}/${containerName}?restype=container&comp=list&prefix=${prefix}`;

        const response = await fetch(listUrl);
        if (!response.ok) throw new Error("Failed to fetch blob list");

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        
        const blobs = xmlDoc.getElementsByTagName("Blob");
        let jpegCount = 0;

        for (let i = 0; i < blobs.length; i++) {
          const name = blobs[i].getElementsByTagName("Name")[0]?.textContent || "";
          if (name.toLowerCase().endsWith(".jpeg") || name.toLowerCase().endsWith(".jpg")) {
            jpegCount++;
          }
        }

        setTotalImages(jpegCount);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageCount();
  }, []);

  const openPreview = (idx: number) => {
    setPreviewIdx(idx);
    setModalVisible(true);
    setImgLoading(true);
    setImgError(false);
  };

  const closePreview = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => setPreviewIdx(null), 250);
  }, []);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (previewIdx !== null && totalImages !== null) {
      setImgLoading(true);
      setImgError(false);
      setPreviewIdx((previewIdx + totalImages - 1) % totalImages);
    }
  }, [previewIdx, totalImages]);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (previewIdx !== null && totalImages !== null) {
      setImgLoading(true);
      setImgError(false);
      setPreviewIdx((previewIdx + 1) % totalImages);
    }
  }, [previewIdx, totalImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (previewIdx === null) return;

      switch (e.key) {
        case "Escape":
          closePreview();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewIdx, closePreview, prevImage, nextImage]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <main className="flex-1 py-12">
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold shadow-sm hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:border-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-all duration-200 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <span>← ホームに戻る</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-8 text-center m-plus-rounded">
            Gallery
          </h1>
          
          {loading ? (
             <div className="flex justify-center items-center h-64">
               <div className="loader" />
             </div>
          ) : !totalImages || totalImages === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">画像がありません</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: totalImages }).map((_, idx) => (
                <button
                  key={idx}
                  className={`aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:shadow-md hover:border-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/30 border border-gray-200 dark:border-gray-700 group w-full flex items-center justify-center`}
                  style={{ outline: "none" }}
                  onClick={() => openPreview(idx)}
                  tabIndex={0}
                  aria-label={`画像${idx + 1}を拡大表示`}
                >
                  <Image
                    src={getThumbUrl(idx, totalImages)}
                    alt={`gallery-${idx}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                    unoptimized={true}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
      {previewIdx !== null && totalImages !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            modalVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closePreview}
        >
          <button
            className="z-60 absolute top-6 right-8 text-white text-3xl font-bold bg-black/40 rounded-full p-2 hover:bg-pink-500 transition-colors"
            style={{ zIndex: 60 }}
            onClick={closePreview}
            aria-label="閉じる"
          >
            <X className="w-8 h-8" />
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
            {imgLoading && !imgError && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="loader" />
              </div>
            )}
            {imgError ? (
              <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-white text-center text-lg">
                  画像を読み込めませんでした
                </p>
              </div>
            ) : (
              <Image
                src={getImageUrl(previewIdx, totalImages)}
                alt={`gallery-preview-${previewIdx}`}
                width={1920}
                height={1080}
                className={`object-contain w-screen h-screen max-w-full max-h-[90vh] transition-opacity duration-300 ${
                  imgLoading ? "opacity-0" : "opacity-100"
                }`}
                priority
                onLoadingComplete={() => {
                  setImgLoading(false);
                  setImgError(false);
                }}
                onError={() => {
                  setImgLoading(false);
                  setImgError(true);
                }}
                unoptimized={true}
              />
            )}
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

