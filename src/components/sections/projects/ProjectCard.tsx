"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";
import ProjectThumbnail from "./ProjectThumbnail";
import TiltCard from "@/components/ui/TiltCard";

export default function ProjectCard({
  project,
  index,
  reverse,
}: {
  project: Project;
  index: number;
  reverse: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <TiltCard maxTilt={5}>
        <ProjectThumbnail type={project.thumbnail} />
      </TiltCard>

      <div>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-border-strong" />
          <span>{project.year}</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
            {project.name}
          </h3>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              View Live
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          ) : null}
        </div>
        <div className="mt-1 text-sm font-medium text-accent">{project.tag}</div>

        <p className="mt-5 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-col gap-2.5">
          {project.points.map((point) => (
            <li
              key={point}
              className="flex gap-3 text-sm leading-relaxed text-text-secondary"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-tertiary" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
