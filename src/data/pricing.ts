import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Starter',
        description: 'Everything you need to get started.',
        price: 19,
        image: '/images/Chat 1.png',
        features: [
            'Custom domains',
            'Edge content delivery',
            'Advanced analytics',
            'Quarterly workshops',
            'Single sign-on (SSO)',
            'Priority phone support',
        ],
    },
    {
        name: 'Growth',
        description: 'All the extras for your growing team.',
        price: 49,
        image: '/images/Chat 2.png',
        features: [
            'Custom domains',
            'Edge content delivery',
            'Advanced analytics',
            'Quarterly workshops',
            'Single sign-on (SSO)',
            'Priority phone support',
        ],
    },
    {
        name: 'Scale',
        description: 'Added flexibility at scale.',
        price: 99,
        image: '/images/Chat 3.png',
        features: [
            'Custom domains',
            'Edge content delivery',
            'Advanced analytics',
            'Quarterly workshops',
            'Single sign-on (SSO)',
            'Priority phone support',
        ],
    },
]