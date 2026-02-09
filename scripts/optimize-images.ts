import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const PUBLIC_DIR = './public';
const BACKUP_DIR = './public/originals';
const MAX_WIDTH = 1920; // Maximum width for images
const QUALITY = {
    png: 80,
    jpg: 85,
    webp: 85,
};

interface OptimizationResult {
    file: string;
    originalSize: number;
    optimizedSize: number;
    webpSize?: number;
    savings: number;
}

async function getFileSize(filePath: string): Promise<number> {
    const stats = await stat(filePath);
    return stats.size;
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function optimizeImage(filePath: string): Promise<OptimizationResult | null> {
    const ext = extname(filePath).toLowerCase();

    // Only process image files
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
        return null;
    }

    const fileName = basename(filePath);
    const fileNameWithoutExt = basename(filePath, ext);

    console.log(`\n🔄 Processing: ${fileName}`);

    try {
        const originalSize = await getFileSize(filePath);
        console.log(`   Original size: ${formatBytes(originalSize)}`);

        // Create backup directory if it doesn't exist
        if (!existsSync(BACKUP_DIR)) {
            await mkdir(BACKUP_DIR, { recursive: true });
        }

        // Backup original file
        const backupPath = join(BACKUP_DIR, fileName);
        const image = sharp(filePath);
        const metadata = await image.metadata();

        // Optimize and resize if needed
        const shouldResize = metadata.width && metadata.width > MAX_WIDTH;
        let optimizedImage = sharp(filePath);

        if (shouldResize) {
            console.log(`   ⚠️  Resizing from ${metadata.width}px to ${MAX_WIDTH}px`);
            optimizedImage = optimizedImage.resize(MAX_WIDTH, null, {
                fit: 'inside',
                withoutEnlargement: true,
            });
        }

        // Save backup
        await sharp(filePath).toFile(backupPath);
        console.log(`   💾 Backup saved to: ${backupPath}`);

        // Optimize based on format
        if (ext === '.png') {
            await optimizedImage
                .png({ quality: QUALITY.png, compressionLevel: 9 })
                .toFile(filePath + '.tmp');
        } else {
            await optimizedImage
                .jpeg({ quality: QUALITY.jpg, progressive: true })
                .toFile(filePath + '.tmp');
        }

        // Replace original with optimized
        const { rename, unlink } = await import('fs/promises');
        await unlink(filePath);
        await rename(filePath + '.tmp', filePath);

        const optimizedSize = await getFileSize(filePath);
        console.log(`   ✅ Optimized size: ${formatBytes(optimizedSize)}`);

        // Create WebP version
        const webpPath = join(PUBLIC_DIR, fileNameWithoutExt + '.webp');
        await sharp(filePath)
            .webp({ quality: QUALITY.webp })
            .toFile(webpPath);

        const webpSize = await getFileSize(webpPath);
        console.log(`   🎨 WebP version: ${formatBytes(webpSize)} (saved to ${fileNameWithoutExt}.webp)`);

        const savings = ((originalSize - optimizedSize) / originalSize) * 100;

        return {
            file: fileName,
            originalSize,
            optimizedSize,
            webpSize,
            savings,
        };
    } catch (error) {
        console.error(`   ❌ Error processing ${fileName}:`, error);
        return null;
    }
}

async function optimizeAllImages() {
    console.log('🚀 Starting image optimization...\n');
    console.log(`📁 Scanning directory: ${PUBLIC_DIR}\n`);

    const results: OptimizationResult[] = [];

    try {
        const files = await readdir(PUBLIC_DIR);

        for (const file of files) {
            const filePath = join(PUBLIC_DIR, file);
            const stats = await stat(filePath);

            if (stats.isFile()) {
                const result = await optimizeImage(filePath);
                if (result) {
                    results.push(result);
                }
            }
        }

        // Print summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 OPTIMIZATION SUMMARY');
        console.log('='.repeat(60) + '\n');

        let totalOriginal = 0;
        let totalOptimized = 0;
        let totalWebp = 0;

        results.forEach((result) => {
            totalOriginal += result.originalSize;
            totalOptimized += result.optimizedSize;
            totalWebp += result.webpSize || 0;

            console.log(`${result.file}:`);
            console.log(`  Original:  ${formatBytes(result.originalSize)}`);
            console.log(`  Optimized: ${formatBytes(result.optimizedSize)} (${result.savings.toFixed(1)}% smaller)`);
            console.log(`  WebP:      ${formatBytes(result.webpSize || 0)}\n`);
        });

        const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal) * 100;

        console.log('='.repeat(60));
        console.log('💰 TOTAL SAVINGS:');
        console.log(`   Original total:  ${formatBytes(totalOriginal)}`);
        console.log(`   Optimized total: ${formatBytes(totalOptimized)}`);
        console.log(`   WebP total:      ${formatBytes(totalWebp)}`);
        console.log(`   Savings:         ${formatBytes(totalOriginal - totalOptimized)} (${totalSavings.toFixed(1)}%)`);
        console.log('='.repeat(60));

        console.log('\n✨ Optimization complete!');
        console.log(`📦 ${results.length} images optimized`);
        console.log(`💾 Original files backed up to: ${BACKUP_DIR}`);

    } catch (error) {
        console.error('❌ Error during optimization:', error);
        process.exit(1);
    }
}

// Run the optimization
optimizeAllImages().catch(console.error);
