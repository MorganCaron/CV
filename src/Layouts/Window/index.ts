import { Component, Attribute } from '@/Libs/CustomElementTs'

import html from './index.html?raw'

@Component({
	selector: 'app-window',
	template: html,
	removeContent: true
})
export class Window extends HTMLElement {

	@Attribute()
	public caption: string = ''

	@Attribute()
	private moving: boolean

	@Attribute()
	private resizing: boolean

	@Attribute()
	private canResize: boolean

	private canMove: boolean
	private anchorX: number = 0
	private anchorY: number = 0

	private minWidth: number
	private minHeight: number

	constructor(canMove: boolean, canResize: boolean, x: string = '5rem', y: string = '5rem') {
		super()
		this.moving = false
		this.resizing = false
		this.canMove = canMove
		this.canResize = canResize
		this.minWidth = 300
		this.minHeight = 150
		this.style.left = x
		this.style.top = y
		this.style.minWidth = this.minWidth + 'px'
		this.style.minHeight = this.minHeight + 'px'
		this.style.maxWidth = '100%'
		this.style.maxHeight = '100%'
	}

	connected() {
		this.addEventListener('mousedown', this.setFocus.bind(this), false)
		document.addEventListener('mouseup', this.unsetFocus.bind(this), false)

		const header = this.querySelector('header')
		header?.addEventListener('mousedown', this.moveGrab.bind(this), false)
		document.addEventListener('mousemove', this.drag.bind(this), false)
		document.addEventListener('mouseup', this.drop.bind(this), false)

		this.querySelector('button.resize')?.addEventListener('mousedown', this.resizeGrab.bind(this), false)

		header?.querySelector('.minimize')?.addEventListener('mouseup', this.minimize.bind(this), false)
		header?.querySelector('.expand')?.addEventListener('mouseup', this.expand.bind(this), false)
		header?.querySelector('.close')?.addEventListener('mouseup', this.close.bind(this), false)
	}

	public setFocus(): void {
		this.style.zIndex = '3'
	}

	public unsetFocus(): void {
		this.moving = false
	}

	private moveGrab(event: MouseEvent): void {
		if (!this.canMove) return;
		const domRect = this.getBoundingClientRect()
		this.moving = true
		this.anchorX = event.clientX - domRect.left
		this.anchorY = event.clientY - domRect.top
	}

	private drag(event: MouseEvent): void {
		const selfRect = this.getBoundingClientRect()
		if (this.moving) {
			const parentRect = this.parentElement?.getBoundingClientRect()
			if (parentRect) {
				this.style.left = Math.min(Math.max(parentRect.left, event.clientX - this.anchorX), parentRect.right - selfRect.width) + 'px'
				this.style.top = Math.min(Math.max(parentRect.top, event.clientY - this.anchorY), parentRect.bottom - selfRect.height) + 'px'
			}
		}
		else if (this.resizing) {
			this.style.width = String(Math.max(this.minWidth, event.clientX - selfRect.left)) + 'px'
			this.style.height = String(Math.max(this.minHeight, event.clientY - selfRect.top)) + 'px'
		}
	}

	private drop(): void {
		this.moving = false
		this.resizing = false
	}

	private resizeGrab(): void {
		this.resizing = this.canResize
	}

	public minimize(): void {

	}

	public expand(): void {

	}

	public close(): void {
		this.animate([
			{ opacity: 1, transform: 'translateY(0) scale(1)' },
			{ opacity: 0, transform: 'translateY(5rem) scale(.5)' }
		], {
			duration: 200,
			easing: 'ease-out',
			iterations: 1
		})
		setTimeout(() => {
			this.parentElement?.removeChild(this)
		}, 200)
	}

}
