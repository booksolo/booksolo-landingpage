import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getPlatformIconByName } from '@/utils';

interface FooterProps {
    locale: Locale;
}

const Footer: React.FC<FooterProps> = ({ locale }) => {
    const t = getDictionary(locale);
    
    const quickLinks = [
        { text: t.nav.features, url: '#features' },
        { text: t.nav.gallery, url: '#gallery' },
        { text: t.nav.aiChat, url: '#pricing' },
    ];
    
    const socials = {
        facebook: 'https://www.facebook.com/profile.php?id=61586280141672',
        instagram: 'https://www.instagram.com/booksolo.ai/',
    };

    return (
        <footer className="bg-white text-foreground py-10">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <Link href={`/${locale}`} className="flex items-center">
                        <Image 
                            src="/images/Logo.png" 
                            alt="BookSolo" 
                            width={577} 
                            height={108}
                            className="h-12 w-auto"
                        />
                    </Link>
                    <p className="mt-3.5 text-foreground-accent">
                        {t.footer.description}
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
                    <ul className="text-foreground-accent">
                        {quickLinks.map(link => (
                            <li key={link.text} className="mb-2">
                                <Link href={link.url} className="hover:text-foreground">{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">{t.footer.contactUs}</h4>

                    <a href="mailto:hello@booksolo.eu" className="block text-foreground-accent hover:text-foreground">
                        {t.footer.email}: hello@booksolo.eu
                    </a>

                    <div className="mt-5 flex items-center gap-5 flex-wrap">
                        {Object.keys(socials).map(platformName => (
                            <Link
                                href={socials[platformName as keyof typeof socials]}
                                key={platformName}
                                aria-label={platformName}
                            >
                                {getPlatformIconByName(platformName)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 md:text-center text-foreground-accent px-6">
                <p>{t.footer.copyright}</p>
            </div>
        </footer>
    );
};

export default Footer;
