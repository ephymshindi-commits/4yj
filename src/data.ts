export interface VideoAsset {
  id: string;
  url: string;
  title: string;
  caption: string;
  duration?: string;
  tag: string;
}

export interface PhotoAsset {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: "Leadership" | "Joy" | "Elegance" | "Warmth";
  aspectRatio: "portrait" | "landscape" | "square";
}

export interface LoveNote {
  author: string;
  role: string;
  avatar: string;
  message: string[];
  signature: string;
  images?: string[];
}

// Host optimized media URLs using Cloudinary automatic format and quality transformations
// Format syntax for Cloudinary transform: inject 'f_auto,q_auto/' or 'f_auto,q_auto,w_800/' after '/upload/'
const transformUrl = (url: string, params: string = "f_auto,q_auto") => {
  if (!url) return "";
  return url.replace("/upload/", `/upload/${params}/`);
};

export const VIDEOS: VideoAsset[] = [
  {
    id: "v1",
    url: transformUrl("https://res.cloudinary.com/dnaw2g9c0/video/upload/v1782121277/VID-20260616-WA0021_crmmbz.mp4", "f_auto,q_auto"),
    title: "Radiant Spirit",
    caption: "A glimpse of the boundless energy and warmth you bring to every room.",
    duration: "0:12",
    tag: "Moments"
  },
  {
    id: "v2",
    url: transformUrl("https://res.cloudinary.com/dnaw2g9c0/video/upload/v1782121271/VID-20260531-WA0038_ghai0v.mp4", "f_auto,q_auto"),
    title: "The Heart of MshindiSecure",
    caption: "In action, demonstrating unmatched poise, brilliance, and management.",
    duration: "0:15",
    tag: "Leadership"
  },
  {
    id: "v3",
    url: transformUrl("https://res.cloudinary.com/dnaw2g9c0/video/upload/v1782121270/VID-20260531-WA0039_qhdeun.mp4", "f_auto,q_auto"),
    title: "Elegant Demeanor",
    caption: "The elegant charm that turns trivial challenges into smooth milestones.",
    duration: "0:10",
    tag: "Grace"
  },
  {
    id: "v4",
    url: transformUrl("https://res.cloudinary.com/dnaw2g9c0/video/upload/v1782121267/VID-20260531-WA0037_locvx8.mp4", "f_auto,q_auto"),
    title: "Pure Celebration",
    caption: "Capturing a beautiful perspective, filled with laughter and authentic connection.",
    duration: "0:14",
    tag: "Laughter"
  }
];

export const PHOTOS: PhotoAsset[] = [
  {
    id: "p1",
    url: transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1782121262/IMG-20260622-WA0012_y3fwhf.jpg", "f_auto,q_auto,w_800"),
    title: "A Vision of Poise",
    caption: "A striking portrait capturing the elegance, professional grace, and sheer brilliance of our manager.",
    category: "Leadership",
    aspectRatio: "portrait"
  },
  {
    id: "p2",
    url: transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1782121261/IMG-20260622-WA0001_wr9lv8.jpg", "f_auto,q_auto,w_800"),
    title: "Infinite Joy",
    caption: "That signature smile that instantly lifts up the entire MshindiSecure workspace.",
    category: "Joy",
    aspectRatio: "portrait"
  },
  {
    id: "p3",
    url: transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1782121260/IMG-20260622-WA0005_hj9a60.jpg", "f_auto,q_auto,w_800"),
    title: "Moments of Reflection",
    caption: "Elegant styling paired with a depth of mind that guides our startup securely every single day.",
    category: "Elegance",
    aspectRatio: "portrait"
  },
  {
    id: "p4",
    url: transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1782121260/IMG-20260622-WA0011_rz1r4l.jpg", "f_auto,q_auto,w_800"),
    title: "Grace Personified",
    caption: "Confidence, dignity and warmth — all rolled into one incredible person we are blessed to celebrate.",
    category: "Warmth",
    aspectRatio: "portrait"
  },
  {
    id: "p5",
    url: transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1782121256/IMG-20260622-WA0003_qsbhjb.jpg", "f_auto,q_auto,w_800"),
    title: "Focus and Finesse",
    caption: "Always leading by example, shaping an environment of support and mutual growth.",
    category: "Leadership",
    aspectRatio: "portrait"
  },
  {
    id: "p6",
    url: transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1782121253/IMG-20260612-WA0010_f2tjoy.jpg", "f_auto,q_auto,w_800"),
    title: "Radiating Charm",
    caption: "A beautiful candid moment that captures unmatched elegance and effortless style.",
    category: "Elegance",
    aspectRatio: "portrait"
  },
  {
    id: "p7",
    url: transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1782121252/IMG-20260613-WA0001_l6jtwx.jpg", "f_auto,q_auto,w_800"),
    title: "Cherished Memories",
    caption: "A captured breath of peace. Understated and timeless beauty.",
    category: "Warmth",
    aspectRatio: "landscape"
  }
];

export const LOVE_NOTES: LoveNote[] = [
  {
    author: "Ephy",
    role: "Founder, MshindiSecure",
    avatar: transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1781945283/1775643683527_1_n7ljm4.png", "f_auto,q_auto,w_300,c_fill,g_face"),
    images: [
      transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1781945283/1775643683527_1_n7ljm4.png", "f_auto,q_auto,w_600")
    ],
    message: [
      "To our exceptional manager, partner, and the brilliant anchor of MshindiSecure — 4YJ Angel.",
      "Building a startup is a path paved with uncertainty, challenges, and high stakes. Yet, your presence has been our ultimate security. Your poise, razor-sharp intelligence, and unwavering support keep our ship moving gracefully through every storm.",
      "You are not just a manager; you are our guiding angel. Your incredible work ethic and warm leadership set a standard that inspires me and everyone on the team daily. Thank you for your endless dedication, your wise guidance, and for bringing your radiant light into my life and our mission.",
      "May this upcoming birthday, December 11th, be the gateway to your most golden year yet. I promise to keep fighting by your side to make all our grand visions a reality.",
      "With deepest respect, admiration, and love."
    ],
    signature: "Yours, Ephy"
  },
  {
    author: "YJ",
    role: "Co-Strategist & Lifelong Companion",
    avatar: transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1782122176/IMG-20260622-WA0013_1_hzgboq.jpg", "f_auto,q_auto,w_300,c_fill,g_face"),
    images: [
      transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1782122176/IMG-20260622-WA0013_1_hzgboq.jpg", "f_auto,q_auto,w_600"),
      transformUrl("https://res.cloudinary.com/dnaw2g9c0/image/upload/v1782122224/IMG-20260622-WA0014_1_ymgg9v.jpg", "f_auto,q_auto,w_600")
    ],
    message: [
      "Dearest Angel,",
      "Celebrating you is the easiest, most rewarding thing in the world. You carry a unique warmth that makes spaces feel safe, and an intellectual sharpness that commands immediate admiration. I have watched you lead, encourage, and design progress with so much grace.",
      "These memories we share represent small anchors of a deeper bond. I love how you see the world, the focus you bring into managing our goals, and the laughter that always follows your footsteps.",
      "On your upcoming special milestone, I want to remind you of how deeply cherished you are. This world is a far more beautiful and organized place simply because you are at the helm.",
      "Happy early Birthday, dear Angel. Here's to making infinite more memories together!"
    ],
    signature: "Forever in your corner, YJ"
  }
];

export const BIRTHDAY_DATE = "2026-12-11T00:00:00";
