/**
 * Portfolio entries.
 *
 * IMPORTANT: Every entry below is a clearly-marked PLACEHOLDER. They are
 * structural slots, not real clients or projects. Replace them with real,
 * approved case studies (and set `placeholder: false`) before presenting
 * them as completed work. Never add a client name without permission.
 */

export type WorkItem = {
  id: string;
  placeholder: boolean;
  title: string;
  division: string; // division slug
  industry: string; // industry name
  summary: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  outcome: string;
  /**
   * Optional cover image. Put the file in /public/images/work/ and write its path
   * starting with "/images/…", e.g. "/images/work/acme-website.jpg".
   * (Placeholder items use illustrative Unsplash photos — replace them with real project images.)
   * Recommended: 1600×1200 px (4:3), JPG or WebP, under 500 KB.
   */
  image?: string;
  /** Short description of the image for screen readers and SEO. Required when `image` is set. */
  imageAlt?: string;
};

export const workItems: WorkItem[] = [
  {
    id: "sample-brand-identity",
    placeholder: true,
    title: "Brand identity project",
    division: "media-creative",
    industry: "Industry to be confirmed",
    summary: "Slot reserved for a brand identity and launch content case study.",
    challenge: "To be added: the client's starting point and business challenge.",
    approach: "To be added: research, concept routes and the final identity system.",
    deliverables: ["Logo suite", "Brand guidelines", "Launch creatives"],
    outcome: "To be added once results are confirmed and approved by the client.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Designer sketching brand concepts (illustrative stock photo)",
  },
  {
    id: "sample-performance-campaign",
    placeholder: true,
    title: "Lead generation campaign",
    division: "digital-marketing",
    industry: "Industry to be confirmed",
    summary: "Slot reserved for a Google / Meta Ads lead generation case study.",
    challenge: "To be added: the client's acquisition goals and constraints.",
    approach: "To be added: channel strategy, targeting and creative testing.",
    deliverables: ["Campaign structure", "Landing page", "Conversion tracking"],
    outcome: "To be added once results are confirmed and approved by the client.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Marketing analytics on a laptop (illustrative stock photo)",
  },
  {
    id: "sample-whatsapp-automation",
    placeholder: true,
    title: "WhatsApp & CRM automation",
    division: "ai-automation",
    industry: "Industry to be confirmed",
    summary: "Slot reserved for an enquiry automation and lead management case study.",
    challenge: "To be added: how leads were previously handled and what was being lost.",
    approach: "To be added: automation design, integrations and team handover.",
    deliverables: ["WhatsApp flows", "CRM integration", "Lead routing"],
    outcome: "To be added once results are confirmed and approved by the client.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Smartphone with messaging and social apps (illustrative stock photo)",
  },
  {
    id: "sample-corporate-website",
    placeholder: true,
    title: "Corporate website",
    division: "web-technology",
    industry: "Industry to be confirmed",
    summary: "Slot reserved for a corporate website design and development case study.",
    challenge: "To be added: the client's digital presence before the project.",
    approach: "To be added: structure, design system and technical build.",
    deliverables: ["UX & visual design", "Responsive build", "SEO foundations"],
    outcome: "To be added once results are confirmed and approved by the client.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Website code on a laptop screen (illustrative stock photo)",
  },
  {
    id: "sample-video-content",
    placeholder: true,
    title: "Video & reels production",
    division: "media-creative",
    industry: "Industry to be confirmed",
    summary: "Slot reserved for a video production and short-form content case study.",
    challenge: "To be added: the communication objective.",
    approach: "To be added: scripting, production and editing approach.",
    deliverables: ["Brand film", "Reels series", "Cut-downs for ads"],
    outcome: "To be added once results are confirmed and approved by the client.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Team reviewing a presentation (illustrative stock photo)",
  },
  {
    id: "sample-ai-chatbot",
    placeholder: true,
    title: "AI chatbot deployment",
    division: "ai-automation",
    industry: "Industry to be confirmed",
    summary: "Slot reserved for an AI chatbot or AI agent case study.",
    challenge: "To be added: the customer-response problem being solved.",
    approach: "To be added: knowledge design, integrations and safeguards.",
    deliverables: ["AI chatbot", "Knowledge base", "Hand-off to team"],
    outcome: "To be added once results are confirmed and approved by the client.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Abstract artificial intelligence visual (illustrative stock photo)",
  },
];
