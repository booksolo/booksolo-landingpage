import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "AI-powered chatbots with integrations to multiple communication channels for solo entrepreneurs. Reduce no-shows, save time, and grow your business.",
    quickLinks: [
        {
            text: "Features",
            url: "#features"
        }
        // {
        //     text: "Pricing",
        //     url: "#pricing"
        // },
        // {
        //     text: "Testimonials",
        //     url: "#testimonials"
        // }
    ],
    email: 'hello@booksolo.eu',
    telephone: '',
    socials: {
        facebook: 'https://www.facebook.com/profile.php?id=61586280141672',
        instagram: 'https://www.instagram.com/booksolo.ai/',
        // github: 'https://github.com',
        // x: 'https://twitter.com/x',
        // twitter: 'https://twitter.com/Twitter',
        // youtube: 'https://youtube.com',
        // linkedin: 'https://www.linkedin.com',
        // threads: 'https://www.threads.net',
    }
}