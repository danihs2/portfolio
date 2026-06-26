"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { HeroFloatingBadges } from "@/components/portfolio/hero-floating-badges";
import { HyperNameReveal } from "@/components/portfolio/hyper-name-reveal";
import { StatsMarquee } from "@/components/portfolio/stats-marquee";
import { BentoCard, BentoGrid } from "@/components/retroui/Bento";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Github, Linkedin, Mail } from "@/components/retroui/icons";
import { links } from "@/lib/link-items";
import type { GitHubOverviewPayload, HackatimePayload } from "@/lib/portfolio-types";
import { githubUrl, hackatimeUrl, linkedinUrl, siteHost } from "@/lib/site-config";

const GithubOverviewBento = dynamic(
  () =>
    import("@/components/portfolio/github-overview-bento").then(
      (m) => m.GithubOverviewBento,
    ),
  { ssr: false },
);

const HackatimeBento = dynamic(
  () =>
    import("@/components/portfolio/hackatime-bento").then(
      (m) => m.HackatimeBento,
    ),
  { ssr: false },
);

const ProjectsGrid = dynamic(
  () =>
    import("@/components/portfolio/projects-grid").then((m) => m.ProjectsGrid),
  { ssr: false },
);

const RetroTerminalSection = dynamic(
  () =>
    import("@/components/portfolio/retro-terminal-section").then(
      (m) => m.RetroTerminalSection,
    ),
  { ssr: false },
);

const highlights = [
  {
    title: "Full-Stack Delivery",
    text: "I build production features end to end across frontend, backend, integrations, and deployment workflows.",
  },
  {
    title: "Business-Focused Engineering",
    text: "My work is shaped by reliability, maintainability, and practical outcomes instead of demo-driven complexity.",
  },
  {
    title: "Linux VPS Operations",
    text: "I handle SSH access, Nginx, SSL, DNS, release checks, and production deployments for real client systems.",
  },
  {
    title: "Integration Experience",
    text: "I work with REST APIs, webhooks, payment flows, Supabase, Firebase, and database-backed application logic.",
  },
] as const;

type HomeFaqItem = {
  question: string;
  answer: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const faqItems: HomeFaqItem[] = [
  {
    question: "What type of work do you take on?",
    answer:
      "I work on full-stack applications, API integrations, internal tools, reservation systems, lead-generation platforms, and production improvements for existing codebases.",
  },
  {
    question: "Do you handle infrastructure and deployment?",
    answer:
      "Yes. I regularly manage Linux VPS deployments, SSH access, Nginx configuration, SSL, domain setup, and production release checks.",
  },
  {
    question: "Can you work with an existing codebase?",
    answer:
      "Yes. I can audit, stabilize, extend, or refactor an existing system without forcing unnecessary rewrites.",
  },
  {
    question: "How can we start?",
    answer:
      "Send a clear project inquiry through the contact form or email me directly. I will respond with the next practical step.",
    ctaHref: "/contact",
    ctaLabel: "Open Contact",
  },
];

type HomePageClientProps = {
  initialHackatime?: HackatimePayload | null;
  initialGitHubOverview?: GitHubOverviewPayload | null;
};

export function HomePageClient({
  initialHackatime,
  initialGitHubOverview,
}: HomePageClientProps) {
  return (
    <div className="-mt-3 space-y-8 pb-16 sm:mt-0 sm:space-y-14">
      <StatsMarquee />

      <section
        className="relative overflow-visible border-4 border-black bg-card shadow-retro-lg"
        data-home-reveal
      >
        <div
          aria-hidden
          className="retro-stripes pointer-events-none absolute inset-0 opacity-20"
        />
        <div className="hidden sm:block">
          <HeroFloatingBadges />
        </div>

        <div className="relative z-10 overflow-hidden border-4 border-black bg-card">
          <div className="flex items-center justify-between border-b-4 border-black bg-[#d7d7d7] px-2 py-2 text-black sm:px-3 dark:bg-[#2f2f2f] dark:text-white">
            <p className="font-pixel text-[11px] font-black sm:text-xs">
              {siteHost}
            </p>
            <div className="flex gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center border-2 border-black bg-[#ffd146] text-[#5c3d00] text-[10px] font-black shadow-retro-sm sm:h-6 sm:w-6 sm:text-xs">
                -
              </span>
              <span className="inline-flex h-5 w-5 items-center justify-center border-2 border-black bg-[#52d46b] text-[#0d4f1a] text-[10px] font-black shadow-retro-sm sm:h-6 sm:w-6 sm:text-xs">
                +
              </span>
              <span className="inline-flex h-5 w-5 items-center justify-center border-2 border-black bg-[#ff6e6e] text-[#6b1010] text-[10px] font-black shadow-retro-sm sm:h-6 sm:w-6 sm:text-xs">
                x
              </span>
            </div>
          </div>

          <div className="grid gap-4 p-2 sm:gap-6 sm:p-5 md:grid-cols-[1.2fr_0.8fr] md:gap-8 md:p-10">
            <div className="order-2 space-y-4 md:order-1 md:space-y-6">
              <h1 className="font-display uppercase leading-[1.1]">
                <span className="block text-[clamp(0.95rem,6vw,2.5rem)] sm:text-[clamp(1.7rem,5.2vw,3.8rem)]">
                  Full-Stack Delivery By
                </span>
                <span className="mt-1 block text-[clamp(1.05rem,8vw,3rem)] sm:text-[clamp(1.8rem,5.6vw,4.4rem)]">
                  <span className="retro-curve-underline">
                    <HyperNameReveal text="Daniel Hachac Salas." />
                  </span>
                </span>
              </h1>
              <p className="max-w-2xl border-l-4 border-black pl-3 text-xs font-medium leading-relaxed sm:pl-4 sm:text-sm md:text-lg">
                I build maintainable applications, integrations, and VPS-backed
                deployments for businesses that need practical execution, not
                inflated promises.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="w-full border-4 border-black px-4 py-2 text-sm font-black uppercase tracking-wide shadow-retro retro-press sm:w-auto sm:px-6 sm:py-3 sm:text-base"
                >
                  <Link href="/contact">Contact Me</Link>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  asChild
                  className="w-full border-4 border-black px-4 py-2 text-sm font-black uppercase tracking-wide shadow-retro retro-press sm:w-auto sm:px-6 sm:py-3 sm:text-base"
                >
                  <Link href="/project">View Projects</Link>
                </Button>
              </div>
            </div>

            <div className="order-1 mx-auto w-full max-w-56 border-4 border-black bg-primary p-2 shadow-retro-md sm:max-w-xs sm:p-3 md:order-2 md:max-w-sm">
              <div className="border-4 border-black bg-card p-0">
                <Image
                  src="/myprofile2.png"
                  alt="Daniel Hachac Salas"
                  width={384}
                  height={384}
                  priority
                  className="block h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="retro-social-icon"
                  aria-label="GitHub profile"
                >
                  <Github className="h-4 w-4" />
                </Link>
                <Link
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="retro-social-icon"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
                <Link
                  href="mailto:danielhachac@gmail.com"
                  className="retro-social-icon"
                  aria-label="Email Daniel Hachac Salas"
                >
                  <Mail className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4" data-home-reveal>
        <h2 className="font-display text-3xl uppercase sm:text-4xl">
          Execution Snapshot
        </h2>
        <BentoGrid>
          <BentoCard className="min-h-48 h-full sm:col-span-1 lg:col-span-2">
            <p className="font-display text-xl uppercase sm:text-2xl">
              Product and Platform Delivery
            </p>
            <p className="mt-3 font-medium leading-relaxed">
              I build applications that balance user experience, maintainable
              architecture, and practical business operations.
            </p>
          </BentoCard>
          <BentoCard className="min-h-48 h-full sm:col-span-1 lg:col-span-2">
            <p className="font-display text-xl uppercase">
              APIs, Webhooks, and External Systems
            </p>
            <p className="mt-2 text-sm font-medium">
              I integrate payment flows, REST APIs, webhook processing, and
              third-party services into stable backend workflows.
            </p>
          </BentoCard>
          <BentoCard className="min-h-48 h-full sm:col-span-1 lg:col-span-2">
            <p className="font-display text-xl uppercase">
              Linux VPS Deployment Ownership
            </p>
            <p className="mt-2 text-sm font-medium">
              I manage deployment tasks such as SSH, Nginx, SSL, DNS, and
              release validation for production-ready delivery.
            </p>
          </BentoCard>
        </BentoGrid>
      </section>

      <section className="space-y-4" data-home-reveal>
        <h2 className="font-display text-3xl uppercase sm:text-4xl">
          Core Strengths
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {highlights.map((item) => (
            <Card
              key={item.title}
              className="w-full border-4 border-black bg-card shadow-retro-md retro-press"
            >
              <Card.Header>
                <Card.Title className="font-display text-2xl uppercase">
                  {item.title}
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="font-medium leading-relaxed">{item.text}</p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4" data-home-reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            Featured Projects
          </h2>
          <Button
            asChild
            variant="secondary"
            className="w-full border-4 border-black shadow-retro-sm sm:w-auto uppercase"
          >
            <Link href="/project">View All</Link>
          </Button>
        </div>
        <ProjectsGrid compact limit={3} />
      </section>

      <section className="space-y-4" data-home-reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            Blog
          </h2>
          <Button
            asChild
            variant="secondary"
            className="w-full border-4 border-black shadow-retro-sm sm:w-auto uppercase"
          >
            <Link href="/blog">Coming Soon</Link>
          </Button>
        </div>
        <Card className="border-4 border-black bg-card shadow-retro-md">
          <Card.Content className="space-y-3">
            <p className="font-display text-2xl uppercase">Editorial Queue</p>
            <p className="font-medium leading-relaxed">
              The public blog is intentionally paused while the new admin
              workflow is being prepared. The first entries will focus on real
              deployment, integration, and product-delivery notes.
            </p>
          </Card.Content>
        </Card>
      </section>

      <section className="space-y-4" data-home-reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            Github Stats
          </h2>
          <Button
            asChild
            variant="secondary"
            className="w-full border-4 border-black shadow-retro-sm sm:w-auto uppercase"
          >
            <Link href={githubUrl} target="_blank" rel="noreferrer noopener">
              View Full GitHub Profile
            </Link>
          </Button>
        </div>
        <p className="font-bold uppercase text-muted-foreground">
          Followers, repositories, language mix, and activity patterns from the
          public GitHub profile.
        </p>
        <GithubOverviewBento stats={initialGitHubOverview ?? null} />
      </section>

      <section className="space-y-4" data-home-reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            {process.env.NEXT_PUBLIC_CODING_STATS_PROVIDER === "hackatime"
              ? "Hackatime Insights"
              : "Wakatime Insights"}
          </h2>
          <Button
            asChild
            variant="secondary"
            className="w-full border-4 border-black shadow-retro-sm sm:w-auto uppercase"
          >
            <Link href={hackatimeUrl} target="_blank" rel="noreferrer noopener">
              View Coding Profile
            </Link>
          </Button>
        </div>
        <HackatimeBento stats={initialHackatime ?? null} />
      </section>

      <div data-home-reveal>
        <RetroTerminalSection />
      </div>

      <section className="space-y-4" data-home-reveal>
        <h2 className="font-display text-3xl uppercase sm:text-4xl">
          Connect Hub
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <Card
              key={item.name}
              className="flex h-full w-full flex-col border-4 border-black bg-card shadow-retro-md retro-press"
            >
              <Card.Header className="min-h-36 flex-1">
                <Card.Title className="font-display text-xl uppercase">
                  {item.name}
                </Card.Title>
                <Card.Description className="mt-2 text-base leading-relaxed">
                  {item.description}
                </Card.Description>
              </Card.Header>
              <Card.Content className="pt-0">
                <Button
                  asChild
                  className="w-full border-4 border-black shadow-retro-sm uppercase"
                >
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
                  >
                    Open Link
                  </Link>
                </Button>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <section
        className="border-4 border-black bg-primary p-6 shadow-retro-lg sm:p-8 md:p-10"
        data-home-reveal
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <h2 className="font-display text-3xl uppercase text-primary-foreground sm:text-4xl md:text-5xl">
              Let&apos;s Build
            </h2>
            <p className="max-w-xl text-sm font-medium leading-relaxed text-primary-foreground/90 sm:text-base">
              If you need help shipping a feature, integrating a backend, or
              getting a VPS deployment into production, send the project details
              and I will respond with the next practical step.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="w-full border-4 border-black bg-card px-6 py-3 font-black uppercase text-card-foreground shadow-retro retro-press sm:w-auto"
            >
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="w-full border-4 border-black px-6 py-3 font-black uppercase shadow-retro retro-press sm:w-auto"
            >
              <Link href={linkedinUrl} target="_blank" rel="noreferrer noopener">
                LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4" data-home-reveal>
        <h2 className="font-display text-3xl uppercase sm:text-4xl">FAQ</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <Card
              key={item.question}
              className="flex h-full w-full flex-col border-4 border-black bg-card shadow-retro-md retro-press"
            >
              <Card.Header>
                <Card.Title className="font-display text-xl uppercase">
                  {item.question}
                </Card.Title>
              </Card.Header>
              <Card.Content className="flex flex-1 flex-col gap-3">
                <p className="font-medium leading-relaxed">{item.answer}</p>
                {item.ctaHref && item.ctaLabel ? (
                  <Button
                    asChild
                    className="mt-auto w-full border-4 border-black shadow-retro-sm sm:w-auto uppercase"
                  >
                    <Link href={item.ctaHref}>{item.ctaLabel}</Link>
                  </Button>
                ) : null}
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
