'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';

import Container from './Container';
import LanguageSwitcher from './LanguageSwitcher';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

interface HeaderProps {
    locale: Locale;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = getDictionary(locale);
    
    const menuItems = [
        { text: t.nav.features, url: '#features' },
        { text: t.nav.gallery, url: '#gallery' },
        { text: t.nav.aiChat, url: '#pricing' },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
            <Container className="!px-0">
                {/* Language Switcher Row - Desktop Only */}
                <div className="hidden md:flex justify-end py-2 px-5">
                    <LanguageSwitcher currentLocale={locale} />
                </div>
                
                {/* Main Navigation Row */}
                <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-6">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Image 
                            src="/images/Logo.png" 
                            alt="BookSolo" 
                            width={577} 
                            height={108}
                            className="h-12 md:h-16 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center">
                        <ul className="flex space-x-6">
                            {menuItems.map(item => (
                                <li key={item.text}>
                                    <Link href={item.url} className="text-foreground hover:text-foreground-accent transition-colors">
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-primary text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiBars3 className="h-6 w-6" aria-hidden="true" />
                            )}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </nav>
            </Container>

                    {/* Mobile Menu with Transition */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
                    <ul className="flex flex-col space-y-4 pt-1 pb-4 px-6">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <Link href={item.url} className="text-foreground hover:text-primary block" onClick={toggleMenu}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="px-6 pb-6 border-t border-gray-200 pt-4">
                        <LanguageSwitcher currentLocale={locale} className="w-full" />
                    </div>
                </div>
            </Transition>
        </header>
    );
};

export default Header;
