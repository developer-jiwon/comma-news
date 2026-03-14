"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";


type CardTheme = "black" | "white" | "navy" | "cream" | "rust" | "mauve";

const THEMES: Record<CardTheme, { bg: string; mesh: string; text: string; grid: string; label: string }> = {
  black: {
    bg: "#111111",
    mesh: `linear-gradient(160deg, #181818 0%, #0E0E0E 100%)`,
    text: "#EEEEEE",
    grid: "rgba(255,255,255,0.025)",
    label: "블랙",
  },
  white: {
    bg: "#FAFAFA",
    mesh: `linear-gradient(160deg, #FFFFFF 0%, #F5F5F5 100%)`,
    text: "#1A1A1A",
    grid: "rgba(0,0,0,0.03)",
    label: "화이트",
  },
  navy: {
    bg: "#141D2E",
    mesh: `linear-gradient(160deg, #1A2540 0%, #101828 100%)`,
    text: "#C8D4E8",
    grid: "rgba(255,255,255,0.02)",
    label: "네이비",
  },
  cream: {
    bg: "#F5F0E4",
    mesh: `linear-gradient(160deg, #FAF5EA 0%, #EDE8DC 100%)`,
    text: "#2C2820",
    grid: "rgba(0,0,0,0.025)",
    label: "크림",
  },
  rust: {
    bg: "#F0E4D8",
    mesh: `linear-gradient(160deg, #F5EAE0 0%, #E8DCD0 100%)`,
    text: "#3A2820",
    grid: "rgba(0,0,0,0.025)",
    label: "러스트",
  },
  mauve: {
    bg: "#F0E8EE",
    mesh: `linear-gradient(160deg, #F5EDF4 0%, #E8E0E6 100%)`,
    text: "#2E2430",
    grid: "rgba(0,0,0,0.02)",
    label: "모브",
  },
};

const FONT_COLORS: { value: string; label: string }[] = [
  { value: "", label: "기본" },
  { value: "#FFFFFF", label: "흰색" },
  { value: "#1A1A1A", label: "검정" },
];

const PILL_COLORS: { value: string; label: string; textDark: string }[] = [
  { value: "#F5E050", label: "레몬", textDark: "#333" },
  { value: "#FF9F68", label: "오렌지", textDark: "#3A2010" },
  { value: "#FF8FA3", label: "핑크", textDark: "#3A1520" },
  { value: "#A0D8B0", label: "민트", textDark: "#1A3020" },
  { value: "#88C4F4", label: "스카이", textDark: "#102840" },
  { value: "#C8A8E8", label: "라벤더", textDark: "#281838" },
  { value: "#FFFFFF", label: "화이트", textDark: "#333" },
  { value: "#333333", label: "다크", textDark: "#EEE" },
];

interface CardNewsProps {
  title: string;
  items: string[];
  color: string;
  cardBg: string;
  cardText: string;
  coverImage?: string;
  itemsPerCard?: number;
  showSave?: boolean;
  titleSize?: number;
  coverTitleSize?: number;
  numbered?: boolean;
  cardTheme?: CardTheme;
  pillColor?: string;
  fontColor?: string;
  boldCoverTitle?: boolean;
  boldCardTitle?: boolean;
  boldItems?: boolean;
  onUpdate?: (title: string, items: string[], opts?: {
    titleSize?: number; coverTitleSize?: number; numbered?: boolean;
    cardTheme?: CardTheme; pillColor?: string; fontColor?: string;
    boldCoverTitle?: boolean; boldCardTitle?: boolean; boldItems?: boolean;
  }) => void;
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
  titleSize,
  coverTitleSize,
  numbered = true,
  cardTheme = "black",
  pillColor = "#F5E050",
  fontColor = "",
  boldCoverTitle = true,
  boldCardTitle = true,
  boldItems = true,
  onUpdate,
}: CardNewsProps) {
  const itemCards = Math.ceil(items.length / itemsPerCard);
  const [currentCard, setCurrentCard] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const [cardScale, setCardScale] = useState(1);
  const DESIGN_WIDTH = 380;

  useEffect(() => {
    const updateScale = () => {
      if (cardRef.current) {
        const w = cardRef.current.offsetWidth;
        setCardScale(w / DESIGN_WIDTH);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editItems, setEditItems] = useState(items.join("\n"));
  const [editTitleSize, setEditTitleSize] = useState(titleSize || 19);
  const [editCoverTitleSize, setEditCoverTitleSize] = useState(coverTitleSize || 34);
  const [editNumbered, setEditNumbered] = useState(numbered);
  const [editTheme, setEditTheme] = useState<CardTheme>(cardTheme);
  const [editPillColor, setEditPillColor] = useState(pillColor);
  const [editFontColor, setEditFontColor] = useState(fontColor);
  const [editBoldCoverTitle, setEditBoldCoverTitle] = useState(boldCoverTitle);
  const [editBoldCardTitle, setEditBoldCardTitle] = useState(boldCardTitle);
  const [editBoldItems, setEditBoldItems] = useState(boldItems);
  const [isLocal, setIsLocal] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [showPwModal, setShowPwModal] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  const EDIT_PW = "c0mm@_j1w0n!#2024$";

  useEffect(() => {
    setIsLocal(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    setIsAuthed(sessionStorage.getItem("comma-edit-auth") === "1");
  }, []);

  const handlePwSubmit = () => {
    if (pwInput === EDIT_PW) {
      setIsAuthed(true);
      sessionStorage.setItem("comma-edit-auth", "1");
      setShowPwModal(false);
      setPwInput("");
      setPwError(false);
      // 인증 후 바로 편집 모드 진입
      setEditTitle(title); setEditItems(items.join("\n")); setEditTitleSize(titleSize || 19); setEditCoverTitleSize(coverTitleSize || 34); setEditNumbered(numbered); setEditTheme(THEMES[cardTheme] ? cardTheme : "black"); setEditPillColor(pillColor); setEditFontColor(fontColor); setEditBoldCoverTitle(boldCoverTitle); setEditBoldCardTitle(boldCardTitle); setEditBoldItems(boldItems); setEditing(true);
    } else {
      setPwError(true);
    }
  };

  const activeTheme = (editing ? THEMES[editTheme] : THEMES[cardTheme]) || THEMES.black;
  const activeFontColor = editing ? editFontColor : fontColor;
  const themeText = activeFontColor || activeTheme.text;
  const activeBoldCover = editing ? editBoldCoverTitle : boldCoverTitle;
  const activeBoldCard = editing ? editBoldCardTitle : boldCardTitle;
  const activeBoldItems = editing ? editBoldItems : boldItems;
  const activePill = editing ? editPillColor : pillColor;
  const activePillText = PILL_COLORS.find((p) => p.value === activePill)?.textDark || "#333";

  // Live preview values
  const liveTitle = editing ? editTitle : title;
  const liveItems = editing ? editItems.split("\n").map((l) => l.trim()).filter((l) => l.length > 0) : items;
  const liveTitleSize = editing ? editTitleSize : (titleSize || 19);
  const liveCoverTitleSize = editing ? editCoverTitleSize : (coverTitleSize || 34);
  const liveNumbered = editing ? editNumbered : numbered;

  const liveItemCards = Math.ceil(liveItems.length / itemsPerCard);
  const liveTotalCards = liveItemCards + 1;

  // Swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setCurrentCard((c) => diff > 0 ? Math.min(liveTotalCards - 1, c + 1) : Math.max(0, c - 1));
    }
    touchStartX.current = null;
  }, [liveTotalCards]);
  const isCover = currentCard === 0;
  const itemCardIdx = currentCard - 1;
  const startIdx = itemCardIdx * itemsPerCard;
  const currentItems = isCover ? [] : liveItems.slice(startIdx, startIdx + itemsPerCard);
  const globalStartNum = startIdx + 1;

  const handleSave = useCallback(async () => {
    if (!cardRef.current) return;
    const { default: html2canvas } = await import("html2canvas-pro");
    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      ignoreElements: (el) => el.hasAttribute("data-html2canvas-ignore"),
    });
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        // 모바일: share sheet로 "사진에 저장" 가능
        const file = new File([blob], `comma-${currentCard}.png`, { type: "image/png" });
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          try { await navigator.share({ files: [file], title: "comma, 카드뉴스" }); } catch {}
        } else {
          // fallback: 다운로드
          const link = document.createElement("a");
          link.download = file.name;
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        }
      } else {
        const link = document.createElement("a");
        link.download = `comma-${title}-${currentCard}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }
    }, "image/png");
  }, [title, currentCard]);

  return (
    <div className={`flex gap-5 w-full mx-auto ${editing ? "flex-col md:flex-row md:items-start md:max-w-4xl items-center max-w-md" : "flex-col items-center max-w-md"}`}>
      {/* Card column */}
      <div className={`flex flex-col items-center gap-3 ${editing ? "w-full md:w-[380px] md:flex-shrink-0 md:sticky md:top-6" : "w-full"}`}>

      {/* Save button — top center, above card */}
      {showSave && (
        <button
          onClick={handleSave}
          className="text-[10px] px-3 py-1 rounded-full transition-all hover:opacity-70"
          style={{ backgroundColor: "rgba(0,0,0,0.06)", color: "#888" }}
        >
          이미지 저장
        </button>
      )}

      {/* Card — 4:5 aspect ratio for Instagram/Threads */}
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative rounded-3xl overflow-hidden"
        style={{
          width: "100%",
          aspectRatio: "4 / 5",
          boxShadow: `0 20px 50px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.2)`,
        }}
      >
        {/* Scaled inner container — designed at 380px, scales to fit */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: DESIGN_WIDTH,
            height: DESIGN_WIDTH * 1.25,
            transform: `scale(${cardScale})`,
            transformOrigin: "top left",
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
              {/* Top row: edit button (left) + @handle pill (right) */}
              <div className="flex justify-between items-center">
                <div>
                  {onUpdate && !editing && (
                    <button
                      onClick={() => {
                        if (isAuthed || isLocal) {
                          setEditTitle(title); setEditItems(items.join("\n")); setEditTitleSize(titleSize || 19); setEditCoverTitleSize(coverTitleSize || 34); setEditNumbered(numbered); setEditTheme(THEMES[cardTheme] ? cardTheme : "black"); setEditPillColor(pillColor); setEditFontColor(fontColor); setEditBoldCoverTitle(boldCoverTitle); setEditBoldCardTitle(boldCardTitle); setEditBoldItems(boldItems); setEditing(true);
                        } else {
                          setShowPwModal(true); setPwInput(""); setPwError(false);
                        }
                      }}
                      className="text-[10px] px-3 py-1 rounded-full transition-all hover:opacity-80 backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      편집
                    </button>
                  )}
                </div>
                <span
                  className="text-[9px] tracking-wide font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: activePill, color: activePillText }}
                >
                  @jiwonnnnieee
                </span>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom-left: title + branding */}
              <div>
                <h2
                  className={`tracking-[0.04em] leading-[1.25] mb-3 whitespace-pre-line ${activeBoldCover ? "font-bold" : "font-light"}`}
                  style={{ color: "#fff", fontSize: `${liveCoverTitleSize}px` }}
                >
                  {liveTitle}
                </h2>
                <div className="flex items-center">
                  <Image
                    src="/comma-icon-light.png"
                    alt=""
                    width={16}
                    height={16}
                    className="object-contain mr-0.5"
                    style={{ width: 16, height: 16 }}
                  />
                  <span
                    className="text-[10px] tracking-wide font-serif font-medium"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    comma,
                  </span>
                  <span
                    className="text-[10px] ml-2 font-light tracking-[0.04em]"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    100가지 이유를 찾아가는 여정
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* ===== ITEM CARDS ===== */
          <>
            {/* Theme base */}
            <div className="absolute inset-0" style={{ backgroundColor: activeTheme.bg }} />

            {/* Theme mesh gradient */}
            <div
              className="absolute inset-0"
              style={{ background: activeTheme.mesh }}
            />

            {/* Fine grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${activeTheme.grid} 1px, transparent 1px), linear-gradient(90deg, ${activeTheme.grid} 1px, transparent 1px)`,
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
            <div className="relative flex flex-col h-full px-7 pt-5 pb-6">
              {/* Header — compact */}
              <div className="mb-2">
                <div className="flex items-center mb-1.5">
                  <Image
                    src="/comma-icon-light.png"
                    alt=""
                    width={18}
                    height={18}
                    className="object-contain mr-0.5"
                    style={{ width: 18, height: 18 }}
                  />
                  <span
                    className="text-[10px] tracking-wide font-serif font-medium"
                    style={{ color: `${themeText}55` }}
                  >
                    comma,
                  </span>
                </div>
                <h2
                  className={`tracking-[0.04em] leading-tight whitespace-pre-line ${activeBoldCard ? "font-bold" : "font-light"}`}
                  style={{ color: themeText, fontSize: `${liveTitleSize}px` }}
                >
                  {liveTitle}
                </h2>
              </div>

              {/* Items — centered vertically */}
              <div className="flex-1 flex flex-col justify-center gap-2">
                {liveNumbered ? (
                  currentItems.map((item, idx) => (
                    <div key={startIdx + idx} className="flex items-start gap-2.5">
                      <span
                        className="flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{
                          backgroundColor: `${themeText}12`,
                          color: `${themeText}aa`,
                          border: `1px solid ${themeText}10`,
                          minWidth: 22,
                          height: 22,
                        }}
                      >
                        {globalStartNum + idx}
                      </span>
                      <p
                        className={`text-[13px] leading-relaxed pt-0.5 ${activeBoldItems ? "font-bold" : ""}`}
                        style={{ color: `${themeText}dd` }}
                      >
                        {item}
                      </p>
                    </div>
                  ))
                ) : (
                  <div
                    className={`text-[13px] leading-[1.9] whitespace-pre-line ${activeBoldItems ? "font-bold" : ""}`}
                    style={{ color: `${themeText}dd` }}
                  >
                    {currentItems.join("\n")}
                  </div>
                )}
              </div>

              {/* Footer — pinned to bottom */}
              <div
                className="flex items-center justify-between mt-auto pt-4"
                style={{ borderTop: `1px solid ${themeText}0a` }}
              >
                <span
                  className="text-[9px] tracking-wide font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${activePill}80`, color: `${themeText}cc` }}
                >
                  @jiwonnnnieee
                </span>
                <span
                  className="text-[10px] font-mono"
                  style={{ color: `${themeText}40` }}
                >
                  {currentCard} / {liveTotalCards - 1}
                </span>
              </div>
            </div>
          </>
        )}

        </div>{/* end scaled inner */}
      </div>

      {/* Pagination — dots + arrows */}
      <div className="w-full flex items-center justify-center gap-3 py-2">
        <button
          onClick={() => setCurrentCard((c) => Math.max(0, c - 1))}
          disabled={currentCard === 0}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
          style={{
            backgroundColor: currentCard === 0 ? "transparent" : "rgba(0,0,0,0.06)",
            color: currentCard === 0 ? "rgba(0,0,0,0.15)" : "#666",
            cursor: currentCard === 0 ? "default" : "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: liveTotalCards }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentCard(i)}
              className="rounded-full transition-all"
              style={{
                width: currentCard === i ? 18 : 7,
                height: 7,
                backgroundColor: currentCard === i ? color : "rgba(0,0,0,0.12)",
                borderRadius: 999,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentCard((c) => Math.min(liveTotalCards - 1, c + 1))}
          disabled={currentCard === liveTotalCards - 1}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
          style={{
            backgroundColor: currentCard === liveTotalCards - 1 ? "transparent" : "rgba(0,0,0,0.06)",
            color: currentCard === liveTotalCards - 1 ? "rgba(0,0,0,0.15)" : "#666",
            cursor: currentCard === liveTotalCards - 1 ? "default" : "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* no action buttons below card */}
      </div>

      {/* Password modal */}
      {showPwModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowPwModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[320px] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[14px] font-semibold mb-1" style={{ color: "#2C2C2C" }}>
              편집 비밀번호
            </p>
            <p className="text-[11px] mb-4" style={{ color: "#999" }}>
              편집하려면 비밀번호를 입력하세요
            </p>
            <input
              type="password"
              value={pwInput}
              onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
              placeholder="비밀번호"
              className="w-full rounded-lg border px-3 py-2.5 text-[16px] mb-2"
              style={{ borderColor: pwError ? "#e55" : "rgba(0,0,0,0.12)", color: "#333" }}
              autoFocus
              onKeyDown={(e) => { if (e.key === "Enter") handlePwSubmit(); }}
            />
            {pwError && (
              <p className="text-[11px] mb-2" style={{ color: "#e55" }}>비밀번호가 틀렸습니다</p>
            )}
            <div className="flex gap-2 justify-end mt-2">
              <button
                onClick={() => setShowPwModal(false)}
                className="text-[12px] px-4 py-2 rounded-lg"
                style={{ backgroundColor: "rgba(0,0,0,0.06)", color: "#666" }}
              >
                취소
              </button>
              <button
                onClick={handlePwSubmit}
                className="text-[12px] px-4 py-2 rounded-lg font-medium text-white"
                style={{ backgroundColor: "#2C2C2C" }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline editor */}
      {editing && onUpdate && (
        <div className="w-full md:flex-1 md:min-w-0 rounded-xl p-4 md:sticky md:top-6" style={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
          <p className="text-[9px] font-mono mb-0.5" style={{ color: "#999" }}>제목 (줄바꿈 가능)</p>
          <textarea
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full rounded-md border px-2.5 py-1.5 text-[16px] font-medium mb-2 resize-none"
            style={{ borderColor: "rgba(0,0,0,0.1)", color: "#333", minHeight: 48, fontSize: 16 }}
          />
          <p className="text-[9px] font-mono mb-0.5" style={{ color: "#999" }}>커버 제목 크기: {editCoverTitleSize}px</p>
          <input
            type="range"
            min={20}
            max={44}
            value={editCoverTitleSize}
            onChange={(e) => setEditCoverTitleSize(Number(e.target.value))}
            className="w-full mb-2"
          />
          <p className="text-[9px] font-mono mb-0.5" style={{ color: "#999" }}>카드 제목 크기: {editTitleSize}px</p>
          <input
            type="range"
            min={14}
            max={32}
            value={editTitleSize}
            onChange={(e) => setEditTitleSize(Number(e.target.value))}
            className="w-full mb-2"
          />
          <p className="text-[9px] font-mono mb-0.5" style={{ color: "#999" }}>카드 테마</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {(Object.keys(THEMES) as CardTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => setEditTheme(t)}
                className="text-[8px] px-2 py-0.5 rounded-full font-medium transition-all"
                style={{
                  backgroundColor: editTheme === t ? THEMES[t].bg : "rgba(0,0,0,0.05)",
                  color: editTheme === t ? THEMES[t].text : "#888",
                  border: editTheme === t ? "2px solid " + color : "2px solid transparent",
                }}
              >
                {THEMES[t].label}
              </button>
            ))}
          </div>
          <p className="text-[9px] font-mono mb-0.5" style={{ color: "#999" }}>폰트 컬러</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {FONT_COLORS.map((fc) => (
              <button
                key={fc.value || "default"}
                onClick={() => setEditFontColor(fc.value)}
                className="text-[8px] px-2 py-0.5 rounded-full font-medium transition-all flex items-center gap-0.5"
                style={{
                  backgroundColor: editFontColor === fc.value ? (fc.value || activeTheme.text) : "rgba(0,0,0,0.05)",
                  color: editFontColor === fc.value ? (fc.value === "#FFFFFF" || !fc.value ? "#333" : "#fff") : "#888",
                  border: editFontColor === fc.value ? `2px solid ${color}` : "2px solid transparent",
                }}
              >
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: fc.value || activeTheme.text, border: "1px solid rgba(0,0,0,0.15)" }} />
                {fc.label}
              </button>
            ))}
          </div>
          <p className="text-[9px] font-mono mb-0.5" style={{ color: "#999" }}>스타일</p>
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <button
              onClick={() => setEditBoldCoverTitle(!editBoldCoverTitle)}
              className="text-[8px] px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: editBoldCoverTitle ? "#333" : "rgba(0,0,0,0.06)", color: editBoldCoverTitle ? "#fff" : "#888" }}
            >
              커버제목 B
            </button>
            <button
              onClick={() => setEditBoldCardTitle(!editBoldCardTitle)}
              className="text-[8px] px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: editBoldCardTitle ? "#333" : "rgba(0,0,0,0.06)", color: editBoldCardTitle ? "#fff" : "#888" }}
            >
              카드제목 B
            </button>
            <button
              onClick={() => setEditBoldItems(!editBoldItems)}
              className="text-[8px] px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: editBoldItems ? "#333" : "rgba(0,0,0,0.06)", color: editBoldItems ? "#fff" : "#888" }}
            >
              아이템 B
            </button>
            <button
              onClick={() => setEditNumbered(true)}
              className="text-[8px] px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: editNumbered ? "#333" : "rgba(0,0,0,0.06)", color: editNumbered ? "#fff" : "#888" }}
            >
              번호
            </button>
            <button
              onClick={() => setEditNumbered(false)}
              className="text-[8px] px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: !editNumbered ? "#333" : "rgba(0,0,0,0.06)", color: !editNumbered ? "#fff" : "#888" }}
            >
              플레인
            </button>
          </div>
          <p className="text-[9px] font-mono mb-0.5" style={{ color: "#999" }}>필 컬러</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {PILL_COLORS.map((p) => (
              <button
                key={p.value}
                onClick={() => setEditPillColor(p.value)}
                className="text-[8px] px-2 py-0.5 rounded-full font-medium transition-all flex items-center gap-0.5"
                style={{
                  backgroundColor: editPillColor === p.value ? p.value : "rgba(0,0,0,0.05)",
                  color: editPillColor === p.value ? p.textDark : "#888",
                  border: editPillColor === p.value ? `2px solid ${color}` : "2px solid transparent",
                }}
              >
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.value, border: "1px solid rgba(0,0,0,0.1)" }} />
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-[9px] font-mono mb-0.5" style={{ color: "#999" }}>아이템 (한 줄에 하나씩)</p>
          <textarea
            value={editItems}
            onChange={(e) => setEditItems(e.target.value)}
            className="w-full rounded-md border p-2.5 text-[16px] leading-relaxed resize-none"
            style={{ borderColor: "rgba(0,0,0,0.1)", color: "#333", minHeight: 170, fontSize: 16 }}
            placeholder="아이템을 한 줄에 하나씩 입력하세요..."
          />
          <div className="flex gap-1.5 mt-1.5">
            <button
              onClick={() => {
                const lines = editItems.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
                onUpdate(editTitle.trim(), lines, {
                  titleSize: editTitleSize, coverTitleSize: editCoverTitleSize,
                  numbered: editNumbered, cardTheme: editTheme, pillColor: editPillColor,
                  fontColor: editFontColor, boldCoverTitle: editBoldCoverTitle,
                  boldCardTitle: editBoldCardTitle, boldItems: editBoldItems,
                });
                setEditing(false);
              }}
              className="text-[10px] px-3 py-1.5 rounded-md font-medium text-white"
              style={{ backgroundColor: color }}
            >
              저장
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-[10px] px-3 py-1.5 rounded-md"
              style={{ backgroundColor: "rgba(0,0,0,0.06)", color: "#666" }}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
