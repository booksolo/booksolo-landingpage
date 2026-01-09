import { motion } from "framer-motion"

import { IBenefitBullet } from "@/types"
import { childVariants } from "./BenefitSection"

const BenefitBullet: React.FC<IBenefitBullet> = ({ title, description, icon }: IBenefitBullet) => {
    return (
        <motion.div
            className="flex flex-col items-center mt-10 md:mt-12 gap-4 lg:gap-6 lg:flex-row lg:items-start"
            variants={childVariants}
        >
            <div className="flex justify-center mx-auto lg:mx-0 flex-shrink-0 mt-1 w-fit">
                {icon}
            </div>
            <div className="flex-1">
                <h4 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
                    {title}
                </h4>
                <p className="text-base md:text-lg text-foreground-accent leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}

export default BenefitBullet