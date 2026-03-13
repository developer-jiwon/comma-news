"use client";

import { useState } from "react";
import Image from "next/image";
import type { Volume } from "@/data/categories";

interface VolumeAccordionProps {
  volumes: Volume[];
}

export default function VolumeAccordion({
  volumes,
}: VolumeAccordionProps) {
  const [openVol, setOpenVol] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {volumes.map((vol) => {
        const isOpen = openVol === vol.slug;
        const previewItems = vol.items.slice(0, 10);

        return (
          <div key={vol.slug}>
            {/* Volume Header */}
            <button
              onClick={() => setOpenVol(isOpen ? null : vol.slug)}
              className="w-full flex items-center gap-4 py-5 text-left transition-all duration-200 group"
              style={{
                borderBottom: !isOpen ? "1px solid rgba(0,0,0,0.06)" : "none",
              }}
            >
              {/* Comma icon + number */}
              <span className="flex items-center flex-shrink-0">
                <Image
                  src="/comma-icon-light.png"
                  alt=""
                  width={20}
                  height={20}
                  className="object-contain -mr-0.5"
                  style={{ width: 20, height: 20 }}
                />
                <span
                  className="text-[13px] font-mono font-bold"
                  style={{ color: "#555" }}
                >
                  {vol.vol}
                </span>
              </span>

              {/* Title */}
              <span
                className="flex-1 text-[15px] font-semibold transition-colors duration-200"
                style={{ color: isOpen ? "#2C2C2C" : "#444" }}
              >
                {vol.title}
              </span>

              {/* Count + Chevron */}
              <span
                className="text-[11px] font-mono tabular-nums mr-1"
                style={{ color: "#BBB" }}
              >
                {vol.items.length}
              </span>
              <svg
                className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                style={{
                  color: "#BBB",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown content */}
            <div
              className="overflow-hidden transition-all duration-500 ease-out"
              style={{
                maxHeight: isOpen ? `${previewItems.length * 52 + 80}px` : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="pb-4">
                {previewItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 py-2.5 pl-4 transition-all"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateX(0)" : "translateX(-12px)",
                      transitionDelay: isOpen ? `${idx * 40}ms` : "0ms",
                      transitionDuration: "400ms",
                      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.05)",
                        color: "#666",
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className="text-[14px] leading-snug"
                      style={{ color: "#444" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}

                {/* See all CTA — pill style, fast appear */}
                <a
                  href={`/category/${vol.slug}`}
                  className="inline-flex items-center gap-1.5 mt-4 ml-4 text-[12px] font-medium px-4 py-2 rounded-full transition-all hover:opacity-80"
                  style={{
                    backgroundColor: vol.color,
                    color: "#fff",
                    opacity: isOpen ? 1 : 0,
                    transitionDelay: isOpen ? "100ms" : "0ms",
                    transitionDuration: "200ms",
                  }}
                >
                  카드뉴스 전체보기 →
                </a>
              </div>

              <div
                className="h-px"
                style={{ background: "rgba(0,0,0,0.06)" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
