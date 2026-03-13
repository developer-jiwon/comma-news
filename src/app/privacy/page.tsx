import Link from "next/link";

export default function PrivacyPage() {
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
            개인정보처리방침
          </h1>

          <div
            className="text-[14px] leading-relaxed flex flex-col gap-6"
            style={{ color: "#555" }}
          >
            <section>
              <h2 className="font-semibold mb-2" style={{ color: "#333" }}>
                1. 수집하는 개인정보
              </h2>
              <p>
                comma,는 별도의 회원가입 없이 이용 가능하며, 직접적인 개인정보를
                수집하지 않습니다. 다만, 서비스 이용 과정에서 아래 정보가 자동으로
                생성/수집될 수 있습니다.
              </p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                <li>방문 기록, 접속 로그, 쿠키</li>
                <li>기기 정보 (브라우저 종류, OS)</li>
                <li>IP 주소</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold mb-2" style={{ color: "#333" }}>
                2. 광고 서비스 (Google AdSense)
              </h2>
              <p>
                본 사이트는 Google AdSense를 통해 광고를 게재하고 있습니다.
                Google은 사용자의 관심사에 기반한 광고를 제공하기 위해 쿠키를
                사용할 수 있습니다.
              </p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                <li>
                  Google의 광고 쿠키 사용에 대한 자세한 내용은{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Google 광고 정책
                  </a>
                  을 참고하세요.
                </li>
                <li>
                  맞춤 광고를 원하지 않는 경우{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Google 광고 설정
                  </a>
                  에서 비활성화할 수 있습니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold mb-2" style={{ color: "#333" }}>
                3. 쿠키 사용
              </h2>
              <p>
                본 사이트는 서비스 제공 및 광고 목적으로 쿠키를 사용합니다.
                브라우저 설정을 통해 쿠키 사용을 거부할 수 있으며, 이 경우 일부
                서비스 이용에 제한이 있을 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-2" style={{ color: "#333" }}>
                4. 개인정보의 보유 및 이용 기간
              </h2>
              <p>
                자동 수집되는 정보는 수집 목적이 달성된 후 지체 없이 파기합니다.
              </p>
            </section>

            <section>
              <h2 className="font-semibold mb-2" style={{ color: "#333" }}>
                5. 문의
              </h2>
              <p>
                개인정보 관련 문의사항은 아래로 연락해 주세요.
              </p>
              <p className="mt-2">이메일: jiwonnnnieee@gmail.com</p>
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
