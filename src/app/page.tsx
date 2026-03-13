import Image from "next/image";
import Link from "next/link";
import VolumesWithLocal from "@/components/VolumesWithLocal";

export default function Home() {
  return (
    <div className="min-h-screen bg-tile bg-tile-diamond relative">
      <div className="relative z-10">
        <div className="max-w-[480px] mx-auto min-h-screen">
          {/* Header */}
          <header className="px-8 pt-10 pb-6">
            {/* Logo */}
            <nav className="flex items-center mb-8">
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
            </nav>

            {/* Hero */}
            <div className="flex flex-col">
              <h1 className="leading-[1.35]">
                <span
                  className="text-[28px] sm:text-[32px] block font-semibold"
                  style={{ color: "#2C2C2C" }}
                >
                  100가지 이유를
                </span>
                <span
                  className="text-[28px] sm:text-[32px] block font-semibold"
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

            <VolumesWithLocal />
          </section>

          {/* Footer */}
          <footer className="px-8 py-8 mt-4">
            <div
              className="h-px mb-6"
              style={{ background: "rgba(0,0,0,0.06)" }}
            />
            <div className="flex items-center justify-between">
              <span
                className="font-serif text-sm italic"
                style={{ color: "#BBB" }}
              >
                comma,
              </span>
              <span
                className="text-[11px] tracking-wide"
                style={{ color: "#BBB" }}
              >
                모든 것에는 이유가 있다
              </span>
            </div>
            <div className="flex gap-4 mt-4">
              <Link
                href="/privacy"
                className="text-[11px] hover:opacity-70 transition-opacity"
                style={{ color: "#BBB" }}
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="text-[11px] hover:opacity-70 transition-opacity"
                style={{ color: "#BBB" }}
              >
                이용약관
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
