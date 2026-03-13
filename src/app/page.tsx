import Link from "next/link";
import VolumesWithLocal from "@/components/VolumesWithLocal";

export default function Home() {
  return (
    <div className="min-h-screen bg-tile bg-tile-diamond relative">
      <div className="relative z-10">
        <div className="max-w-[480px] mx-auto min-h-screen">
          {/* Header + Hero + Volumes — all in one client component for logo click */}
          <VolumesWithLocal />

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
