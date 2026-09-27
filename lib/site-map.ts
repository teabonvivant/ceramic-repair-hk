export type RoutePage = {
  slug: string;
  href: string;
  label: string;
  title: string;
  kicker: string;
  description: string;
  legacyFile: string;
};

export const SITE_URL = "https://ceramic-repair-hk.teabonvivant.chatgpt.site";

export const routePages: RoutePage[] = [
  {
    slug: "methods",
    href: "/methods",
    label: "修補方法",
    title: "修補的方法，與選擇的理由",
    kicker: "方法查閱",
    description: "把可再處理的黏合、補缺、金繼、鋦釘與「暫時不處理」並列比較，逐項說明食品接觸、承重、受熱與古董風險。",
    legacyFile: "methods.html"
  },
  {
    slug: "materials",
    href: "/materials",
    label: "材料",
    title: "材料無萬用配方，只有合不合適",
    kicker: "材料判斷",
    description: "由 B-72、環氧樹脂、天然漆至填補材料，逐一查看相容性、可再處理性、老化情況與安全限制。",
    legacyFile: "materials.html"
  },
  {
    slug: "tools",
    href: "/tools",
    label: "工具",
    title: "從觀察到交付，一張有秩序的工作台",
    kicker: "工作台",
    description: "整理清潔、固定、記錄與展示所需的工具，分清哪些可先準備，哪些應交由專業修復人員使用。",
    legacyFile: "tools.html"
  },
  {
    slug: "ethics",
    href: "/ethics",
    label: "倫理",
    title: "補得好，也要交代得清楚",
    kicker: "修復倫理",
    description: "說清楚可再處理、最少介入、標示、來源與誠實披露，避免把展示修護誤說成日用器修補。",
    legacyFile: "ethics.html"
  },
  {
    slug: "history",
    href: "/history",
    label: "歷史",
    title: "裂痕之中，也藏着工藝與年代",
    kicker: "脈絡",
    description: "從時間線、故事與工藝轉折理解瓷器修補，不把金繼、鋦釘與博物館修護混作一回事。",
    legacyFile: "history.html"
  },
  {
    slug: "masters",
    href: "/masters",
    label: "人物",
    title: "修復師、研究者與工藝創作者",
    kicker: "專家與來源",
    description: "閱讀修復研究、博物館實務與漆藝創作中的人物，認識各自的工作方向與代表資料。",
    legacyFile: "masters.html"
  },
  {
    slug: "world",
    href: "/world",
    label: "各地修護",
    title: "不同地方，修補有不同講法",
    kicker: "地域",
    description: "按國家與地區整理陶瓷修補資料，再連回方法、材料與人物，讓比較不只停留在外觀。",
    legacyFile: "world.html"
  },
  {
    slug: "verification",
    href: "/verification",
    label: "參考資料",
    title: "從館藏與文獻，繼續閱讀",
    kicker: "資料可信度",
    description: "整理博物館館藏、文物保存指南與材料研究，按主題連結至原始資料。",
    legacyFile: "verification.html"
  }
];

export const extraPages: RoutePage[] = [
  {slug:"start",href:"/start",label:"入門指南",title:"由一件器物開始",description:"觀察、記錄、保存與選擇修補方案的閱讀路線。",kicker:"",legacyFile:""},
  {slug:"care",href:"/care",label:"保存護理",title:"讓器物安穩地留下來",description:"清潔、搬運、收納與展示的日常方法。",kicker:"",legacyFile:""},
  {slug:"processes",href:"/processes",label:"修護流程",title:"從接收到交付",description:"十二個工作環節，串起記錄、評估、處理與照護。",kicker:"",legacyFile:""},
  {slug:"blog",href:"/blog",label:"器物誌",title:"器物誌",description:"在工藝與日常之間，細讀瓷器的裂痕、材料與記憶。",kicker:"",legacyFile:""},
  {slug:"glossary",href:"/glossary",label:"術語索引",title:"把修護的語言讀清楚",description:"常用材料、工藝與保存術語的簡明解釋。",kicker:"",legacyFile:""},
  {slug:"about",href:"/about",label:"關於知識庫",title:"在器物與知識之間",description:"瓷器修補知識庫的內容方向與閱讀方法。",kicker:"",legacyFile:""}
];
export const allRoutePages = [...routePages, ...extraPages];
export const primaryNavigation = [extraPages[0], routePages[0], routePages[1], extraPages[1], extraPages[3]];

export function familyName(family: string) {
  const names: Record<string, string> = {
    method: "方法",
    material: "材料",
    tool: "工具",
    process: "流程",
    reason: "修補原因",
    case: "器物專題",
    story: "修護閱讀",
    timeline: "時間線",
    country: "地域",
    master: "人物", blog: "器物誌"
  };
  return names[family] ?? "詳情";
}
