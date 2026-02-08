import PricingColumn from "./PricingColumn";
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import type { IPricing } from "@/types";

interface PricingProps {
    locale: Locale;
}

const Pricing: React.FC<PricingProps> = ({ locale }) => {
    const t = getDictionary(locale);
    
    const tiers: IPricing[] = [
        {
            name: t.pricing.tiers.starter,
            description: 'Everything you need to get started.',
            price: 19,
            image: '/images/Chat 1.png',
            features: [],
        },
        {
            name: t.pricing.tiers.growth,
            description: 'All the extras for your growing team.',
            price: 49,
            image: '/images/Chat 2.png',
            features: [],
        },
        {
            name: t.pricing.tiers.scale,
            description: 'Added flexibility at scale.',
            price: 99,
            image: '/images/Chat 3.png',
            features: [],
        },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
                <PricingColumn key={tier.name} tier={tier} highlight={index === 1} />
            ))}
        </div>
    )
}

export default Pricing