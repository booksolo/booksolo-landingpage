import { motion } from "framer-motion"

import { IBenefitBullet } from "@/types"
import { childVariants } from "./BenefitSection"

const BenefitBullet: React.FC<IBenefitBullet> = ({ title, description, icon }: IBenefitBullet) => {
    return (
        <motion.div
            className="relative pl-9"
            variants={childVariants}
        >
            <dt className="font-semibold text-foreground">
                <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center text-primary">
                    {icon}
                </div>
                {title}.
            </dt>
            {' '}
            <dd className="inline text-foreground-accent">
                {description}
            </dd>
        </motion.div>
    )
}

export default BenefitBullet