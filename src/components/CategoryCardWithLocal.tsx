"use client";

import { useState, useEffect } from "react";
import type { Volume } from "@/data/categories";
import CardNews from "./CardNews";

export default function CategoryCardWithLocal({ volume }: { volume: Volume }) {
  const [items, setItems] = useState<string[]>(volume.items);
  const [title, setTitle] = useState<string>(volume.title);

  useEffect(() => {
    const savedItems = localStorage.getItem("comma-items");
    const savedTitles = localStorage.getItem("comma-titles");
    if (savedItems) {
      const itemsMap: Record<string, string[]> = JSON.parse(savedItems);
      if (itemsMap[volume.slug]?.length) setItems(itemsMap[volume.slug]);
    }
    if (savedTitles) {
      const titlesMap: Record<string, string> = JSON.parse(savedTitles);
      if (titlesMap[volume.slug]) setTitle(titlesMap[volume.slug]);
    }
  }, [volume.slug]);

  return (
    <CardNews
      title={title}
      items={items}
      color={volume.color}
      cardBg={volume.cardBg}
      cardText={volume.cardText}
      coverImage={volume.coverImage}
    />
  );
}
