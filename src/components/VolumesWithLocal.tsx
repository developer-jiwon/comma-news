"use client";

import { useState, useEffect } from "react";
import { volumes, type Volume } from "@/data/categories";
import VolumeAccordion from "./VolumeAccordion";

export default function VolumesWithLocal() {
  const [merged, setMerged] = useState<Volume[]>(volumes);

  useEffect(() => {
    const savedItems = localStorage.getItem("comma-items");
    const savedTitles = localStorage.getItem("comma-titles");
    const itemsMap: Record<string, string[]> = savedItems ? JSON.parse(savedItems) : {};
    const titlesMap: Record<string, string> = savedTitles ? JSON.parse(savedTitles) : {};
    const updated = volumes.map((vol) => ({
      ...vol,
      title: titlesMap[vol.slug] || vol.title,
      items: itemsMap[vol.slug]?.length ? itemsMap[vol.slug] : vol.items,
    }));
    setMerged(updated);
  }, []);

  return <VolumeAccordion volumes={merged} />;
}
