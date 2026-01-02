import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    url?: string;
    image?: string;
    type?: string;
    children?: React.ReactNode;
}

const SEO = ({ title, description, url, image, type = 'website', children }: SEOProps) => {
    const siteTitle = 'Mobintix Infotech';
    const fullTitle = `${title} | ${siteTitle}`;
    const baseUrl = 'https://mobintixinfotech.vercel.app';
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
    // If image is absolute, use it; otherwise prepend base URL. Default to Mobintixtheme.png
    const fullImage = image
        ? (image.startsWith('http') ? image : `${baseUrl}${image}`)
        : `${baseUrl}/Mobintixtheme.png`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={fullImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
            {children}
        </Helmet>
    );
};

export default SEO;
