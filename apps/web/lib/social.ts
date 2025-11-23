export type SocialPlatform =
  | "linkedin"
  | "telegram"
  | "facebook"
  | "instagram"
  | "youtube"
  | "github";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
  name: string;
  description: string;
  color: string;
};

export const socialLinks: SocialLink[] = [
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/company/aleppo-dev-community",
    name: "LinkedIn",
    description: "تابع آخر أخبار المجتمع وفرص التواصل المهني.",
    color: "#0A66C2",
  },
  {
    platform: "telegram",
    url: "https://t.me/aleppo_dev_community",
    name: "Telegram",
    description: "انضم إلى قناتنا للنقاشات التقنية والإعلانات الهامة.",
    color: "#229ED9",
  },
  {
    platform: "facebook",
    url: "https://www.facebook.com/AleppoDevCommunity/",
    name: "Facebook",
    description: "تابع فعالياتنا وتواصل مع أعضاء المجتمع.",
    color: "#1877F3",
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/aleppo_dev_community",
    name: "Instagram",
    description: "شاهد مقتطفات ولقطات من فعالياتنا التقنية.",
    color: "#E1306C",
  },
  {
    platform: "youtube",
    url: "https://www.youtube.com/@aleppo_dev_community",
    name: "YouTube",
    description: "شاهد تسجيلات المحاضرات والفعاليات السابقة.",
    color: "#FF0000",
  },
  {
    platform: "github",
    url: "https://github.com/aleppo-dev-community",
    name: "GitHub",
    description: "ساهم في تطوير مشاريع المجتمع المفتوحة المصدر.",
    color: "#ffffff",
  },
];
