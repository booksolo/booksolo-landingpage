'use client';

import { useState, useEffect } from 'react';

declare global {
    interface Window {
        turnstile?: {
            getResponse: (widgetId?: string) => string | undefined;
            reset: (widgetId?: string) => void;
        };
    }
}

declare global {
    interface Window {
        onTurnstileSuccess?: (token: string) => void;
        onTurnstileError?: () => void;
        onTurnstileExpired?: () => void;
        turnstile?: {
            getResponse: (widgetId?: string) => string | undefined;
            reset: (widgetId?: string) => void;
        };
    }
}

const NewsletterForm: React.FC = () => {
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
                <div 
                    className="cf-turnstile flex justify-center" 
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
