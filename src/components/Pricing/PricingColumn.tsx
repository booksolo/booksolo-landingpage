import Image from "next/image";

import { IPricing } from "@/types";

interface Props {
    tier: IPricing;
    highlight?: boolean;
}

const PricingColumn: React.FC<Props> = ({ tier }: Props) => {
    const { name, image } = tier;

    return (
        <div className="relative">
            {image && (
                <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                        src={image}
                        alt={name}
                        width={1080}
                        height={1350}
                        quality={95}
                        className="w-full h-auto"
                    />
                </div>
            )}
        </div>
    )
}

export default PricingColumn