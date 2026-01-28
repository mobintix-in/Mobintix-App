
declare global {
    interface Window {
        gtag: (command: string, ...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

export const GA_TRACKING_ID = 'G-VQ7F85C7QY'; // Replace with your Measurement ID

// Initialize GA4
export const initGA = () => {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}');
  `;
    document.head.appendChild(script2);
};

// Track specific events
export const trackEvent = (action: string, category: string, label: string, value?: number) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    } else {
        console.log('GA Event:', { action, category, label, value });
    }
};
