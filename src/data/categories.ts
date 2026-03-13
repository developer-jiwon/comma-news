export interface Volume {
  slug: string;
  vol: string; // "01", "02", ...
  title: string;
  color: string;
  colorLight: string;
  cardBg: string;
  cardText: string;
  items: string[];
}

export const volumes: Volume[] = [
  {
    slug: "selfcare-20man",
    vol: "01",
    title: "월 20만원 셀프케어 루틴",
    color: "#7CABB8",
    colorLight: "#EAF4F6",
    cardBg: "#1A2A38",
    cardText: "#E8F0F5",
    items: [],
  },
  {
    slug: "before-quitting",
    vol: "02",
    title: "퇴사 전 반드시 해야 할 것",
    color: "#8B9DBF",
    colorLight: "#EEF1F7",
    cardBg: "#1C2440",
    cardText: "#E5EAF3",
    items: [],
  },
  {
    slug: "letter-to-past",
    vol: "03",
    title: "10년 전 나에게 하고 싶은 말",
    color: "#6BA8A5",
    colorLight: "#E6F4F3",
    cardBg: "#1A3030",
    cardText: "#E0F0EF",
    items: [],
  },
  {
    slug: "best-office-life",
    vol: "04",
    title: "직장인으로써 할 수 있는 최선의 삶",
    color: "#7B93B8",
    colorLight: "#ECF0F7",
    cardBg: "#1B2538",
    cardText: "#E3EAF5",
    items: [],
  },
];

export function getVolumeBySlug(slug: string): Volume | undefined {
  return volumes.find((v) => v.slug === slug);
}
