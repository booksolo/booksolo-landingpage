import { FiClock, FiMessageCircle, FiCalendar, FiZap, FiTrendingUp, FiSmartphone, FiLink } from "react-icons/fi";
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import BenefitSection from "./BenefitSection";
import type { IBenefit } from "@/types";

interface BenefitsProps {
    locale: Locale;
}

const Benefits: React.FC<BenefitsProps> = ({ locale }) => {
    const t = getDictionary(locale);
    
    const benefits: IBenefit[] = [
        {
            title: t.benefits.section1.title,
            description: t.benefits.section1.description,
            bullets: [
                {
                    title: t.benefits.section1.bullets[0].title,
                    description: t.benefits.section1.bullets[0].description,
                    icon: <FiZap size={20} />
                },
                {
                    title: t.benefits.section1.bullets[1].title,
                    description: t.benefits.section1.bullets[1].description,
                    icon: <FiClock size={20} />
                },
                {
                    title: t.benefits.section1.bullets[2].title,
                    description: t.benefits.section1.bullets[2].description,
                    icon: <FiMessageCircle size={20} />
                }
            ],
            imageSrc: "/images/fitness.png"
        },
        {
            title: t.benefits.section2.title,
            description: t.benefits.section2.description,
            bullets: [
                {
                    title: t.benefits.section2.bullets[0].title,
                    description: t.benefits.section2.bullets[0].description,
                    icon: <FiLink size={20} />
                },
                {
                    title: t.benefits.section2.bullets[1].title,
                    description: t.benefits.section2.bullets[1].description,
                    icon: <FiSmartphone size={20} />
                },
                {
                    title: t.benefits.section2.bullets[2].title,
                    description: t.benefits.section2.bullets[2].description,
                    icon: <FiCalendar size={20} />
                }
            ],
            imageSrc: "/beauty.png"
        },
        {
            title: t.benefits.section3.title,
            description: t.benefits.section3.description,
            bullets: [
                {
                    title: t.benefits.section3.bullets[0].title,
                    description: t.benefits.section3.bullets[0].description,
                    icon: <FiClock size={20} />
                },
                {
                    title: t.benefits.section3.bullets[1].title,
                    description: t.benefits.section3.bullets[1].description,
                    icon: <FiTrendingUp size={20} />
                },
                {
                    title: t.benefits.section3.bullets[2].title,
                    description: t.benefits.section3.bullets[2].description,
                    icon: <FiZap size={20} />
                }
            ],
            imageSrc: "/images/hairdress.png"
        },
    ];

    // Image positions: fitness (right), beauty (left), hairdress (right)
    const imagePositions = [true, false, true]; // true = right, false = left
    
    return (
        <div id="features" className="py-8 md:py-12">
            <h2 className="sr-only">Features</h2>
            {benefits.map((item, index) => {
                return <BenefitSection key={index} benefit={item} imageAtRight={imagePositions[index]} />
            })}
        </div>
    )
}

export default Benefits