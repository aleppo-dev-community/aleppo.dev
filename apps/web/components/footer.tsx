import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="mt-6 py-12 text-[#AFAFAF] text-center text-[17.3px] border-t border-[#232323]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4">
        <div className="mb-4 md:mb-0">
          <div className="font-bold text-white text-xl mb-2">مجتمع مطوري حلب</div>
          <div className="text-[#AFAFAF] text-sm">
            © {new Date().getFullYear()} جميع الحقوق محفوظة.
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <a href="mailto:contact@aleppo.dev" className="hover:text-primary transition-colors">
            contact@aleppo.dev
          </a>
        </div>
        <div className="flex gap-4 items-center mt-4 md:mt-0">
          <a
            href="https://github.com/aleppo-dev-community/aleppo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com/company/aleppo-dev-community"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href="https://t.me/aleppo_dev_community"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaTelegram className="text-2xl" />
          </a>
          <a
            href="https://www.facebook.com/AleppoDevCommunity/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaFacebook className="text-2xl" />
          </a>
          <a
            href="https://www.instagram.com/aleppo_dev_community"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}
