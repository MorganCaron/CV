import { Component, Attribute, Writer, WriterOptions } from 'custom-element-ts'

import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'app-taskbar',
	template: html,
	style: css,
	removeContent: true
})
export class Taskbar extends HTMLElement {

	@Attribute()
	h1: string = ''

	@Attribute()
	date: string = ''

	@Attribute()
	time: string = ''

	connected() {
		this.h1 = `Hello World !`
		const writerOptions: WriterOptions = {
			interval: 100,
			replace: true,
			update: this.updateHeader.bind(this)
		}
		const writerHelloWorld = (oldString: string) => Writer.write(oldString, 'Hello World !', writerOptions, (newString: string) => setTimeout(writerWelcome, 2000, newString))
		const writerWelcome = (oldString: string) => Writer.write(oldString, 'Welcome to my Devblog', writerOptions, (newString: string) => setTimeout(writerCustomElementTs, 5000, newString))
		const writerCustomElementTs = (oldString: string) => Writer.write(oldString, 'Take a seat and enjoy 🥳', writerOptions, (newString: string) => setTimeout(randomCrab(), 3000, newString))
		const randomThenElse = <ReturnType>(probability: number, a: ReturnType, b: ReturnType): ReturnType => (Math.floor(Math.random() * probability) === 0 ? a : b)
		const randomCrab = () => randomThenElse(30, writerCrab, randomThenElse(100, writerCrabs, writerVoid))
		const writerCrab = (oldString: string) => Writer.write(oldString, 'Watch out, a crab! 🦀', writerOptions, (newString: string) => setTimeout(writerVoid, 3000, newString))
		const writerCrabs = (oldString: string) => Writer.write(oldString, '🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀[0x43708F KernelError%]', writerOptions, (newString: string) => setTimeout(writerVoid, 3000, newString))
		const writerVoid = (oldString: string) => Writer.write(oldString, ' ', writerOptions, writerHelloWorld)
		setTimeout(writerWelcome, 2000, this.h1)

		setInterval(() => {
			this.updateDatetime()
		}, 1000)
		this.updateDatetime()
	}

	private updateHeader(newString: string): void {
		this.h1 = newString
	}

	private updateDatetime(): void {
		const now = new Date()
		this.date = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`
		this.time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
	}
}
