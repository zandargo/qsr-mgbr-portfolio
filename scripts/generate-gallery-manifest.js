import { readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const galleryDir = join(process.cwd(), 'public', 'img', 'gallery')
const manifestPath = join(galleryDir, 'manifest.json')
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']

async function generateManifest() {
	try {
		const entries = await readdir(galleryDir, { withFileTypes: true })
		const files = entries
			.filter((entry) => entry.isFile())
			.map((entry) => entry.name)
			.filter((name) => allowedExtensions.includes(name.slice(name.lastIndexOf('.')).toLowerCase()))
			.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

		await writeFile(manifestPath, JSON.stringify(files, null, 2), 'utf8')
		console.log(`Generated gallery manifest with ${files.length} images.`)
	}
	catch (error) {
		console.error('Could not generate gallery manifest:', error)
		process.exit(1)
	}
}

generateManifest()
