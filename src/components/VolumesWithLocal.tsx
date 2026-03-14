"use client";

import { useState, useEffect, useCallback } from "react";
import { volumes, type Volume } from "@/data/categories";
import VolumeAccordion from "./VolumeAccordion";
import MainHeader from "./MainHeader";

const DEFAULT_COLORS = [
  { color: "#7CABB8", colorLight: "#EAF4F6", cardBg: "#1A2A38", cardText: "#E8F0F5" },
  { color: "#8B9DBF", colorLight: "#EEF1F7", cardBg: "#1C2440", cardText: "#E5EAF3" },
  { color: "#6BA8A5", colorLight: "#E6F4F3", cardBg: "#1A3030", cardText: "#E0F0EF" },
  { color: "#7B93B8", colorLight: "#ECF0F7", cardBg: "#1B2538", cardText: "#E3EAF5" },
  { color: "#A0897B", colorLight: "#F5F0EC", cardBg: "#2A2018", cardText: "#F0E6D8" },
  { color: "#8B7BA5", colorLight: "#F0ECF5", cardBg: "#1E1828", cardText: "#E8E0F0" },
];

export default function VolumesWithLocal() {
  const [merged, setMerged] = useState<Volume[]>(volumes);

  const loadVolumes = useCallback(() => {
    const savedItems = localStorage.getItem("comma-items");
    const savedTitles = localStorage.getItem("comma-titles");
    const savedCustom = localStorage.getItem("comma-custom-volumes");
    const itemsMap: Record<string, string[]> = savedItems ? JSON.parse(savedItems) : {};
    const titlesMap: Record<string, string> = savedTitles ? JSON.parse(savedTitles) : {};
    const customVolumes: Volume[] = savedCustom ? JSON.parse(savedCustom) : [];

    const allVolumes = [...volumes, ...customVolumes];
    const updated = allVolumes.map((vol) => ({
      ...vol,
      title: titlesMap[vol.slug] || vol.title,
      items: itemsMap[vol.slug]?.length ? itemsMap[vol.slug] : vol.items,
    }));
    setMerged(updated);
  }, []);

  useEffect(() => {
    loadVolumes();
  }, [loadVolumes]);

  const handleAddVolume = useCallback((title: string, slug: string) => {
    const savedCustom = localStorage.getItem("comma-custom-volumes");
    const customVolumes: Volume[] = savedCustom ? JSON.parse(savedCustom) : [];

    const allSlugs = [...volumes.map((v) => v.slug), ...customVolumes.map((v) => v.slug)];
    if (allSlugs.includes(slug)) {
      alert("이미 같은 슬러그의 볼륨이 있습니다.");
      return;
    }

    const colorSet = DEFAULT_COLORS[(volumes.length + customVolumes.length) % DEFAULT_COLORS.length];
    const volNum = String(volumes.length + customVolumes.length + 1).padStart(2, "0");

    const newVol: Volume = {
      slug,
      vol: volNum,
      title,
      ...colorSet,
      items: [],
    };

    customVolumes.push(newVol);
    localStorage.setItem("comma-custom-volumes", JSON.stringify(customVolumes));
    loadVolumes();
  }, [loadVolumes]);

  return (
    <>
      {/* Header */}
      <header className="px-8 pt-10 pb-6">
        <MainHeader onAddVolume={handleAddVolume} />

        {/* Hero */}
        <div className="flex flex-col">
          <h1 className="leading-[1.35]">
            <span
              className="text-[28px] sm:text-[32px] block font-light tracking-[0.04em]"
              style={{ color: "#2C2C2C" }}
            >
              100가지 이유를
            </span>
            <span
              className="text-[28px] sm:text-[32px] block font-light tracking-[0.04em]"
              style={{ color: "#2C2C2C" }}
            >
              찾아가는 여정
            </span>
          </h1>

          <p
            className="mt-4 text-[13px] leading-relaxed"
            style={{ color: "#888" }}
          >
            매일 새로운 영감을 콤마 하나에 담았습니다.
          </p>
        </div>
      </header>

      {/* Divider */}
      <div
        className="mx-8 h-px"
        style={{ background: "rgba(0,0,0,0.08)" }}
      />

      {/* Volumes */}
      <section className="px-8 pt-8 pb-6">
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-6 font-mono"
          style={{ color: "#AAA" }}
        >
          Volumes
        </p>

        <VolumeAccordion volumes={merged} />
      </section>
    </>
  );
}
