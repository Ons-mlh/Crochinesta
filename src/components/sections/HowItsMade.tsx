"use client";

import { PackageCheck, Scissors, HandMetal } from "lucide-react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import { useLocale } from "../../i18n/LocaleProvider";

const steps = [
  {
    number: "01",
    titleKey: "yarn",
    descriptionKey: "yarnDescription",
    icon: Scissors,
  },
  {
    number: "02",
    titleKey: "stitch",
    descriptionKey: "stitchDescription",
    icon: HandMetal,
  },
  {
    number: "03",
    titleKey: "ship",
    descriptionKey: "shipDescription",
    icon: PackageCheck,
  },
] as const;

export default function HowItsMade() {
  const { messages } = useLocale();
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <section
      ref={ref}
      className={`bg-[#F0E8DF] py-20 transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-[#3D2314]">{messages.process.title}</h2>
          <p className="mt-2 font-sans text-sm text-[#9B6845]">{messages.process.description}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D9C9BB] bg-white">
                  <Icon size={22} className="text-[#9B6845]" />
                </div>
                <p className="mb-2 font-sans text-xs font-medium tracking-widest text-[#9B6845]">{step.number}</p>
                <h3 className="mb-2 font-serif text-lg text-[#3D2314]">{messages.process[step.titleKey]}</h3>
                <p className="mx-auto max-w-50 font-sans text-sm leading-relaxed text-[#6B5344]">{messages.process[step.descriptionKey]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
