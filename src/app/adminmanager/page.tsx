"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { volumes } from "@/data/categories";
import CardNews from "@/components/CardNews";

const ADMIN_PW = "c0mma2026!adm";

export default function AdminManager() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(volumes[0].slug);
  const [itemsMap, setItemsMap] = useState<Record<string, string[]>>({});
  const [titlesMap, setTitlesMap] = useState<Record<string, string>>({});
  const [inputText, setInputText] = useState("");
  const [titleText, setTitleText] = useState("");

  const volume = volumes.find((v) => v.slug === selectedSlug) || volumes[0];

  useEffect(() => {
    if (localStorage.getItem("comma-admin") === ADMIN_PW) setAuthed(true);
    const savedItems = localStorage.getItem("comma-items");
    if (savedItems) setItemsMap(JSON.parse(savedItems));
    const savedTitles = localStorage.getItem("comma-titles");
    if (savedTitles) setTitlesMap(JSON.parse(savedTitles));
  }, []);

  useEffect(() => {
    const items = itemsMap[selectedSlug] || volume.items;
    setInputText(items.join("\n"));
    setTitleText(titlesMap[selectedSlug] || volume.title);
  }, [selectedSlug, itemsMap, titlesMap, volume.items, volume.title]);

  const handleLogin = () => {
    if (pw === ADMIN_PW) {
      localStorage.setItem("comma-admin", ADMIN_PW);
      setAuthed(true);
    } else {
      alert("비밀번호가 틀렸습니다");
    }
  };

  const handleSave = () => {
    const lines = inputText.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    const updatedItems = { ...itemsMap, [selectedSlug]: lines };
    const updatedTitles = { ...titlesMap, [selectedSlug]: titleText.trim() };
    setItemsMap(updatedItems);
    setTitlesMap(updatedTitles);
    localStorage.setItem("comma-items", JSON.stringify(updatedItems));
    localStorage.setItem("comma-titles", JSON.stringify(updatedTitles));
  };

  const handleCopyJSON = () => {
    const output = volumes.map((vol) => ({
      ...vol,
      title: titlesMap[vol.slug] || vol.title,
      items: itemsMap[vol.slug] || vol.items,
    }));
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    alert("JSON 복사됨!");
  };

  const handleSaveImage = useCallback(async () => {
    const cardEl = document.querySelector("[data-card-ref]") as HTMLElement;
    if (!cardEl) return;
    const { default: html2canvas } = await import("html2canvas-pro");
    const canvas = await html2canvas(cardEl, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });

    // Mobile: use share API if available, otherwise download
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `comma-${currentTitle}.png`, { type: "image/png" });

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
  }, []);

  const currentItems = itemsMap[selectedSlug] || volume.items;
  const currentTitle = titlesMap[selectedSlug] || volume.title;

  if (!authed) {
    return (
      <div className="min-h-screen bg-tile bg-tile-diamond relative flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm" style={{ width: 320 }}>
          <h2 className="text-[16px] font-semibold mb-4" style={{ color: "#2C2C2C" }}>
            Admin 로그인
          </h2>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="비밀번호"
            className="w-full rounded-lg border px-3 py-2 text-[14px] mb-3"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
            autoFocus
          />
          <button
            onClick={handleLogin}
            className="w-full text-[13px] py-2 rounded-lg font-medium text-white"
            style={{ backgroundColor: "#7CABB8" }}
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tile bg-tile-diamond relative">
      <div className="relative z-10">
        <div className="max-w-[480px] mx-auto min-h-screen">
          {/* Header */}
          <header className="px-8 pt-10 pb-6">
            <nav className="flex items-center mb-6">
              <Image
                src="/comma-logo.png"
                alt="comma"
                width={48}
                height={48}
                className="object-contain -mr-1"
                style={{ width: 48, height: 48 }}
              />
              <span
                className="font-serif text-lg font-semibold"
                style={{ color: "#2C2C2C" }}
              >
                comma,
              </span>
              <span
                className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded-md"
                style={{ backgroundColor: "rgba(0,0,0,0.06)", color: "#999" }}
              >
                admin
              </span>
            </nav>

            {/* Volume selector */}
            <div className="flex flex-wrap gap-2">
              {volumes.map((vol) => (
                <button
                  key={vol.slug}
                  onClick={() => setSelectedSlug(vol.slug)}
                  className="text-[11px] px-3 py-1.5 rounded-lg transition-all font-medium"
                  style={{
                    backgroundColor:
                      vol.slug === selectedSlug ? vol.color : "rgba(0,0,0,0.04)",
                    color: vol.slug === selectedSlug ? "#fff" : "#666",
                  }}
                >
                  {vol.vol} {titlesMap[vol.slug] || vol.title}
                </button>
              ))}
            </div>
          </header>

          {/* Editor */}
          <section className="px-8 pb-6">
            <p className="text-[11px] font-mono mb-2" style={{ color: "#999" }}>
              제목
            </p>
            <input
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-[14px] font-semibold mb-4"
              style={{ borderColor: "rgba(0,0,0,0.1)", color: "#333" }}
            />
            <p className="text-[11px] font-mono mb-2" style={{ color: "#999" }}>
              아이템 (한 줄에 하나씩) — {currentItems.length}개
            </p>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full rounded-lg border p-3 text-[13px] leading-relaxed resize-none"
              style={{ borderColor: "rgba(0,0,0,0.1)", color: "#333", minHeight: 200 }}
              placeholder="아이템을 한 줄에 하나씩 입력하세요..."
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSave}
                className="text-[12px] px-4 py-2 rounded-lg transition-all hover:opacity-80 font-medium"
                style={{ backgroundColor: volume.color, color: "#fff" }}
              >
                저장
              </button>
              <button
                onClick={handleCopyJSON}
                className="text-[12px] px-4 py-2 rounded-lg transition-all hover:opacity-80"
                style={{ backgroundColor: "rgba(0,0,0,0.06)", color: "#666" }}
              >
                전체 JSON 복사
              </button>
            </div>
          </section>

          {/* Card preview */}
          <section className="px-6 pb-10">
            <CardNews
              title={currentTitle}
              items={currentItems}
              color={volume.color}
              cardBg={volume.cardBg}
              cardText={volume.cardText}
              coverImage={volume.coverImage}
              showSave
            />
          </section>
        </div>
      </div>
    </div>
  );
}
