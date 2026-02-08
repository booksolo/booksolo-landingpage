import React from 'react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

interface HeroProps {
    locale: Locale;
}

const Hero: React.FC<HeroProps> = ({ locale }) => {
    const t = getDictionary(locale);
    
    return (
        <section
            id="hero"
            className="relative flex items-center justify-center pb-16 md:pb-24 pt-32 md:pt-40 px-5 bg-white"
        >
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto">{t.hero.heading}</h1>
                <p className="mt-6 md:mt-8 text-foreground max-w-lg mx-auto text-lg md:text-xl leading-relaxed">{t.hero.subheading}</p>
            </div>
        </section>
    );
};

export default Hero;
