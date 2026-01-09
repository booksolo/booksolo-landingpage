'use client';

import { useState, useEffect, useRef } from 'react';

declare global {
    interface Window {
        turnstile?: {
            render: (element: HTMLElement, options: {
                sitekey: string;
                callback?: (token: string) => void;
                'error-callback'?: () => void;
                'expired-callback'?: () => void;
                theme?: 'light' | 'dark' | 'auto';
                size?: 'normal' | 'compact' | 'invisible';
                language?: string;
            }) => string;
            reset: (widgetId: string) => void;
            remove: (widgetId: string) => void;
        };
    }
}

const NewsletterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const turnstileWidgetId = useRef<string | null>(null);
    const turnstileRef = useRef<HTMLDivElement>(null);
    
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

    useEffect(() => {
        // Only load Turnstile if site key is configured
        if (!turnstileSiteKey) {
            console.warn('Turnstile site key not configured - skipping Turnstile widget');
            // Allow form submission without Turnstile in dev mode
            setTurnstileToken('dev-mode-no-turnstile');
            return;
        }

        // Load Turnstile script
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            // Render Turnstile widget after script loads
            if (window.turnstile && turnstileRef.current && turnstileSiteKey) {
                turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
                    sitekey: turnstileSiteKey,
                    theme: 'light',
                    size: 'normal',
                    callback: (token: string) => {
                        setTurnstileToken(token);
                    },
                    'error-callback': () => {
                        setTurnstileToken(null);
                        setMessage({ type: 'error', text: 'Security verification error. Please refresh the page.' });
                    },
                    'expired-callback': () => {
                        setTurnstileToken(null);
                        if (turnstileWidgetId.current && window.turnstile) {
                            window.turnstile.reset(turnstileWidgetId.current);
                        }
                    }
                });
            }
        };
        script.onerror = () => {
            console.error('Failed to load Turnstile script');
            setMessage({ type: 'error', text: 'Failed to load security verification. Please refresh the page.' });
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup
            if (turnstileWidgetId.current && window.turnstile) {
                window.turnstile.remove(turnstileWidgetId.current);
            }
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [turnstileSiteKey]);

    const validateEmail = (email: string): boolean => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
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

        if (!turnstileToken || turnstileToken === 'dev-mode-no-turnstile') {
            // Skip Turnstile verification if not configured (dev mode)
            if (turnstileSiteKey && !turnstileToken) {
                setMessage({ type: 'error', text: 'Please wait for security verification' });
                return;
            }
        }

        setLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.booksolo.eu/prod/newsletter';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': window.location.origin,
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
                setTurnstileToken(null);
                // Reset Turnstile widget
                if (turnstileWidgetId.current && window.turnstile) {
                    window.turnstile.reset(turnstileWidgetId.current);
                }
            } else {
                setMessage({ type: 'error', text: data.error || 'An error occurred. Please try again.' });
                // Reset Turnstile widget on error
                if (turnstileWidgetId.current && window.turnstile) {
                    window.turnstile.reset(turnstileWidgetId.current);
                }
                setTurnstileToken(null);
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setMessage({ type: 'error', text: 'Connection error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-foreground-accent mb-4 text-sm">
                Subscribe to our newsletter to receive the latest updates.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
                    disabled={loading}
                    required
                />
                {turnstileSiteKey && (
                    <div ref={turnstileRef} className="flex justify-center"></div>
                )}
                <button
                    type="submit"
                    disabled={loading || (turnstileSiteKey ? !turnstileToken : false)}
                    className="px-6 py-2 bg-foreground text-white rounded-md hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
                {message && (
                    <div
                        className={`text-sm mt-2 ${
                            message.type === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

export default NewsletterForm;
