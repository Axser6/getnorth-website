export type Industry = {
  slug: string;
  name: string;
  short: string;
  challenge: string;
  approach: string[];
  /** Division slugs most relevant to this industry. */
  focus: string[];
};

export const industries: Industry[] = [
  {
    slug: "real-estate-construction",
    name: "Real Estate & Construction",
    short: "Project launches, site-visit bookings and lead follow-up for developers, builders and brokers.",
    challenge:
      "Property purchases involve long decision cycles and high enquiry volumes from multiple portals and ads. Leads go cold when follow-up is slow, and every project launch needs strong visual communication.",
    approach: [
      "Project branding, walkthrough videos and launch campaigns",
      "Google and Meta lead campaigns targeted by location and buyer intent",
      "Project microsites and landing pages with site-visit booking",
      "WhatsApp and CRM automation for instant lead response and follow-up",
    ],
    focus: ["media-creative", "digital-marketing", "ai-automation", "web-technology"],
  },
  {
    slug: "manufacturing-industrial",
    name: "Manufacturing & Industrial",
    short: "Credible digital presence and B2B lead generation for manufacturers and industrial suppliers.",
    challenge:
      "Industrial buyers research suppliers online before making contact, yet many manufacturers are represented by outdated websites and brochures that undersell their capabilities.",
    approach: [
      "Corporate websites and product catalogues that communicate capability",
      "Factory, process and product videos for sales and trade use",
      "B2B search and LinkedIn-focused visibility",
      "Automated enquiry capture, quotation requests and dealer communication",
    ],
    focus: ["web-technology", "media-creative", "digital-marketing", "ai-automation"],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    short: "Online stores, performance campaigns and automated customer communication for retail brands.",
    challenge:
      "Retail brands compete for attention on crowded feeds and marketplaces. Margins depend on efficient ad spend, a smooth buying experience and repeat customers.",
    approach: [
      "E-commerce websites with fast, simple checkout",
      "Product photography direction, reels and social content",
      "Meta and Google shopping and conversion campaigns",
      "WhatsApp order updates, abandoned-cart and repeat-purchase automation",
    ],
    focus: ["web-technology", "digital-marketing", "media-creative", "ai-automation"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    short: "Patient-friendly websites, appointment journeys and trustworthy communication for clinics and hospitals.",
    challenge:
      "Patients choose providers based on trust, accessibility and convenience. Clinics need clear information online and an easy way to book, without overloading front-desk staff.",
    approach: [
      "Clear, accessible websites with service and specialist information",
      "Local SEO so patients find you in nearby searches",
      "Appointment enquiry and reminder automation via WhatsApp",
      "Responsible, compliant educational content",
    ],
    focus: ["web-technology", "digital-marketing", "ai-automation", "media-creative"],
  },
  {
    slug: "education",
    name: "Education",
    short: "Admissions campaigns, enquiry management and digital presence for schools, colleges and training institutes.",
    challenge:
      "Admissions are seasonal and competitive. Institutions receive large volumes of enquiries in short windows and need to respond to parents and students quickly and consistently.",
    approach: [
      "Admissions campaigns across search and social media",
      "Institution websites and course landing pages",
      "Campus, faculty and student-life video content",
      "Chatbots and WhatsApp flows for admission queries and counselling follow-up",
    ],
    focus: ["digital-marketing", "ai-automation", "web-technology", "media-creative"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    short: "Visual storytelling, direct bookings and guest communication for hotels, resorts and restaurants.",
    challenge:
      "Hospitality is chosen visually and booked conveniently. Over-reliance on third-party platforms reduces margins, and guests expect quick answers before they commit.",
    approach: [
      "Photography direction, reels and experience-led video",
      "Websites built to encourage direct bookings and reservations",
      "Local search and social visibility",
      "Automated booking enquiries, confirmations and guest messaging",
    ],
    focus: ["media-creative", "web-technology", "digital-marketing", "ai-automation"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    short: "Authority-building brands and steady enquiry flow for consultants, firms and agencies.",
    challenge:
      "Professional services are sold on expertise and trust. Firms need to demonstrate credibility online and manage consultations efficiently without adding administrative load.",
    approach: [
      "Brand identity and corporate websites that reflect expertise",
      "Thought-leadership content and LinkedIn presence",
      "Search visibility for high-intent service queries",
      "Consultation booking, intake and CRM automation",
    ],
    focus: ["media-creative", "web-technology", "digital-marketing", "ai-automation"],
  },
  {
    slug: "startups-smes",
    name: "Startups & SMEs",
    short: "One partner for brand, website, marketing and automation as your business grows.",
    challenge:
      "Growing businesses need professional brand, digital and operational foundations, but rarely have the budget or time to coordinate several separate vendors.",
    approach: [
      "Brand identity and launch-ready websites",
      "Lean, measurable marketing programmes",
      "Practical automation that saves founder and team time",
      "A single, coordinated in-house team across all four disciplines",
    ],
    focus: ["media-creative", "web-technology", "digital-marketing", "ai-automation"],
  },
];
