"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";


interface CardNewsProps {
  title: string;
  items: string[];
  color: string;
  cardBg: string;
  cardText: string;
  coverImage?: string;
  itemsPerCard?: number;
  showSave?: boolean;
}

export default function CardNews({
  title,
  items,
  color,
  cardBg,
  cardText,
  coverImage,
  itemsPerCard = 7,
  showSave = false,
}: CardNewsProps) {
  const itemCards = Math.ceil(items.length / itemsPerCard);
  const totalCards = itemCards + 1; // +1 for cover
  const [currentCard, setCurrentCard] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const isCover = currentCard === 0;
  const itemCardIdx = currentCard - 1;
  const startIdx = itemCardIdx * itemsPerCard;
  const currentItems = isCover ? [] : items.slice(startIdx, startIdx + itemsPerCard);
  const globalStartNum = startIdx + 1;

  const handleSave = useCallback(async () => {
    if (!cardRef.current) return;
    const { default: html2canvas } = await import("html2canvas-pro");
    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `comma-${title}-${currentCard}.png`, { type: "image/png" });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        const link = document.createElement("a");
        link.download = file.name;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }
    }, "image/png");
  }, [title, currentCard]);

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md mx-auto">
      {/* Card — 4:5 aspect ratio for Instagram/Threads */}
      <div
        ref={cardRef}
        className="relative w-full rounded-3xl overflow-hidden"
        style={{
          aspectRatio: "4 / 5",
          boxShadow: `0 20px 50px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.2)`,
        }}
      >
        {isCover ? (
          /* ===== COVER CARD ===== */
          <>
            {/* Background: photo or mesh gradient */}
            {coverImage ? (
              <Image
                src={coverImage}
                alt=""
                fill
                className="object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0" style={{ backgroundColor: "#0B1220" }} />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(ellipse 90% 80% at 30% 20%, ${color}50 0%, transparent 60%),
                      radial-gradient(ellipse 70% 80% at 80% 80%, ${color}35 0%, transparent 55%),
                      radial-gradient(ellipse 60% 50% at 60% 40%, #5CC4C825 0%, transparent 50%)
                    `,
                  }}
                />
              </>
            )}

            {/* Dark overlay for text readability */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)",
              }}
            />

            {/* Fine grid overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />

            {/* Cover content */}
            <div className="relative flex flex-col h-full px-10 pt-10 pb-10">
              {/* Top: logo + handle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src="/comma-icon-light.png"
                    alt=""
                    width={22}
                    height={22}
                    className="object-contain -mr-0.5"
                    style={{ width: 22, height: 22 }}
                  />
                  <span
                    className="text-[12px] tracking-wide font-serif font-medium"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    comma,
                  </span>
                </div>
                <span
                  className="text-[11px] font-medium"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  @jiwonnnnieee
                </span>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom: big title */}
              <div>
                <h2
                  className="text-[32px] font-bold leading-[1.25] mb-4"
                  style={{ color: "#fff" }}
                >
                  {title}
                </h2>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  100가지 이유를 찾아가는 여정
                </p>
              </div>
            </div>
          </>
        ) : (
          /* ===== ITEM CARDS ===== */
          <>
            {/* Deep icy base */}
            <div className="absolute inset-0" style={{ backgroundColor: "#0B1220" }} />

            {/* Icy mesh gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 70% at 20% 10%, #4A9AB540 0%, transparent 65%),
                  radial-gradient(ellipse 60% 70% at 80% 85%, #5B8FBE35 0%, transparent 60%),
                  radial-gradient(ellipse 50% 50% at 70% 30%, #5CC4C830 0%, transparent 55%)
                `,
              }}
            />

            {/* Fine grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />

            {/* Comma watermark */}
            <div className="absolute bottom-6 right-6 opacity-[0.06]">
              <Image
                src="/comma-logo.png"
                alt=""
                width={80}
                height={80}
                className="object-contain"
                style={{ width: 80, height: 80 }}
              />
            </div>

            {/* Card content */}
            <div className="relative flex flex-col h-full px-10 pt-10 pb-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Image
                    src="/comma-icon-light.png"
                    alt=""
                    width={22}
                    height={22}
                    className="object-contain -mr-0.5"
                    style={{ width: 22, height: 22 }}
                  />
                  <span
                    className="text-[12px] tracking-wide font-serif font-medium"
                    style={{ color: `${cardText}66` }}
                  >
                    comma,
                  </span>
                </div>
                <h2
                  className="text-xl font-semibold leading-tight"
                  style={{ color: cardText }}
                >
                  {title}
                </h2>
                <p
                  className="text-[11px] mt-2 leading-relaxed"
                  style={{ color: `${cardText}55` }}
                >
                  100가지 이유를 찾아가는 여정
                </p>
              </div>

              {/* Items */}
              <div className="flex-1 flex flex-col justify-center gap-4">
                {currentItems.map((item, idx) => (
                  <div key={startIdx + idx} className="flex items-start gap-3.5">
                    <span
                      className="flex-shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold"
                      style={{
                        backgroundColor: `${cardText}12`,
                        color: `${cardText}aa`,
                        border: `1px solid ${cardText}10`,
                        minWidth: 26,
                        height: 26,
                      }}
                    >
                      {globalStartNum + idx}
                    </span>
                    <p
                      className="text-[15px] leading-relaxed pt-0.5"
                      style={{ color: `${cardText}dd` }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between mt-4 pt-4"
                style={{ borderTop: `1px solid ${cardText}0a` }}
              >
                <span
                  className="text-[10px] tracking-wider font-medium"
                  style={{ color: `${cardText}40` }}
                >
                  @jiwonnnnieee
                </span>
                <span
                  className="text-[10px] font-mono"
                  style={{ color: `${cardText}40` }}
                >
                  {currentCard} / {totalCards - 1}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Slider — minimal transparent */}
      <div className="w-full px-4">
        <input
          type="range"
          min={0}
          max={totalCards - 1}
          value={currentCard}
          onChange={(e) => setCurrentCard(Number(e.target.value))}
          className="card-slider w-full h-[3px] rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color}88 0%, ${color}88 ${(currentCard / Math.max(totalCards - 1, 1)) * 100}%, rgba(0,0,0,0.06) ${(currentCard / Math.max(totalCards - 1, 1)) * 100}%, rgba(0,0,0,0.06) 100%)`,
          }}
        />
      </div>

      {/* Save button — admin only */}
      {showSave && (
        <button
          onClick={handleSave}
          className="text-[12px] px-4 py-2 rounded-lg transition-all hover:opacity-80"
          style={{
            backgroundColor: "rgba(0,0,0,0.06)",
            color: "#666",
          }}
        >
          이미지 저장
        </button>
      )}
    </div>
  );
}
