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
        // github: 'https://github.com',
        // x: 'https://twitter.com/x',
        // twitter: 'https://twitter.com/Twitter',
        // facebook: 'https://facebook.com',
        // youtube: 'https://youtube.com',
        // linkedin: 'https://www.linkedin.com',
        // threads: 'https://www.threads.net',
        // instagram: 'https://www.instagram.com',
    }
}