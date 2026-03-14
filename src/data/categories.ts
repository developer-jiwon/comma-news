import volumeContent from "./volume-content.json";

export interface Volume {
  slug: string;
  vol: string; // "01", "02", ...
  title: string;
  color: string;
  colorLight: string;
  cardBg: string;
  cardText: string;
  coverImage?: string; // optional cover photo URL
  items: string[];
  titleSize?: number;
  numbered?: boolean;
  cardTheme?: string;
  pillColor?: string;
}

type ContentMap = Record<string, {
  title?: string;
  items?: string[];
  titleSize?: number;
  numbered?: boolean;
  cardTheme?: string;
  pillColor?: string;
}>;

const content: ContentMap = volumeContent;

export const volumes: Volume[] = [
  {
    slug: "selfcare-20man",
    vol: "01",
    title: content["selfcare-20man"]?.title || "월 20만원 셀프케어 루틴",
    color: "#7CABB8",
    colorLight: "#EAF4F6",
    cardBg: "#1A2A38",
    cardText: "#E8F0F5",
    coverImage: "/cover-selfcare-20man.png",
    items: content["selfcare-20man"]?.items || [],
    titleSize: content["selfcare-20man"]?.titleSize,
    numbered: content["selfcare-20man"]?.numbered,
    cardTheme: content["selfcare-20man"]?.cardTheme,
    pillColor: content["selfcare-20man"]?.pillColor,
  },
  {
    slug: "before-quitting",
    vol: "02",
    title: content["before-quitting"]?.title || "추천 영화 리스트",
    color: "#8B9DBF",
    colorLight: "#EEF1F7",
    cardBg: "#1C2440",
    cardText: "#E5EAF3",
    coverImage: "/cover-before-quitting.png",
    items: content["before-quitting"]?.items || [],
    titleSize: content["before-quitting"]?.titleSize,
    numbered: content["before-quitting"]?.numbered,
    cardTheme: content["before-quitting"]?.cardTheme,
    pillColor: content["before-quitting"]?.pillColor,
  },
  {
    slug: "letter-to-past",
    vol: "03",
    title: content["letter-to-past"]?.title || "10년 전 나에게 하고 싶은 말",
    color: "#6BA8A5",
    colorLight: "#E6F4F3",
    cardBg: "#1A3030",
    cardText: "#E0F0EF",
    coverImage: "/cover-letter-to-past.png",
    items: content["letter-to-past"]?.items || [],
    titleSize: content["letter-to-past"]?.titleSize,
    numbered: content["letter-to-past"]?.numbered,
    cardTheme: content["letter-to-past"]?.cardTheme,
    pillColor: content["letter-to-past"]?.pillColor,
  },
  {
    slug: "best-office-life",
    vol: "04",
    title: content["best-office-life"]?.title || "직장인으로써 할 수 있는 최선의 삶",
    color: "#7B93B8",
    colorLight: "#ECF0F7",
    cardBg: "#1B2538",
    cardText: "#E3EAF5",
    // coverImage: "/cover-best-office-life.png",
    items: content["best-office-life"]?.items || [],
    titleSize: content["best-office-life"]?.titleSize,
    numbered: content["best-office-life"]?.numbered,
    cardTheme: content["best-office-life"]?.cardTheme,
    pillColor: content["best-office-life"]?.pillColor,
  },
];

export function getVolumeBySlug(slug: string): Volume | undefined {
  return volumes.find((v) => v.slug === slug);
}
