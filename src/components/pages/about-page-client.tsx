"use client";

import { animate } from "animejs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  AboutTimeline,
  type TimelineItem,
} from "@/components/portfolio/about-timeline";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Github, Linkedin, Mail } from "@/components/retroui/icons";
import { githubUrl, linkedinUrl } from "@/lib/site-config";

type AboutPageClientProps = {
  timelineItems: TimelineItem[];
};

const strengths = [
  {
    title: "Modern Application Delivery",
    detail:
      "I build web applications, REST APIs, and business workflows with a focus on maintainability, performance, and production readiness.",
  },
  {
    title: "Backend and Integration Work",
    detail:
      "My work includes authentication flows, external APIs, webhooks, payment processes, and data models that support real operations.",
  },
  {
    title: "Linux VPS Operations",
    detail:
      "I deploy and maintain products on Linux VPS infrastructure using SSH, SSL, domain configuration, DNS, and release validation.",
  },
] as const;

const stackAreas = [
  "Frontend: Next.js, React, TypeScript, Tailwind CSS",
  "Backend: Node.js, Django, .NET, PHP Slim Framework, REST APIs",
  "Data: PostgreSQL, Supabase, Firebase",
  "Operations: Linux VPS, SSH, SSL, DNS, deployment workflows",
] as const;

export function AboutPageClient({ timelineItems }: AboutPageClientProps) {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = aboutRef.current;
    if (!root) {
      return;
    }

    const revealTargets = root.querySelectorAll("[data-about-reveal]");
    animate(revealTargets, {
      opacity: [0, 1],
      translateY: [18, 0],
      delay: 70,
      duration: 320,
      ease: "outQuad",
    });
  }, []);

  return (
    <div ref={aboutRef} className="space-y-8 pb-16">
      <section
        className="border-4 border-black bg-card p-6 shadow-retro-lg md:p-8"
        data-about-reveal
      >
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="mx-auto w-full max-w-xs border-4 border-black bg-primary p-3 shadow-retro-md">
            <div className="border-4 border-black bg-card p-0">
              <Image
                src="/myprofile.jpg"
                alt="Daniel Hachac Salas"
                width={420}
                height={420}
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

          <div>
            <h1 className="font-pixel text-3xl uppercase sm:text-4xl md:text-5xl">
              About
            </h1>
            <div className="mt-5 space-y-4 text-sm font-medium leading-relaxed sm:text-base md:text-lg">
              <p>
                I am a full-stack developer based in Mexico City, focused on
                building maintainable software for real business use. My work
                spans web applications, REST APIs, mobile-connected workflows,
                integrations, and production deployments.
              </p>
              <p>
                I have shipped projects with Next.js, Django, .NET, PHP,
                Supabase, Firebase, and PostgreSQL, adapting the stack to the
                product instead of forcing the product into a preferred stack.
              </p>
              <p>
                I also handle Linux VPS deployment responsibilities, including
                SSH access, SSL certificates, domains, DNS configuration, and
                release checks so products can move from development to
                production cleanly.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="w-full border-4 border-black shadow-retro-sm sm:w-auto uppercase"
              >
                <Link href="/project">Explore Projects</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="w-full border-4 border-black shadow-retro-sm sm:w-auto uppercase"
              >
                <Link href="/contact">Start a Conversation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4" data-about-reveal>
        <h2 className="font-display text-3xl uppercase sm:text-4xl">
          Professional Snapshot
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {strengths.map((item) => (
            <Card
              key={item.title}
              className="border-4 border-black bg-secondary shadow-retro-md"
            >
              <Card.Header>
                <Card.Title className="font-display text-2xl uppercase text-secondary-foreground">
                  {item.title}
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="font-medium leading-relaxed text-secondary-foreground">
                  {item.detail}
                </p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4" data-about-reveal>
        <h2 className="font-display text-3xl uppercase sm:text-4xl">
          Technical Focus
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {stackAreas.map((point) => (
            <Card
              key={point}
              className="border-4 border-black bg-card shadow-retro-md"
            >
              <Card.Content>
                <p className="font-medium leading-relaxed">{point}</p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <section
        className="border-4 border-black bg-primary p-6 shadow-retro-lg md:p-8"
        data-about-reveal
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl uppercase text-primary-foreground sm:text-4xl">
            Experience Journey
          </h2>
          <Button
            asChild
            variant="secondary"
            className="w-full border-4 border-black shadow-retro-sm sm:w-auto uppercase"
          >
            <Link
              href="/CV_Daniel_Hachac_Salas_Harvard_EN.md"
              target="_blank"
              rel="noreferrer noopener"
            >
              View CV Source
            </Link>
          </Button>
        </div>
        <AboutTimeline items={timelineItems} />
      </section>
    </div>
  );
}
