"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Input } from "@/components/retroui/Input";
import { Search } from "@/components/retroui/icons";
import {
  portfolioProjects,
  type PortfolioProject,
} from "@/lib/portfolio-projects";

type ProjectsGridProps = {
  compact?: boolean;
  limit?: number;
};

export function ProjectsGrid({ compact = false, limit = 3 }: ProjectsGridProps) {
  const PAGE_SIZE = 9;
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "name-asc">("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(
    () => ["All", ...new Set(portfolioProjects.map((project) => project.category))],
    [],
  );

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    const filteredProjects = portfolioProjects.filter((project) => {
      const byCategory =
        compact || selectedCategory === "All"
          ? true
          : project.category === selectedCategory;
      const haystack =
        `${project.title} ${project.summary} ${project.description} ${project.stack.join(" ")} ${project.category}`.toLowerCase();

      return byCategory && (compact || haystack.includes(text));
    });

    return [...filteredProjects].sort((a, b) => {
      if (compact || sortBy === "featured") {
        return (
          portfolioProjects.findIndex((item) => item.slug === a.slug) -
          portfolioProjects.findIndex((item) => item.slug === b.slug)
        );
      }

      return a.title.localeCompare(b.title);
    });
  }, [compact, query, selectedCategory, sortBy]);

  const visible = compact ? filtered.slice(0, limit) : filtered;
  const totalPages = compact
    ? 1
    : Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const paginated = compact
    ? visible
    : visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section className="space-y-6">
      {!compact ? (
        <div className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(event) => {
                setCurrentPage(1);
                setQuery(event.target.value);
              }}
              placeholder="Search project titles, stack, or delivery context..."
              className="w-full border-4 border-black bg-card py-3 pl-11 font-bold shadow-retro"
            />
          </div>

          <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_14rem] xl:items-start">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  onClick={() => {
                    setCurrentPage(1);
                    setSelectedCategory(category);
                  }}
                  className="border-4 border-black shadow-retro-sm uppercase"
                >
                  {category}
                </Button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(event) => {
                setCurrentPage(1);
                setSortBy(event.target.value as "featured" | "name-asc");
              }}
              className="h-11 w-full border-4 border-black bg-card px-3 font-black uppercase shadow-retro"
              aria-label="Sort projects"
            >
              <option value="featured">Featured Order</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>
        </div>
      ) : null}

      <AnimatePresence mode="popLayout">
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          layout
        >
          {paginated.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ delay: index * 0.03 }}
            >
              <ProjectCard project={project} compact={compact} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {visible.length === 0 ? (
        <div className="border-4 border-black bg-muted p-6 text-center font-black uppercase shadow-retro">
          No projects found for this search and category filter.
        </div>
      ) : null}

      {!compact && totalPages > 1 ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;

            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "secondary"}
                className="border-4 border-black shadow-retro-sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

function ProjectCard({
  project,
  compact,
}: {
  project: PortfolioProject;
  compact: boolean;
}) {
  return (
    <Card className="flex h-full w-full flex-col border-4 border-black shadow-retro-md hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
      <Card.Header className={compact ? "min-h-0 flex-1" : "min-h-52 flex-1"}>
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="retro-badge text-[10px] sm:text-xs">
            {project.category}
          </span>
          <span className="text-[10px] font-black uppercase text-muted-foreground sm:text-xs">
            {project.period}
          </span>
        </div>
        <Card.Title className="font-display text-xl uppercase">
          {project.title}
        </Card.Title>
        <Card.Description
          className={
            compact
              ? "mt-2 text-sm leading-relaxed line-clamp-3"
              : "mt-2 text-sm leading-relaxed sm:text-base line-clamp-5"
          }
        >
          {compact ? project.summary : project.description}
        </Card.Description>
      </Card.Header>
      <Card.Content className="mt-auto flex flex-col gap-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="retro-badge max-w-full truncate text-[10px] sm:text-xs"
            >
              {item}
            </span>
          ))}
        </div>
        {!compact ? (
          <ul className="space-y-2">
            {project.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="border-l-4 border-black pl-3 text-sm font-medium leading-relaxed"
              >
                {outcome}
              </li>
            ))}
          </ul>
        ) : null}
        {project.liveUrl ? (
          <Button
            asChild
            className="w-full justify-center border-4 border-black shadow-retro-sm uppercase"
          >
            <Link href={project.liveUrl} target="_blank" rel="noreferrer noopener">
              Visit Project
            </Link>
          </Button>
        ) : (
          <div className="border-2 border-black bg-muted px-3 py-2 text-center text-xs font-black uppercase">
            Private or internal delivery
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
