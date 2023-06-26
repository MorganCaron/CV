import { Component, Attribute, Writer, WriterOptions } from '@/Libs/CustomElementTs'

import html from './index.html?raw'

@Component({
	selector: 'app-header',
	classes: 'w-100 h-100 align-center select-none',
	template: html
})
export class Header extends HTMLElement {

	@Attribute()
	public h1: string = ''

	@Attribute()
	public h2: string = ''

	private timeouts: number[] = []

	connected() {
		this.initWriter()
		this.initMenu()

		if (typeof screen.orientation !== 'undefined') {
			document.addEventListener('mousemove', this.onMouseMove.bind(this))
			document.body.addEventListener('mouseleave', this.onMouseMove.bind(this))
		}
	}

	private disconnected(): void {
		this.timeouts.forEach(timeout => clearTimeout(timeout))
	}

	private addTimeouts(timeouts: number[]): void {
		this.timeouts = [...this.timeouts, ...timeouts]
		while (this.timeouts.length >= 100)
			this.timeouts.shift()
	}

	private initWriter(): void {
		const writerH1Options: WriterOptions = {
			interval: 70,
			replace: true,
			update: this.updateH1.bind(this)
		}
		const writerH2Options: WriterOptions = {
			interval: 50,
			replace: true,
			update: this.updateH2.bind(this)
		}
		const writerHelloWorld = () => this.addTimeouts(Writer.write(this.h1, 'Hello World !', writerH1Options, () => this.addTimeouts([setTimeout(writerHTMLMark, 1000)])))
		const writerHTMLMark = () => this.addTimeouts(Writer.write(this.h1, '</>', writerH1Options, writerUserName))
		const writerUserName = () => this.addTimeouts(Writer.write(this.h1, '<I\'m Morgan/>', writerH1Options, () => this.addTimeouts([setTimeout(writerImMorgan, 1000)])))
		const writerImMorgan = () => this.addTimeouts(Writer.write(this.h1, 'I\'m Morgan', writerH1Options, writerWelcome))
		const writerWelcome = () => this.addTimeouts(Writer.write(this.h2, 'Welcome to my website', writerH2Options, () => {
			this.addTimeouts([setTimeout(writerMorgan, 5000)])
			this.addTimeouts([setTimeout(writerImDev, 6000)])
		}))
		const writerMorgan = () => this.addTimeouts(Writer.write(this.h1, 'Morgan', writerH1Options, writerMorganCaron))
		const writerMorganCaron = () => this.addTimeouts(Writer.write(this.h1, 'Morgan Caron', writerH1Options, () => {
			this.addTimeouts([setTimeout(writerClearH1, 15000)])
			this.addTimeouts([setTimeout(writerClearH2, 15000)])
		}))
		const writerImDev = () => this.addTimeouts(Writer.write(this.h2, 'Software and Web developer', writerH2Options))
		const writerClearH1 = () => this.addTimeouts(Writer.write(this.h1, '', writerH1Options, writerHelloWorld))
		const writerClearH2 = () => this.addTimeouts(Writer.write(this.h2, '', writerH2Options))
		this.addTimeouts([setTimeout(writerHelloWorld, 0)])
	}

	private initMenu(): void {
		const router = document.querySelector('app-router') as RouterComponent
		this.querySelectorAll('a.page').forEach(button => {
			const href = button.getAttribute('href') || ''
			button.addEventListener("click", (event) => {
				event.preventDefault()
				router.navigate(href)
			})
		})
	}

	private updateH1(newString: string) {
		this.h1 = newString
		this.querySelector('h1').innerHTML = newString
	}

	private updateH2(newString: string) {
		this.h2 = newString
		this.querySelector('h2').innerHTML = newString
	}

	private onMouseMove(event: MouseEvent): void {
		const mouseX: number = parseInt(document.body.style.getPropertyValue('--mouse-x')) | 0
		const mouseY: number = (parseInt(document.body.style.getPropertyValue('--mouse-y')) | 0)

		const x = Math.min(Math.max(-1, ((mouseX / window.innerWidth) - 0.5) * 2), 1)
		const y = Math.min(Math.max(-1, ((mouseY / window.innerHeight) - 0.5) * 2), 1)

		const factor = .2
		const angleX = (-y * factor) * 90
		const angleY = (x * factor) * 90

		this.querySelector('.mouse-oriented').style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`
	}
}
