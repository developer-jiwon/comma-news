"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface MainHeaderProps {
  onAddVolume?: (title: string, slug: string) => void;
  subtitle?: string;
}

export default function MainHeader({ onAddVolume, subtitle }: MainHeaderProps) {
  const [isLocal, setIsLocal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    setIsLocal(
      window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
    );
  }, []);

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const slug = newTitle
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]+/g, "-")
      .replace(/^-|-$/g, "");
    onAddVolume?.(newTitle.trim(), slug);
    setNewTitle("");
    setShowModal(false);
  };

  return (
    <>
      <nav className="flex items-center mb-8">
        <button
          onClick={() => {
            if (isLocal) setShowModal(true);
          }}
          className="flex items-center"
          style={{ cursor: isLocal ? "pointer" : "default" }}
        >
          <Image
            src="/comma-logo.png"
            alt="comma"
            width={28}
            height={28}
            className="object-contain -mr-1"
            style={{ width: 28, height: 28 }}
          />
          <span
            className="font-serif text-lg font-semibold"
            style={{ color: "#2C2C2C" }}
          >
            comma,
          </span>
        </button>
        {subtitle && (
          <span
            className="ml-3 text-[13px] font-light tracking-[0.04em]"
            style={{ color: "#999" }}
          >
            {subtitle}
          </span>
        )}
      </nav>

      {/* Add Volume Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[340px] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="text-[15px] font-semibold mb-4"
              style={{ color: "#2C2C2C" }}
            >
              카드뉴스를 추가하시겠습니까?
            </p>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="카드뉴스 제목을 입력하세요"
              className="w-full rounded-lg border px-3 py-2.5 text-[13px] mb-4"
              style={{ borderColor: "rgba(0,0,0,0.12)", color: "#333" }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-[12px] px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: "rgba(0,0,0,0.06)",
                  color: "#666",
                }}
              >
                취소
              </button>
              <button
                onClick={handleAdd}
                className="text-[12px] px-4 py-2 rounded-lg font-medium text-white"
                style={{ backgroundColor: "#2C2C2C" }}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
