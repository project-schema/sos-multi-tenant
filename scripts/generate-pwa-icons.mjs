/**
 * Generates placeholder PWA icons for local development and initial deployment.
 * Replace these with your branded assets before production launch.
 *
 * Usage: node scripts/generate-pwa-icons.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'public', 'icons');
const screenshotsDir = join(__dirname, '..', 'public', 'screenshots');

const BRAND_COLOR = '#0060eb';
const TEXT_COLOR = '#ffffff';

async function generateWithSharp() {
	try {
		const sharp = require('sharp');

		const createIcon = async (size, filename, maskable = false) => {
			const padding = maskable ? Math.round(size * 0.2) : Math.round(size * 0.15);
			const innerSize = size - padding * 2;
			const fontSize = Math.round(innerSize * 0.28);

			const svg = `
				<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
					<rect width="${size}" height="${size}" fill="${BRAND_COLOR}" rx="${maskable ? Math.round(size * 0.2) : Math.round(size * 0.12)}"/>
					<text
						x="50%"
						y="54%"
					 dominant-baseline="middle"
					 text-anchor="middle"
					 fill="${TEXT_COLOR}"
					 font-family="Arial, Helvetica, sans-serif"
					 font-size="${fontSize}"
					 font-weight="700"
					>SOS</text>
				</svg>
			`;

			await sharp(Buffer.from(svg)).png().toFile(join(iconsDir, filename));
		};

		await mkdir(iconsDir, { recursive: true });
		await createIcon(192, 'icon-192.png');
		await createIcon(512, 'icon-512.png');
		await createIcon(512, 'icon-maskable-512.png', true);

		const createScreenshot = async (width, height, filename, label) => {
			const fontSize = Math.round(Math.min(width, height) * 0.06);
			const svg = `
				<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
					<rect width="${width}" height="${height}" fill="#f8fafc"/>
					<rect x="0" y="0" width="${width}" height="${Math.round(height * 0.12)}" fill="${BRAND_COLOR}"/>
					<text
						x="50%"
						y="58%"
						dominant-baseline="middle"
						text-anchor="middle"
						fill="${BRAND_COLOR}"
						font-family="Arial, Helvetica, sans-serif"
						font-size="${fontSize}"
						font-weight="700"
					>${label}</text>
				</svg>
			`;

			await sharp(Buffer.from(svg))
				.png()
				.toFile(join(screenshotsDir, filename));
		};

		await mkdir(screenshotsDir, { recursive: true });
		await createScreenshot(390, 844, 'mobile.png', 'SOS Mobile');
		await createScreenshot(1280, 720, 'desktop-wide.png', 'SOS Desktop');

		console.log('PWA icons and screenshots generated with sharp.');
		return true;
	} catch {
		return false;
	}
}

async function generateMinimalPngFallback() {
	await mkdir(iconsDir, { recursive: true });

	// Minimal valid 1x1 PNG (brand blue) — replace with real branded icons.
	const minimalPng = Buffer.from(
		'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
		'base64',
	);

	await writeFile(join(iconsDir, 'icon-192.png'), minimalPng);
	await writeFile(join(iconsDir, 'icon-512.png'), minimalPng);
	await writeFile(join(iconsDir, 'icon-maskable-512.png'), minimalPng);

	console.log(
		'Created minimal placeholder PNG icons. Install sharp for branded icons: npm i -D sharp',
	);
}

const usedSharp = await generateWithSharp();
if (!usedSharp) {
	await generateMinimalPngFallback();
}
