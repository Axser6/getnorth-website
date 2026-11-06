export type AiSolution = {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  capabilities: string[];
};

export const aiSolutions: AiSolution[] = [
  {
    id: "ai-agents",
    name: "AI Agents",
    tagline: "Digital team members for defined tasks.",
    problem:
      "Your team spends hours answering the same questions, looking up information and moving data between systems.",
    solution:
      "A custom AI agent trained on your business knowledge that can answer, qualify, look up and act — within boundaries you define, with a human always able to step in.",
    capabilities: [
      "Trained on your services, pricing rules, FAQs and documents",
      "Qualifies enquiries and collects the right details",
      "Connects to your CRM, sheets and calendars to complete tasks",
      "Escalates to a team member when confidence is low",
    ],
  },
  {
    id: "business-automation",
    name: "Business Automation",
    tagline: "Repetitive work, handled automatically.",
    problem:
      "Manual data entry, copy-paste reporting and follow-up reminders slow your team down and introduce errors.",
    solution:
      "We map your current process, remove unnecessary steps and automate the rest — so routine work happens reliably in the background.",
    capabilities: [
      "Automatic data capture from forms, emails and ads",
      "Document, quotation and invoice generation",
      "Approval flows and internal notifications",
      "Scheduled reports delivered to the right people",
    ],
  },
  {
    id: "ai-chatbots",
    name: "AI Chatbots",
    tagline: "Instant, accurate answers on your website.",
    problem:
      "Website visitors leave when they cannot find an answer quickly, and enquiries arriving after hours wait until the next day.",
    solution:
      "An AI-powered chatbot that understands natural questions, answers from your approved information and captures lead details for your team.",
    capabilities: [
      "Natural-language answers from your approved content",
      "Lead capture with name, requirement and contact details",
      "Hand-off to WhatsApp, phone or a team member",
      "Conversation logs that reveal what customers ask most",
    ],
  },
  {
    id: "whatsapp-automation",
    name: "WhatsApp Automation",
    tagline: "Where your customers already are.",
    problem:
      "Customers prefer WhatsApp, but manually replying, sending reminders and updating customers does not scale.",
    solution:
      "Automated WhatsApp journeys on the official WhatsApp Business Platform — from first enquiry to booking confirmation and follow-up.",
    capabilities: [
      "Instant replies and guided enquiry menus",
      "Appointment, payment and renewal reminders",
      "Order and status notifications",
      "Seamless handover to a live team member",
    ],
  },
  {
    id: "crm-automation",
    name: "CRM Automation",
    tagline: "Every lead captured, routed and followed up.",
    problem:
      "Leads arrive from ads, forms, calls and messages. Some are never logged, others are followed up too late.",
    solution:
      "We connect every lead source to your CRM, assign leads automatically and trigger follow-ups so nothing depends on memory.",
    capabilities: [
      "Lead capture from Meta, Google, website and WhatsApp",
      "Automatic assignment and status updates",
      "Follow-up tasks, reminders and nurture sequences",
      "Pipeline visibility for owners and managers",
    ],
  },
  {
    id: "custom-integrations",
    name: "Custom AI Integrations",
    tagline: "AI built into the tools you already use.",
    problem:
      "Off-the-shelf AI tools rarely fit your exact processes, data or customer experience.",
    solution:
      "We integrate AI capabilities — summarisation, classification, extraction, generation and search — directly into your website, apps and internal systems.",
    capabilities: [
      "Document reading and data extraction",
      "Automatic classification and tagging of enquiries",
      "Knowledge search across internal documents",
      "AI features inside your existing platforms",
    ],
  },
];

export const aiProblems = [
  {
    problem: "Enquiries wait hours for a reply",
    answer: "AI chatbots and WhatsApp automation respond instantly, around the clock.",
  },
  {
    problem: "Leads are scattered across platforms",
    answer: "CRM automation brings every lead source into one pipeline automatically.",
  },
  {
    problem: "Follow-ups depend on someone remembering",
    answer: "Automated reminders and sequences follow up on schedule, every time.",
  },
  {
    problem: "Staff time goes into repetitive admin",
    answer: "Process automation handles data entry, documents and notifications.",
  },
  {
    problem: "The same questions are answered daily",
    answer: "An AI agent answers routine questions from your approved knowledge.",
  },
  {
    problem: "Decisions are made without current data",
    answer: "Automated reporting and dashboards keep numbers up to date.",
  },
];

export const aiProcess = [
  {
    step: "Discover",
    body: "We study how work currently flows, where time is lost and where customers wait.",
  },
  {
    step: "Design",
    body: "We define the automation or AI solution, its boundaries and how people stay in control.",
  },
  {
    step: "Build & integrate",
    body: "We build, connect it with your existing tools and test it against real scenarios.",
  },
  {
    step: "Launch & train",
    body: "We roll out in stages, train your team and document how everything works.",
  },
  {
    step: "Monitor & improve",
    body: "We review performance and refine the system as your business changes.",
  },
];

export const aiPrinciples = [
  {
    title: "Human in control",
    body: "Clear escalation paths so people make the important decisions.",
  },
  {
    title: "Your data, protected",
    body: "Access is limited to what each system needs, using reputable, secure platforms.",
  },
  {
    title: "Practical, not hype",
    body: "We recommend AI only where it solves a real problem better than the alternative.",
  },
  {
    title: "Transparent to customers",
    body: "Automated conversations are designed to be clear, honest and helpful.",
  },
];
