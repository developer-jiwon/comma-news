"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { volumes } from "@/data/categories";
import CardNews from "@/components/CardNews";

export default function AdminManager() {
  const [selectedSlug, setSelectedSlug] = useState(volumes[0].slug);
  const volume = volumes.find((v) => v.slug === selectedSlug) || volumes[0];

  // Local state per volume (persisted in localStorage)
  const [itemsMap, setItemsMap] = useState<Record<string, string[]>>({});
  const [titlesMap, setTitlesMap] = useState<Record<string, string>>({});
  const [inputText, setInputText] = useState("");
  const [titleText, setTitleText] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem("comma-items");
    if (savedItems) setItemsMap(JSON.parse(savedItems));
    const savedTitles = localStorage.getItem("comma-titles");
    if (savedTitles) setTitlesMap(JSON.parse(savedTitles));
  }, []);

  // Sync inputs when switching volumes
  useEffect(() => {
    const items = itemsMap[selectedSlug] || volume.items;
    setInputText(items.join("\n"));
    setTitleText(titlesMap[selectedSlug] || volume.title);
  }, [selectedSlug, itemsMap, titlesMap, volume.items, volume.title]);

  const handleSave = () => {
    const lines = inputText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
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

  const currentItems = itemsMap[selectedSlug] || volume.items;
  const currentTitle = titlesMap[selectedSlug] || volume.title;

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
                      vol.slug === selectedSlug
                        ? vol.color
                        : "rgba(0,0,0,0.04)",
                    color:
                      vol.slug === selectedSlug ? "#fff" : "#666",
                  }}
                >
                  {vol.vol} {vol.title}
                </button>
              ))}
            </div>
          </header>

          {/* Editor */}
          <section className="px-8 pb-6">
            <p
              className="text-[11px] font-mono mb-2"
              style={{ color: "#999" }}
            >
              제목
            </p>
            <input
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-[14px] font-semibold mb-4"
              style={{
                borderColor: "rgba(0,0,0,0.1)",
                color: "#333",
              }}
            />
            <p
              className="text-[11px] font-mono mb-2"
              style={{ color: "#999" }}
            >
              아이템 (한 줄에 하나씩) — {currentItems.length}개
            </p>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full rounded-lg border p-3 text-[13px] leading-relaxed resize-none"
              style={{
                borderColor: "rgba(0,0,0,0.1)",
                color: "#333",
                minHeight: 200,
              }}
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
                style={{
                  backgroundColor: "rgba(0,0,0,0.06)",
                  color: "#666",
                }}
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
              showSave
            />
          </section>
        </div>
      </div>
    </div>
  );
}
