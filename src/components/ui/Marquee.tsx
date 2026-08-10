import { Fragment, type ReactNode } from "react";

export default function Marquee({
  children,
  speed = 32,
  reverse = false,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex w-max gap-8 whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite ${
            reverse ? "reverse" : ""
          }`,
        }}
      >
        {[0, 1].map((i) => (
          <Fragment key={i}>
            <div className="flex shrink-0 gap-8" aria-hidden={i === 1}>
              {children}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
