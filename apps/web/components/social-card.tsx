import type { SocialLink, SocialPlatform } from "@/lib/social";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";

const iconMap: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  linkedin: FaLinkedin,
  telegram: FaTelegram,
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  github: FaGithub,
};

export function SocialCard({ social }: { social: SocialLink }) {
  const Icon = iconMap[social.platform];

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#232323] hover:shadow-lg cursor-pointer"
    >
      <span className="text-4xl mb-4 transition-colors" style={{ color: social.color }}>
        <Icon className="group-hover:text-primary" />
      </span>
      <div className="text-xl font-semibold text-white mb-2">{social.name}</div>
      <div className="text-[#AFAFAF] text-[16px]">{social.description}</div>
    </a>
  );
}
