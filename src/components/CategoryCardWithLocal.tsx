"use client";

import { useState, useEffect, useCallback } from "react";
import type { Volume } from "@/data/categories";
import CardNews from "./CardNews";

export default function CategoryCardWithLocal({ volume }: { volume: Volume }) {
  const [items, setItems] = useState<string[]>(volume.items);
  const [title, setTitle] = useState<string>(volume.title);
  const [titleSize, setTitleSize] = useState<number>(volume.titleSize || 26);
  const [numbered, setNumbered] = useState<boolean>(volume.numbered ?? true);
  const [cardTheme, setCardTheme] = useState<string>(volume.cardTheme || "black");
  const [pillColor, setPillColor] = useState<string>(volume.pillColor || "#F5E050");

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

  const handleUpdate = useCallback((newTitle: string, newItems: string[], newTitleSize?: number, newNumbered?: boolean, newTheme?: string, newPillColor?: string) => {
    // Save to localStorage (for immediate preview)
    const savedItems = localStorage.getItem("comma-items");
    const savedTitles = localStorage.getItem("comma-titles");
    const savedSizes = localStorage.getItem("comma-title-sizes");
    const itemsMap: Record<string, string[]> = savedItems ? JSON.parse(savedItems) : {};
    const titlesMap: Record<string, string> = savedTitles ? JSON.parse(savedTitles) : {};
    const sizesMap: Record<string, number> = savedSizes ? JSON.parse(savedSizes) : {};

    itemsMap[volume.slug] = newItems;
    titlesMap[volume.slug] = newTitle;
    if (newTitleSize) sizesMap[volume.slug] = newTitleSize;
    localStorage.setItem("comma-items", JSON.stringify(itemsMap));
    localStorage.setItem("comma-titles", JSON.stringify(titlesMap));
    localStorage.setItem("comma-title-sizes", JSON.stringify(sizesMap));

    if (newNumbered !== undefined) {
      const savedNumbered = localStorage.getItem("comma-numbered");
      const numberedMap: Record<string, boolean> = savedNumbered ? JSON.parse(savedNumbered) : {};
      numberedMap[volume.slug] = newNumbered;
      localStorage.setItem("comma-numbered", JSON.stringify(numberedMap));
      setNumbered(newNumbered);
    }

    if (newTheme) {
      const savedThemes = localStorage.getItem("comma-themes");
      const themesMap: Record<string, string> = savedThemes ? JSON.parse(savedThemes) : {};
      themesMap[volume.slug] = newTheme;
      localStorage.setItem("comma-themes", JSON.stringify(themesMap));
      setCardTheme(newTheme);
    }

    if (newPillColor) {
      const savedPills = localStorage.getItem("comma-pill-colors");
      const pillsMap: Record<string, string> = savedPills ? JSON.parse(savedPills) : {};
      pillsMap[volume.slug] = newPillColor;
      localStorage.setItem("comma-pill-colors", JSON.stringify(pillsMap));
      setPillColor(newPillColor);
    }

    setItems(newItems);
    setTitle(newTitle);
    if (newTitleSize) setTitleSize(newTitleSize);

    // Sync to file via API (localhost only — writes to volume-content.json)
    fetch("/api/sync-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: volume.slug,
        title: newTitle,
        items: newItems,
        titleSize: newTitleSize || titleSize,
        numbered: newNumbered ?? numbered,
        cardTheme: newTheme || cardTheme,
        pillColor: newPillColor || pillColor,
      }),
    }).catch(() => {});
  }, [volume.slug, titleSize, numbered, cardTheme, pillColor]);

  return (
    <CardNews
      title={title}
      items={items}
      color={volume.color}
      cardBg={volume.cardBg}
      cardText={volume.cardText}
      coverImage={volume.coverImage}
      titleSize={titleSize}
      numbered={numbered}
      cardTheme={cardTheme as any}
      pillColor={pillColor}
      showSave
      onUpdate={handleUpdate}
    />
  );
}
