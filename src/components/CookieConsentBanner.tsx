import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const CookieConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('mobintix-cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('mobintix-cookie-consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('mobintix-cookie-consent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6" style={{
            background: "rgba(10, 10, 10, 0.95)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.3)"
        }}>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-gray-300 text-sm md:text-base">
                    <span className="font-semibold text-white block mb-1">We verify your privacy.</span>
                    <p>
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                        By clicking "Accept All", you consent to our use of cookies.
                        <Link to="/privacy-policy" className="ml-2 text-blue-400 hover:text-blue-300 underline">
                            Read Policy
                        </Link>
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={handleDecline}
                        className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
                    >
                        Necessary Only
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                    >
                        Accept All
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="md:hidden text-gray-500 hover:text-white"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsentBanner;
