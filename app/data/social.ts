import {
  BiLogoGithub,
  BiLogoLinkedinSquare,
} from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiLeetcode, SiWakatime } from "react-icons/si";
import { siteConfig } from "@/config/site";

export const socialLinks = [
  {
    id: 1,
    name: "GitHub",
    url: siteConfig.social.github,
    icon: BiLogoGithub,
    status: "social",
  },
  {
    id: 2,
    name: "LinkedIn",
    url: siteConfig.social.linkedin,
    icon: BiLogoLinkedinSquare,
    status: "social",
  },
  {
    id: 3,
    name: "X",
    url: siteConfig.social.x,
    icon: FaSquareXTwitter,
    status: "social",
  },
  {
    id: 4,
    name: "WakaTime",
    url: siteConfig.social.wakatime || "https://wakatime.com/@edmealem",
    icon: SiWakatime,
    status: "social",
  },
  {
    id: 5,
    name: "LeetCode",
    url: siteConfig.social.leetcode || "https://leetcode.com/edmealem_k/",
    icon: SiLeetcode,
    status: "social",
  },
];
