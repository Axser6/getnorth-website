export type Service = {
  name: string;
  description: string;
};

export type Division = {
  slug: string;
  number: string;
  /** Cardinal point used in the compass motif. */
  point: "N" | "E" | "S" | "W";
  pillar: "Media" | "Marketing" | "Technology" | "AI";
  name: string;
  short: string;
  summary: string;
  intro: string;
  services: Service[];
  deliverables: string[];
  benefits: { title: string; body: string }[];
};

export const divisions: Division[] = [
  {
    slug: "media-creative",
    number: "01",
    point: "N",
    pillar: "Media",
    name: "Media & Creative Solutions",
    short: "Media & Creative",
    summary:
      "Brand identity, content and video that make your business recognisable and worth paying attention to.",
    intro:
      "Customers judge a business long before they speak to it. Our creative team builds the visual identity, content and video that shape that first impression — consistently, across every channel where your audience meets you.",
    services: [
      {
        name: "Brand identity & graphic design",
        description:
          "Logos, colour systems, typography and brand guidelines that give your business a distinct, consistent look — plus the everyday collateral built from it.",
      },
      {
        name: "Social media content creation",
        description:
          "Platform-native posts, carousels and stories designed around your brand and your audience, produced on a reliable calendar.",
      },
      {
        name: "Video production & editing",
        description:
          "Corporate films, product videos, explainers and testimonials — scripted, shot and edited to communicate clearly and professionally.",
      },
      {
        name: "Reels & short-form video",
        description:
          "Vertical, attention-first video for Instagram Reels, YouTube Shorts and similar formats, built to hold viewers in the first seconds.",
      },
      {
        name: "Creative campaigns",
        description:
          "Campaign concepts for launches, offers and seasonal moments, carried consistently across design, video and copy.",
      },
      {
        name: "Content strategy",
        description:
          "Content pillars, formats, tone of voice and publishing plans tied to what your business actually needs to achieve.",
      },
    ],
    deliverables: [
      "Logo suite and brand guidelines",
      "Monthly social media content calendar",
      "Designed posts, carousels and stories",
      "Edited corporate and product videos",
      "Reels and short-form video packs",
      "Campaign creative kits",
      "Content strategy document",
    ],
    benefits: [
      {
        title: "Instant credibility",
        body: "A professional, consistent identity signals that you are an established business worth trusting.",
      },
      {
        title: "Recognition that compounds",
        body: "Consistent visuals and messaging make every piece of content reinforce the last.",
      },
      {
        title: "Content that earns attention",
        body: "Creative built for each platform's behaviour, not resized from one master file.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    number: "02",
    point: "E",
    pillar: "Marketing",
    name: "Digital Marketing Solutions",
    short: "Digital Marketing",
    summary:
      "Search, social and paid media planned around one outcome — more qualified customers for your business.",
    intro:
      "Visibility only matters when it turns into enquiries. We plan, run and optimise your organic and paid channels with a clear focus on leads, cost per acquisition and measurable return.",
    services: [
      {
        name: "Social media management",
        description:
          "End-to-end management of your business profiles — planning, publishing, community responses and monthly performance reviews.",
      },
      {
        name: "Search engine optimisation (SEO)",
        description:
          "Technical SEO, on-page optimisation, local SEO and content that help customers find you when they search for what you offer.",
      },
      {
        name: "Google Ads",
        description:
          "Search, Performance Max, Display and YouTube campaigns structured around high-intent keywords and conversion tracking.",
      },
      {
        name: "Meta Ads",
        description:
          "Facebook and Instagram campaigns with audience strategy, creative testing and lead-form or website conversion objectives.",
      },
      {
        name: "Performance marketing",
        description:
          "Budget allocation, funnel design and continuous optimisation across channels, judged on cost per lead and return on ad spend.",
      },
      {
        name: "Lead generation",
        description:
          "Campaigns, landing pages and lead capture systems designed to bring in enquiries your sales team can act on.",
      },
      {
        name: "Digital marketing strategy",
        description:
          "Channel selection, positioning, budgets and a practical roadmap based on your market, competitors and goals.",
      },
    ],
    deliverables: [
      "Digital marketing strategy and channel plan",
      "Managed social media profiles",
      "SEO audit and optimisation roadmap",
      "Google Ads and Meta Ads campaigns",
      "Conversion tracking setup",
      "Lead generation landing pages",
      "Monthly performance reports",
    ],
    benefits: [
      {
        title: "Spend with accountability",
        body: "Every campaign is tracked to leads and cost, so budget decisions are based on evidence.",
      },
      {
        title: "Found at the right moment",
        body: "Search and local visibility put you in front of customers who are already looking.",
      },
      {
        title: "A steady enquiry pipeline",
        body: "Always-on campaigns and lead capture reduce dependence on referrals alone.",
      },
    ],
  },
  {
    slug: "ai-automation",
    number: "03",
    point: "S",
    pillar: "AI",
    name: "AI & Business Automation Solutions",
    short: "AI & Automation",
    summary:
      "AI agents, chatbots and automated workflows that respond faster, reduce manual work and keep leads from slipping away.",
    intro:
      "Many businesses lose time and customers to repetitive, manual work — copying data, chasing follow-ups, answering the same questions. We design practical AI and automation systems that handle this work reliably, so your team can focus on decisions and relationships.",
    services: [
      {
        name: "Custom AI agents",
        description:
          "AI agents trained on your business information that can answer questions, qualify enquiries and complete defined tasks.",
      },
      {
        name: "AI-powered chatbots",
        description:
          "Website and messaging chatbots that respond instantly, capture lead details and hand over to your team when needed.",
      },
      {
        name: "Business process automation",
        description:
          "Mapping and automating repetitive processes such as data entry, approvals, document generation and notifications.",
      },
      {
        name: "WhatsApp automation",
        description:
          "Automated replies, enquiry flows, reminders and notifications using the official WhatsApp Business Platform.",
      },
      {
        name: "CRM automation",
        description:
          "Automatic lead capture, assignment, status updates and follow-up tasks inside the CRM your team uses.",
      },
      {
        name: "Lead management automation",
        description:
          "Capture leads from ads, forms and messages into one place, route them instantly and trigger timely follow-ups.",
      },
      {
        name: "Workflow automation",
        description:
          "Connecting the tools you already use — forms, sheets, email, CRM, messaging — so information moves without manual effort.",
      },
      {
        name: "AI integration & consulting",
        description:
          "Identifying where AI genuinely adds value in your operations, then planning and implementing it responsibly.",
      },
    ],
    deliverables: [
      "Process audit and automation opportunity map",
      "Custom AI agent or chatbot",
      "WhatsApp Business automation flows",
      "CRM and lead routing automations",
      "Integrated workflows between business tools",
      "Team handover, documentation and training",
      "Ongoing monitoring and improvement",
    ],
    benefits: [
      {
        title: "Faster response, every time",
        body: "Enquiries receive an immediate, accurate reply — including outside office hours.",
      },
      {
        title: "Less manual work",
        body: "Repetitive tasks run automatically, freeing your team for higher-value work.",
      },
      {
        title: "No lead left behind",
        body: "Automatic capture and follow-up mean enquiries are tracked from first message to close.",
      },
    ],
  },
  {
    slug: "web-technology",
    number: "04",
    point: "W",
    pillar: "Technology",
    name: "Web & Technology Solutions",
    short: "Web & Technology",
    summary:
      "Fast, secure websites and web platforms that present your business professionally and convert visitors into enquiries.",
    intro:
      "Your website is often the first serious conversation a customer has with your business. We design and build websites, e-commerce stores and custom web applications that are fast, easy to manage and built around conversion.",
    services: [
      {
        name: "Corporate website development",
        description:
          "Multi-page corporate websites that communicate your capabilities, build trust and support business development.",
      },
      {
        name: "Business websites",
        description:
          "Professional websites for growing businesses — clear service pages, enquiry forms and local search foundations.",
      },
      {
        name: "Landing pages",
        description:
          "Focused, fast-loading pages for campaigns and offers, designed and tested for conversion.",
      },
      {
        name: "E-commerce websites",
        description:
          "Online stores with product catalogues, secure payments, order management and a smooth checkout.",
      },
      {
        name: "Web applications",
        description:
          "Custom web applications for bookings, portals, internal tools and customer-facing services.",
      },
      {
        name: "Custom digital platforms",
        description:
          "Bespoke platforms built around your specific business model, users and workflows.",
      },
      {
        name: "Business dashboards",
        description:
          "Dashboards that bring sales, marketing and operations data together so decisions are based on current numbers.",
      },
      {
        name: "Website maintenance",
        description:
          "Updates, security, backups, performance monitoring and content changes so your site stays reliable.",
      },
    ],
    deliverables: [
      "UX structure and visual design",
      "Responsive website or web application",
      "SEO-ready page structure and metadata",
      "Enquiry, WhatsApp and call integrations",
      "Analytics and conversion tracking",
      "Content management handover",
      "Maintenance and support plan",
    ],
    benefits: [
      {
        title: "A credible first impression",
        body: "A modern, fast website shows customers they are dealing with a professional organisation.",
      },
      {
        title: "Built to convert",
        body: "Clear structure and well-placed calls to action turn visitors into enquiries.",
      },
      {
        title: "Ready to scale",
        body: "Solid technical foundations make it easy to add pages, products and features over time.",
      },
    ],
  },
];

export function getDivision(slug: string) {
  return divisions.find((d) => d.slug === slug);
}
