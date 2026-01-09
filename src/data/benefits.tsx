import { FiClock, FiMessageCircle, FiCalendar, FiZap, FiTrendingUp, FiSmartphone, FiLink } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "24/7 Automated Customer Service",
        description: "Your AI chatbot handles 80% of customer queries automatically, even when you're not available. Never miss a booking opportunity. Whether it's answering questions about your services, checking availability, or handling appointment requests, your chatbot works tirelessly to ensure every customer interaction is handled professionally and efficiently.",
        bullets: [
            {
                title: "Instant Responses",
                description: "Customers get immediate answers to their questions, improving satisfaction and conversion rates. No more waiting for business hours or playing phone tag. Your chatbot responds in milliseconds, providing accurate information about your services, pricing, availability, and policies. This instant gratification keeps potential customers engaged and significantly increases the likelihood of converting inquiries into bookings.",
                icon: <FiZap size={26} />
            },
            {
                title: "Always Available",
                description: "Works around the clock, handling inquiries even outside business hours. While you sleep, your chatbot continues to serve customers, capturing leads and bookings 24/7. Early morning inquiries, late-night questions, weekend requests—all handled seamlessly. This constant availability means you never lose a potential customer due to timing, maximizing your booking opportunities and revenue potential.",
                icon: <FiClock size={26} />
            },
            {
                title: "Natural Conversations",
                description: "AI-powered chatbot understands context and provides human-like responses across all channels. Advanced natural language processing enables your chatbot to understand customer intent, remember conversation history, and respond appropriately to complex queries. Customers feel like they're talking to a knowledgeable assistant, not a robotic script. The chatbot adapts its tone and responses based on the conversation flow, ensuring a personalized experience that builds trust and encourages bookings.",
                icon: <FiMessageCircle size={26} />
            }
        ],
        // imageSrc: "/images/mockup-1.webp"
    },
    {
        title: "Multi-Channel Integration",
        description: "Connect your chatbot to multiple communication channels including WhatsApp, SMS, and more. Reach customers where they are.",
        bullets: [
            {
                title: "Multiple Channels",
                description: "Integrate with WhatsApp, SMS, and other popular communication platforms your customers use.",
                icon: <FiLink size={26} />
            },
            {
                title: "Automated Reminders",
                description: "Reduce no-shows by up to 70% with timely appointment reminders sent automatically.",
                icon: <FiSmartphone size={26} />
            },
            {
                title: "Calendar Integration",
                description: "Sync with your existing booking systems like Booksy or Calendly.",
                icon: <FiCalendar size={26} />
            }
        ],
        // imageSrc: "/images/mockup-2.webp"
    },
    {
        title: "Save Time, Grow Revenue",
        description: "Free up 3-5 hours daily from phone calls and manual administration. Focus on what you do best - serving your customers.",
        bullets: [
            {
                title: "Reduce Manual Work",
                description: "Automate repetitive tasks like answering common questions and managing bookings.",
                icon: <FiClock size={26} />
            },
            {
                title: "Lower No-Show Rate",
                description: "Cut no-shows from 30% to under 10% with automated reminders and confirmations.",
                icon: <FiTrendingUp size={26} />
            },
            {
                title: "More Time for Revenue",
                description: "Spend less time on administration and more time generating income.",
                icon: <FiZap size={26} />
            }
        ],
        // imageSrc: "/images/mockup-1.webp"
    },
]