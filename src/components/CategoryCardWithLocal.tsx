"use client";

import { useState, useEffect, useCallback } from "react";
import type { Volume } from "@/data/categories";
import CardNews from "./CardNews";

export default function CategoryCardWithLocal({ volume }: { volume: Volume }) {
  const [items, setItems] = useState<string[]>(volume.items);
  const [title, setTitle] = useState<string>(volume.title);
  const [titleSize, setTitleSize] = useState<number>(volume.titleSize || 19);
  const [coverTitleSize, setCoverTitleSize] = useState<number>((volume as any).coverTitleSize || 34);
  const [numbered, setNumbered] = useState<boolean>(volume.numbered ?? true);
  const [cardTheme, setCardTheme] = useState<string>(volume.cardTheme || "black");
  const [pillColor, setPillColor] = useState<string>(volume.pillColor || "#F5E050");
  const [fontColor, setFontColor] = useState<string>((volume as any).fontColor || "");
  const [boldCoverTitle, setBoldCoverTitle] = useState<boolean>((volume as any).boldCoverTitle ?? true);
  const [boldCardTitle, setBoldCardTitle] = useState<boolean>((volume as any).boldCardTitle ?? true);
  const [boldItems, setBoldItems] = useState<boolean>((volume as any).boldItems ?? true);

  useEffect(() => {
    // localStorage overrides for live editing (fallback to volume defaults from JSON)
    const savedItems = localStorage.getItem("comma-items");
    const savedTitles = localStorage.getItem("comma-titles");
    const savedSizes = localStorage.getItem("comma-title-sizes");
    if (savedItems) {
      const itemsMap: Record<string, string[]> = JSON.parse(savedItems);
      if (itemsMap[volume.slug]?.length) setItems(itemsMap[volume.slug]);
    }
    if (savedTitles) {
      const titlesMap: Record<string, string> = JSON.parse(savedTitles);
      if (titlesMap[volume.slug]) setTitle(titlesMap[volume.slug]);
    }
    if (savedSizes) {
      const sizesMap: Record<string, number> = JSON.parse(savedSizes);
      if (sizesMap[volume.slug]) setTitleSize(sizesMap[volume.slug]);
    }
    const savedCoverSizes = localStorage.getItem("comma-cover-title-sizes");
    if (savedCoverSizes) {
      const coverSizesMap: Record<string, number> = JSON.parse(savedCoverSizes);
      if (coverSizesMap[volume.slug]) setCoverTitleSize(coverSizesMap[volume.slug]);
    }
    const savedNumbered = localStorage.getItem("comma-numbered");
    if (savedNumbered) {
      const numberedMap: Record<string, boolean> = JSON.parse(savedNumbered);
      if (numberedMap[volume.slug] !== undefined) setNumbered(numberedMap[volume.slug]);
    }
    const savedThemes = localStorage.getItem("comma-themes");
    if (savedThemes) {
      const themesMap: Record<string, string> = JSON.parse(savedThemes);
      if (themesMap[volume.slug]) setCardTheme(themesMap[volume.slug]);
    }
    const savedPills = localStorage.getItem("comma-pill-colors");
    if (savedPills) {
      const pillsMap: Record<string, string> = JSON.parse(savedPills);
      if (pillsMap[volume.slug]) setPillColor(pillsMap[volume.slug]);
    }
  }, [volume.slug]);

  const handleUpdate = useCallback((newTitle: string, newItems: string[], opts?: {
    titleSize?: number; coverTitleSize?: number; numbered?: boolean;
    cardTheme?: string; pillColor?: string; fontColor?: string;
    boldCoverTitle?: boolean; boldCardTitle?: boolean; boldItems?: boolean;
  }) => {
    const o = opts || {};
    // Save to localStorage
    const savedItems = localStorage.getItem("comma-items");
    const savedTitles = localStorage.getItem("comma-titles");
    const itemsMap: Record<string, string[]> = savedItems ? JSON.parse(savedItems) : {};
    const titlesMap: Record<string, string> = savedTitles ? JSON.parse(savedTitles) : {};
    itemsMap[volume.slug] = newItems;
    titlesMap[volume.slug] = newTitle;
    localStorage.setItem("comma-items", JSON.stringify(itemsMap));
    localStorage.setItem("comma-titles", JSON.stringify(titlesMap));

    if (o.titleSize) { setTitleSize(o.titleSize); }
    if (o.coverTitleSize) { setCoverTitleSize(o.coverTitleSize); }
    if (o.numbered !== undefined) { setNumbered(o.numbered); }
    if (o.cardTheme) { setCardTheme(o.cardTheme); }
    if (o.pillColor) { setPillColor(o.pillColor); }
    if (o.fontColor !== undefined) { setFontColor(o.fontColor); }
    if (o.boldCoverTitle !== undefined) { setBoldCoverTitle(o.boldCoverTitle); }
    if (o.boldCardTitle !== undefined) { setBoldCardTitle(o.boldCardTitle); }
    if (o.boldItems !== undefined) { setBoldItems(o.boldItems); }

    setItems(newItems);
    setTitle(newTitle);

    // Sync to file via API
    fetch("/api/sync-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: volume.slug,
        title: newTitle,
        items: newItems,
        titleSize: o.titleSize || titleSize,
        coverTitleSize: o.coverTitleSize || coverTitleSize,
        numbered: o.numbered ?? numbered,
        cardTheme: o.cardTheme || cardTheme,
        pillColor: o.pillColor || pillColor,
        fontColor: o.fontColor ?? fontColor,
        boldCoverTitle: o.boldCoverTitle ?? boldCoverTitle,
        boldCardTitle: o.boldCardTitle ?? boldCardTitle,
        boldItems: o.boldItems ?? boldItems,
      }),
    }).catch(() => {});
  }, [volume.slug, titleSize, coverTitleSize, numbered, cardTheme, pillColor, fontColor, boldCoverTitle, boldCardTitle, boldItems]);

  return (
    <CardNews
      title={title}
      items={items}
      color={volume.color}
      cardBg={volume.cardBg}
      cardText={volume.cardText}
      coverImage={volume.coverImage}
      titleSize={titleSize}
      coverTitleSize={coverTitleSize}
      numbered={numbered}
      cardTheme={cardTheme as any}
      pillColor={pillColor}
      fontColor={fontColor}
      boldCoverTitle={boldCoverTitle}
      boldCardTitle={boldCardTitle}
      boldItems={boldItems}
      showSave
      onUpdate={handleUpdate}
    />
  );
}
