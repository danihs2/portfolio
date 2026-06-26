export type PortfolioProject = {
  slug: string;
  title: string;
  period: string;
  category: string;
  summary: string;
  description: string;
  stack: string[];
  outcomes: string[];
  liveUrl?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "norcaltreeconnect",
    title: "NorCalTreeConnect",
    period: "Jan 2026 - Feb 2026",
    category: "Marketplace Platform",
    summary:
      "SEO-first marketplace platform connecting homeowners with tree-service professionals across Northern California.",
    description:
      "Built a production-ready marketplace with Next.js, Supabase, and Node.js to support service discovery, lead generation, and scalable user flows. The implementation prioritized server-side rendering, structured data, technical SEO, and performance optimization so the platform could rank well organically while staying fast under real traffic.",
    stack: ["Next.js", "Supabase", "Node.js", "SSR", "Technical SEO"],
    outcomes: [
      "Designed scalable listing and user-management architecture.",
      "Implemented lead-generation flows optimized for organic acquisition.",
      "Improved search visibility through structured data and performance work.",
    ],
    liveUrl: "https://www.norcaltreeconnect.com/",
  },
  {
    slug: "iave-capufe",
    title: "IAVE - CAPUFE",
    period: "Jan 2026",
    category: "Enterprise Integration",
    summary:
      "Enterprise application delivery for IAVE workflows with payment integration and webhook orchestration.",
    description:
      "Developed application features for IAVE-related workflows and integrated payment processing with Scotiabank webhook handling. The work focused on reliable transaction flows, external service coordination, and backend behavior that could operate safely in a production environment.",
    stack: ["PHP", "REST APIs", "Webhooks", "Payments", "Enterprise Systems"],
    outcomes: [
      "Integrated payment events with webhook-driven backend logic.",
      "Improved reliability of external transaction processing.",
      "Supported production-facing enterprise workflows under operational constraints.",
    ],
  },
  {
    slug: "vrm-supplier-portal",
    title: "Portal de Proveedores VRM",
    period: "2026",
    category: "B2B Portal",
    summary:
      "Supplier portal enhancements focused on operational features, CI/CD, and delivery quality.",
    description:
      "Implemented key product capabilities for the VRM supplier portal and supported release workflows with CI/CD practices. The work combined business feature delivery with deployment discipline so updates could move faster without sacrificing stability.",
    stack: ["Next.js", "CI/CD", "Product Delivery", "B2B Workflows"],
    outcomes: [
      "Delivered high-priority portal features tied to business operations.",
      "Improved release consistency through CI/CD practices.",
      "Reduced friction between implementation and deployment cycles.",
    ],
    liveUrl: "https://pcb.vrm-bi.com/",
  },
  {
    slug: "efecto-web",
    title: "Efecto Web",
    period: "2026",
    category: "Reservation Platform",
    summary:
      "Full-stack reservation platform for Billar Efecto with admin workflows for booking management.",
    description:
      "Built an online reservation experience that allows customers to book quickly while giving administrators full control to confirm, reject, or reschedule requests. The platform used Next.js on the frontend and Django on the backend to balance responsiveness, maintainability, and operational control.",
    stack: ["Next.js", "Django", "Reservations", "Admin Workflows"],
    outcomes: [
      "Streamlined online reservations for end users.",
      "Enabled admin-side confirmation and rescheduling workflows.",
      "Delivered a practical full-stack product for day-to-day business operations.",
    ],
    liveUrl: "https://billarefecto.com/",
  },
  {
    slug: "menuflow-pos-analytics",
    title: "POS & Data Analytics System",
    period: "2026",
    category: "Operations Software",
    summary:
      "Restaurant-oriented POS and analytics platform with role management and VPS deployment.",
    description:
      "Developed a point-of-sale system for restaurants and small businesses with accessible business analytics, role-based access, and production deployment on a Linux VPS. The product emphasized practical reporting for owners alongside operational workflows for staff.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Linux VPS", "Role Management"],
    outcomes: [
      "Centralized sales and operations in one product workflow.",
      "Added business-friendly analytics for non-technical owners.",
      "Deployed and maintained the platform on VPS infrastructure.",
    ],
    liveUrl: "http://dev-menuflow.dani-flow.com/",
  },
  {
    slug: "portfolio-platform",
    title: "Portfolio Platform",
    period: "Ongoing",
    category: "Personal Platform",
    summary:
      "This portfolio as a full-stack showcase of product presentation, content administration, and deployment workflows.",
    description:
      "Evolving this portfolio into a production-ready platform that combines frontend presentation, admin-managed blog content, contact lead capture, database-backed workflows, and deployment automation. It serves as both a professional presence and a living reference of how I structure real delivery work.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Admin CMS", "SMTP"],
    outcomes: [
      "Demonstrates end-to-end frontend and backend execution.",
      "Includes protected admin workflows and database-backed forms.",
      "Acts as a maintainable platform rather than a static profile site.",
    ],
  },
];
