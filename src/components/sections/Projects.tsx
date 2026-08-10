import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/lib/data";
import ProjectCard from "./projects/ProjectCard";

export default function Projects() {
  return (
    <section id="work" className="relative py-8 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Selected Work"
          title="Systems built to hold up"
          accent="at scale."
          description="Placeholder generative visuals stand in for live screenshots — swap in real captures anytime."
        />

        <div className="mt-12 flex flex-col gap-16 sm:mt-20 sm:gap-24 lg:gap-32">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
