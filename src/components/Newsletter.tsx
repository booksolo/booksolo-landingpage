'use client';

import { useState, useEffect } from 'react';

declare global {
    interface Window {
        turnstile?: {
            getResponse: (widgetId?: string) => string | undefined;
            reset: (widgetId?: string) => void;
        };
        onTurnstileSuccess?: (token: string) => void;
        onTurnstileError?: () => void;
        onTurnstileExpired?: () => void;
    }
}

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        // Set up Turnstile callbacks for implicit rendering
        if (typeof window !== 'undefined') {
            window.onTurnstileSuccess = (token: string) => {
                console.log('Turnstile verified:', token);
            };
            window.onTurnstileError = () => {
                setMessage({ type: 'error', text: 'Security verification error. Please refresh the page.' });
            };
            window.onTurnstileExpired = () => {
                // Token expired - widget will auto-refresh
                console.log('Turnstile token expired');
            };
        }
    }, []);

    const validateEmail = (email: string): boolean => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);

        if (!email.trim()) {
            setMessage({ type: 'error', text: 'Email is required' });
            return;
        }

        if (!validateEmail(email)) {
            setMessage({ type: 'error', text: 'Invalid email format' });
            return;
        }

        // Get Turnstile token from form (implicit rendering adds hidden input with name 'cf-turnstile-response')
        const form = e.currentTarget;
        const formData = new FormData(form);
        const turnstileToken = formData.get('cf-turnstile-response') as string | null;
        
        if (!turnstileToken) {
            setMessage({ type: 'error', text: 'Please complete the security verification' });
            return;
        }

        setLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.booksolo.eu/prod/newsletter';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email.trim().toLowerCase(),
                    turnstileToken: turnstileToken
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage({ type: 'success', text: 'Thank you! You have been subscribed to the newsletter.' });
                setEmail('');
                // Reset Turnstile widget
                if (window.turnstile) {
                    window.turnstile.reset();
                }
            } else {
                setMessage({ type: 'error', text: data.error || 'An error occurred. Please try again.' });
                // Reset Turnstile widget on error
                if (window.turnstile) {
                    window.turnstile.reset();
                }
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setMessage({ type: 'error', text: 'Connection error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Subscribe to our newsletter
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-foreground-accent">
                            Get the latest updates, tips, and insights delivered straight to your inbox. Stay connected with Booksolo and never miss important news.
                        </p>
                    </div>
                    <div className="w-full max-w-md">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    className="w-full rounded-md border-0 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Enter your email"
                                />
                            </div>
                            
                            <div 
                                className="cf-turnstile flex justify-start" 
                                data-sitekey="0x4AAAAAACLhqBlL3PU3Rxhe"
                                data-theme="light"
                                data-size="normal"
                                data-callback="onTurnstileSuccess"
                                data-error-callback="onTurnstileError"
                                data-expired-callback="onTurnstileExpired"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? 'Subscribing...' : 'Subscribe'}
                            </button>

                            {message && (
                                <div
                                    className={`text-sm ${
                                        message.type === 'success' ? 'text-green-600' : 'text-red-600'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
