import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-tile bg-tile-diamond relative">
      <div className="relative z-10">
        <div className="max-w-[480px] mx-auto min-h-screen px-8 py-10">
          <Link
            href="/"
            className="text-[13px] mb-8 inline-block hover:opacity-70 transition-opacity"
            style={{ color: "#888" }}
          >
            ← 돌아가기
          </Link>

          <h1
            className="text-[22px] font-semibold mb-8"
            style={{ color: "#2C2C2C" }}
          >
            이용약관
          </h1>

          <div
            className="text-[14px] leading-relaxed flex flex-col gap-6"
            style={{ color: "#555" }}
          >
            <section>
              <h2 className="font-semibold mb-2" style={{ color: "#333" }}>
                1. 서비스 소개
              </h2>
              <p>
                comma,(이하 &quot;서비스&quot;)는 카드뉴스 형태의 콘텐츠를
                제공하는 웹사이트입니다. 별도의 회원가입 없이 누구나 자유롭게
                이용할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-2" style={{ color: "#333" }}>
                2. 콘텐츠 저작권
              </h2>
              <p>
                본 서비스에 게시된 모든 콘텐츠(텍스트, 이미지, 디자인 등)의
                저작권은 comma,에 있습니다. 개인적인 용도로의 공유는 허용하나,
                상업적 무단 복제 및 배포는 금지합니다.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-2" style={{ color: "#333" }}>
                3. 면책 조항
              </h2>
              <p>
                서비스에서 제공하는 콘텐츠는 참고 목적이며, 콘텐츠의 정확성이나
                완전성을 보장하지 않습니다. 콘텐츠 이용으로 인한 직간접적 손해에
                대해 책임지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-2" style={{ color: "#333" }}>
                4. 서비스 변경 및 중단
              </h2>
              <p>
                서비스는 사전 고지 없이 내용을 변경하거나 운영을 중단할 수
                있습니다.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-2" style={{ color: "#333" }}>
                5. 약관 변경
              </h2>
              <p>
                본 약관은 필요에 따라 변경될 수 있으며, 변경 시 서비스 내에
                공지합니다.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-2" style={{ color: "#333" }}>
                6. 문의
              </h2>
              <p>이메일: jiwonnnnieee@gmail.com</p>
            </section>

            <p className="text-[12px] mt-4" style={{ color: "#AAA" }}>
              시행일: 2026년 3월 12일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
