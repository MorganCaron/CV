class Nootstrap {
	constructor() {
		document.body.style.setProperty('--mouse-x', `-1000px`)
		document.body.style.setProperty('--mouse-y', `-1000px`)

		this.updateParallax()

		window.addEventListener('resize', this.onWindowResize.bind(this), false)
		window.addEventListener('scroll', this.onWindowScroll.bind(this), false)
		window.addEventListener('mousemove', this.onMouseMove.bind(this), false)
		document.body.addEventListener('mouseleave', this.onMouseLeave.bind(this), false)
		document.querySelectorAll('*[trigger-target]').forEach(button => button.addEventListener('click', event => this.onTriggerClick(button, event), false))
	}

	private updateParallax(): void {
		document.querySelectorAll('.parallax').forEach(parallax => {
			const parallaxTop = parallax.getBoundingClientRect().top
			const parallaxLeft = parallax.getBoundingClientRect().left
			const background = parallax.querySelector('.parallax-background')
			background?.setAttribute('style', 'left: ' + -parallaxLeft + 'px; top: ' + -parallaxTop / 2 + 'px;')
		})
	}

	private onWindowResize(): void {
		this.updateParallax()
	}

	private onWindowScroll(): void {
		this.updateParallax()
	}

	private onMouseMove(event: MouseEvent): void {
		document.body.style.setProperty('--mouse-x', `${event.pageX}`)
		document.body.style.setProperty('--mouse-y', `${event.pageY}`)
	}

	private onMouseLeave(): void {
		document.body.style.setProperty('--mouse-x', `${window.innerWidth / 2}`)
		document.body.style.setProperty('--mouse-y', `${window.innerHeight / 2}`)
	}

	private onTriggerClick(element: Element, event: Event): void {
		if (element.hasAttribute('preventDefault'))
			event.preventDefault()
		if (!element.hasAttribute('trigger-target'))
			return;
		const targetSelector = element.getAttribute('trigger-target')
		const targets = document.querySelectorAll(targetSelector as string)
		const addClass = element.getAttribute('add-class')?.split(' ')
		const removeClass = element.getAttribute('remove-class')?.split(' ')
		const toggleClass = element.getAttribute('toggle-class')?.split(' ')
		targets.forEach(target => {
			if (addClass) addClass.forEach(classname => target.classList.add(classname))
			if (removeClass) removeClass.forEach(classname => target.classList.remove(classname))
			if (toggleClass) toggleClass.forEach(classname => target.classList.toggle(classname))
		})
	}
}

export default Nootstrap
