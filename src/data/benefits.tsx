import { FiClock, FiMessageCircle, FiCalendar, FiZap, FiTrendingUp, FiSmartphone, FiLink } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Automatic content creation",
        description:
            "Solo Social creates most of your social media content automatically, even when you’re busy with clients. Whether it’s captions, post ideas, or simple content plans for Facebook and Instagram, it works in the background to keep your profiles active and professional.",
        bullets: [
            {
                title: "Instant content",
                description:
                    "Get ready-to-post captions and ideas in seconds, not hours. No more staring at a blank screen or wondering what to write.",
                icon: <FiZap size={26} />
            },
            {
                title: "Always consistent",
                description:
                    "Stay visible every week, even when your schedule is full. Solo Social helps you keep a steady flow of posts over time.",
                icon: <FiClock size={26} />
            },
            {
                title: "Natural voice",
                description:
                    "Content matches your tone and niche, so it sounds like you, not a generic robot. It fits your services, city and way of speaking.",
                icon: <FiMessageCircle size={26} />
            }
        ],
        // imageSrc: "/images/mockup-1.webp"
    },
    {
        title: "Content for the channels that matter",
        description:
            "Solo Social focuses on the platforms your clients actually use, like Facebook and Instagram, so you can show up where they scroll every day.",
        bullets: [
            {
                title: "Different formats, one tool",
                description:
                    "Generate captions, post ideas and simple content plans from a single place, ready for feed posts, stories or reels descriptions.",
                icon: <FiLink size={26} />
            },
            {
                title: "Automatic posting rhythm",
                description:
                    "Get suggestions for what to publish this week and in what order, so your profiles stay active without daily planning.",
                icon: <FiSmartphone size={26} />
            },
            {
                title: "Plan once, reuse often",
                description:
                    "Turn one idea into multiple posts: tips, before/after, education or promotions, reusing your best content in smart ways.",
                icon: <FiCalendar size={26} />
            }
        ],
        // imageSrc: "/images/mockup-2.webp"
    },
    {
        title: "Save Time, Grow Revenue",
        description:
            "Replace long hours of thinking about content with a few focused minutes per week. Prepare posts quickly and spend the rest of your time with clients.",
        bullets: [
            {
                title: "Less manual work",
                description:
                    "Stop writing every post from scratch. Use generated drafts as a base, then just review and adjust.",
                icon: <FiClock size={26} />
            },
            {
                title: "More visibility",
                description:
                    "Consistent, better content means more people see your business and remember you when they need your service.",
                icon: <FiTrendingUp size={26} />
            },
            {
                title: "More time for revenue",
                description:
                    "Spend less time stuck in content creation and more time doing paid work or talking to real clients.",
                icon: <FiZap size={26} />
            }
        ],
        // imageSrc: "/images/mockup-1.webp"
    },
]