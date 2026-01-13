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

            {children}
        </Helmet>
    );
};

export default SEO;
