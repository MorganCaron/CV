const degtorad = (degrees: number): number => degrees * Math.PI / 180
const radtodeg = (radians: number): number => radians * 180 / Math.PI
const randomInt = (integer: number): number => Math.floor((integer + 1) * Math.random())

const convertToGlitchCanvas = (image: Element): void => {
	const parentNode = image.parentNode
	const width = image.clientWidth
	const height = image.clientHeight
	const src = image.getAttribute('src')

	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	parentNode.replaceChild(canvas, image)

	const context = canvas.getContext('2d')

	let distance = 0
	let angle = 0
	let segmented = 0
	let separated = 0
	const luck = 50

	const glitchImage = () => {
		const time = Date.now()
		context.clearRect(0, 0, width, height)

		if (!distance) {
			if (!randomInt(7 * luck))
				distance = Math.random() * Math.min(width, height)
		}
		else if (!randomInt(luck)) {
			const i: number = randomInt(2) - 1
			distance = (i != 0) * (distance + i)
		}

		if (!angle) {
			if (!randomInt(2 * luck))
				angle = Math.random() * 360
		}
		else if (!randomInt(luck)) {
			const i: number = randomInt(2) - 1
			angle = (i != 0) * (angle + i * 10)
		}
		angle += 0.3

		if (!segmented) {
			if (!randomInt(5 * luck))
				segmented = 5 + Math.random() * 10
		}
		else if (!randomInt(luck)) {
			const i: number = randomInt(2) - 1
			segmented = (i != 0) * (segmented + i) + (i == 0) * (5 + Math.random() * 10)
		}
		else if (!randomInt(3 * luck))
			segmented = 0

		if (!separated) {
			if (!randomInt(5 * luck))
				separated = 5 + Math.random() * 5
		}
		else if (!randomInt(luck)) {
			const i: number = randomInt(2) - 1
			separated = (i != 0) * (separated + i + (i > 0)) + (i == 0) * (5 + Math.random() * 5)
		}
		else if (!randomInt(3 * luck))
			separated = 0

		let x = distance * Math.cos(degtorad(angle))
		let y = distance * Math.sin(degtorad(angle))

		for (let i = -1; i < 2; i += 1)
			for (let j = -1; j < 2; j += 1)
				context.drawImage(image as CanvasImageSource, i * width + x, j * height + y, width, height)

		for (i = 0; i < Math.round(segmented); i += 1) {
			let sx = width * Math.abs(Math.sin(segmented / 15 + i * 5.6531) + time)
			let sy = height * Math.abs(Math.sin(segmented / 15 + i * 7.1451) + time)
			let w = (width - sx) * 0.5 + Math.abs(Math.sin(segmented / 15 + i * 3.6478) - time) / 2
			let h = 15 * Math.abs(Math.sin(segmented / 15 + i * 2.3854) + time)
			let dx = (width - w / 2) * Math.abs(Math.sin(segmented / 15 + i * 9.1402) + time)
			let dy = (height - h / 2) * Math.abs(Math.sin(segmented / 15 + i * 5.6043) + time)
			context.drawImage(image as CanvasImageSource, sx, sy, w, h, dx, dy, w, h)
		}

		if (separated) {
			let r = distance + angle + segmented
			r = 10 * Math.abs(Math.sin(separated / 10 + r * 5.5608))
			context.globalCompositeOperation = 'difference'
			for (let i: number = -1; i < 2; i += 1) for (let j = -1; j < 2; j += 1)
				context.drawImage(image as CanvasImageSource, i * width + 20 * Math.abs(Math.sin(separated / 10 + r / 2.1524)), j * height + 5 * Math.abs(Math.sin(separated / 10 + r * 6.8025)), width, height)
			for (let i: number = -1; i < 2; i += 1) for (let j = -1; j < 2; j += 1)
				context.drawImage(image as CanvasImageSource, i * width + 20 * Math.abs(Math.sin(separated / 10 + r / 5.4098)), j * height + 5 * Math.abs(Math.sin(separated / 10 + r * 8.0678)), width, height)
			context.globalCompositeOperation = 'normal'
		}

		requestAnimationFrame(glitchImage)
	}

	glitchImage()
}

window.addEventListener('load', () => {
	document.querySelectorAll('img.glitch').forEach((image: Element) => convertToGlitchCanvas(image))
}, false)
