"use client"
import clsx from "clsx";
import { motion, Variants } from "framer-motion"
import Image from "next/image";

import BenefitBullet from "./BenefitBullet";
import SectionTitle from "../SectionTitle";
import { IBenefit } from "@/types";

interface Props {
    benefit: IBenefit;
    imageAtRight?: boolean;
}

const containerVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 100
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 0.9,
            delayChildren: 0.2,
            staggerChildren: 0.1,
        }
    }
};

export const childVariants = {
    offscreen: {
        opacity: 0,
        x: -50,
    },
    onscreen: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 1,
        }
    },
};

const BenefitSection: React.FC<Props> = ({ benefit, imageAtRight }: Props) => {
    const { title, description, bullets, imageSrc } = benefit;

    return (
        <section className="benefit-section py-12 md:py-16">
            <motion.div
                className="overflow-hidden"
                variants={containerVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className={clsx(
                        "mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start",
                        { "lg:grid-flow-col-dense": !imageAtRight }
                    )}>
                        <div className={clsx("lg:pr-8 lg:pt-4 order-1", { "lg:pl-8 lg:pr-0 lg:col-start-2": !imageAtRight })}>
                            <div className="lg:max-w-lg">
                                <motion.div variants={childVariants}>
                                    <SectionTitle>
                                        <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                            {title}
                                        </h3>
                                    </SectionTitle>
                                    <p className="mt-6 text-lg leading-8 text-foreground-accent">
                                        {description}
                                    </p>
                                </motion.div>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-foreground-accent lg:max-w-none">
                                    {bullets.map((item, index) => (
                                        <BenefitBullet 
                                            key={index} 
                                            title={item.title} 
                                            icon={item.icon} 
                                            description={item.description} 
                                        />
                                    ))}
                                </dl>
                            </div>
                        </div>
                        {imageSrc && (
                            <div className={clsx(
                                "flex items-start justify-center order-2",
                                { "lg:order-last": imageAtRight, "lg:order-first": !imageAtRight }
                            )}>
                                <div className="relative w-full max-w-md lg:max-w-none">
                                    <Image
                                        src={imageSrc}
                                        alt={title}
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto rounded-xl shadow-xl ring-1 ring-gray-400/10 object-cover"
                                        priority={false}
                                    />
                                </div>
                            </div>
                        )}
                        {!imageSrc && (
                            <div className="flex flex-wrap items-center w-full max-w-lg">
                                {/* Placeholder for sections without images */}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default BenefitSection