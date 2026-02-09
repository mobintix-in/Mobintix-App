import React from 'react';

interface OptimizedImageProps {
    src: string; // Path to PNG/JPG image (e.g., "/logo.png")
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    loading?: 'lazy' | 'eager';
    priority?: boolean; // If true, preloads the image
}

/**
 * OptimizedImage Component
 * 
 * Automatically serves WebP images with PNG/JPG fallback for maximum performance.
 * 
 * Usage:
 * ```tsx
 * <OptimizedImage 
 *   src="/mobintixlogo.png" 
 *   alt="Mobintix Logo"
 *   loading="lazy"
 * />
 * ```
 * 
 * This will automatically try to load:
 * 1. /mobintixlogo.webp (if browser supports WebP)
 * 2. /mobintixlogo.png (fallback for older browsers)
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    width,
    height,
    loading = 'lazy',
    priority = false,
}) => {
    // Convert image path to WebP version
    const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    // If priority is set, use eager loading and add preload
    const loadingStrategy = priority ? 'eager' : loading;

    return (
        <>
            {priority && (
                <>
                    <link rel="preload" as="image" href={webpSrc} type="image/webp" />
                    <link rel="preload" as="image" href={src} />
                </>
            )}
            <picture>
                <source srcSet={webpSrc} type="image/webp" />
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    width={width}
                    height={height}
                    loading={loadingStrategy}
                />
            </picture>
        </>
    );
};

export default OptimizedImage;
