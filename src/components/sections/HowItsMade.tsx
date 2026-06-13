"use client";

import { PackageCheck, Scissors, HandMetal } from "lucide-react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

const steps = [
  {
    number: "01",
    title: "Choose the yarn",
    description: "We select soft, high-quality yarns in colors that feel warm and timeless.",
    icon: Scissors,
  },
  {
    number: "02",
    title: "Stitch by hand",
    description: "Each piece is crocheted stitch by stitch, no machines, no shortcuts.",
    icon: HandMetal,
  },
  {
    number: "03",
    title: "Ship with love",
    description: "Wrapped carefully and sent to you with a handwritten thank-you note.",
    icon: PackageCheck,
  },
];

export default function HowItsMade() {
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
          <h2 className="font-serif text-3xl text-[#3D2314]">Made with intention, stitched with love</h2>
          <p className="mt-2 font-sans text-sm text-[#9B6845]">Every Crochinesta piece is handcrafted from start to finish.</p>
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
                <h3 className="mb-2 font-serif text-lg text-[#3D2314]">{step.title}</h3>
                <p className="mx-auto max-w-50 font-sans text-sm leading-relaxed text-[#6B5344]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
