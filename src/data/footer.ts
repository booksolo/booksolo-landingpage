import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading:
        "Social media content tool for solo service businesses. Create ready-to-post Facebook and Instagram content in minutes, stay consistent, and attract more local clients.",
    quickLinks: [
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "Gallery",
            url: "#gallery"
        },
        {
            text: "AI chat",
            url: "#pricing"
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