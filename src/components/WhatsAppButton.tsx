import { MessageCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

const WhatsAppButton = () => {
    const phoneNumber = '919409383803';
    const message = 'Hello Mobintix Infotech! I am interested in your services.';

    const handleClick = () => {
        trackEvent('click', 'WhatsApp', 'Floating Button');
    };

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 group flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
            aria-label="Chat on WhatsApp"
        >
            <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></div>
            <MessageCircle size={32} fill="white" className="text-white relative z-10" />
            <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                Chat with us
            </span>
        </a>
    );
};

export default WhatsAppButton;
