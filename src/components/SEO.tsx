import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string;
    children?: React.ReactNode;
}

const SEO = ({
    title = 'Mobintix Infotech | Web & Mobile App Development Company',
    description = 'Mobintix Infotech is an India-based IT company offering web development, mobile app development, UI/UX design, and scalable digital solutions worldwide.',
    keywords = 'Mobintix Infotech, web development company, mobile app development, Flutter developers India, React development, IT services',
    url = '/',
    image = '/seo-banner.png',
    children,
}: SEOProps) => {
    const siteUrl = 'https://mobintixinfotech.vercel.app';
    const fullUrl = `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;

    return (
        <Helmet>
            {/* Basic SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={fullImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Mobile */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "additionalType": "https://schema.org/ITService",
                    "name": "Mobintix Infotech",
                    "image": `${siteUrl}/Mobintix.png`,
                    "url": siteUrl,
                    "logo": `${siteUrl}/Mobintix.png`,
                    "priceRange": "$500-5000",
                    "telephone": "+91-94093-83803",
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+91-94093-83803",
                        "contactType": "customer service",
                        "areaServed": ["IN", "US", "GB", "AU", "CA"],
                        "availableLanguage": ["en", "hi", "gu"]
                    },
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "95, Krishna Residency",
                        "addressLocality": "Surat",
                        "addressRegion": "Gujarat",
                        "postalCode": "394190",
                        "addressCountry": "IN"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "5.0",
                        "reviewCount": "19",
                        "bestRating": "5",
                        "worstRating": "1"
                    },
                    "sameAs": [
                        "https://www.linkedin.com/company/mobintix/",
                        "https://github.com/mobintix-in",
                        "https://www.instagram.com/mobintix.infotech/",
                        "https://www.facebook.com/mobintix/"
                    ]
                })}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Mobintix Infotech",
                    "url": siteUrl,
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${siteUrl}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string"
                    }
                })}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": siteUrl
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": title.split('|')[0].trim(),
                            "item": fullUrl
                        }
                    ]
                })}
            </script>

            {children}
        </Helmet>
    );
};

export default SEO;
