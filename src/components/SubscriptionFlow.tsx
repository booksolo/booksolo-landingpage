"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const containerVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.9,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const chatImageVariants: Variants = {
  offscreen: {
    opacity: 0,
    scale: 0.9,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const SubscriptionFlow: React.FC = () => {
  const chatImages = [
    {
      src: "/images/Chat 1.png",
      alt: "Subscription flow - Welcome",
      step: 1,
    },
    {
      src: "/images/Chat 2.png",
      alt: "Subscription flow - Terms acceptance",
      step: 2,
    },
    {
      src: "/images/Chat 3.png",
      alt: "Subscription flow - Confirmation",
      step: 3,
    },
  ];

  return (
    <section
      id="subscription-flow"
      className="py-12 md:py-16 border-t border-slate-200"
    >
      <motion.div
        className="max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            Simple, conversational subscription
          </h2>
          <p className="text-base md:text-lg text-foreground-accent max-w-2xl mx-auto leading-relaxed">
            Activate your Booksolo subscription in seconds through our
            intelligent chat. No forms, no complexity—just a natural
            conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {chatImages.map((chat) => (
            <motion.div
              key={chat.step}
              variants={chatImageVariants}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={chat.src}
                  alt={chat.alt}
                  width={1080}
                  height={1350}
                  quality={95}
                  className="w-full h-auto"
                  priority={chat.step === 1}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto">
            Our agentic chat guides you through each step, ensuring clarity and
            compliance while keeping the experience effortless.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default SubscriptionFlow;
