import { Component } from '..'
import { WebGLRenderer } from 'three'

@Component({
	selector: 'three-context',
	style: 'three-context { display: block; position: relative; width: 100%; height: 100%; overflow: overlay; } three-context > canvas { position: fixed; z-index: -1; top: 0; left: 0; right: 0; bottom: 0; }'
})
class ThreeContext extends HTMLElement {

	public renderer: WebGLRenderer = new WebGLRenderer({
		alpha: false,
		antialias: true
	})

	public aspectRatio: number = 1

	private resizeObserver: ResizeObserver = new ResizeObserver(elements => elements.forEach(element => this.onResize()))

	private onResizeCallbacks: (() => void)[] = []

	public connected() {
		this.onResize()
		this.renderer.shadowMap.enabled = true
		this.renderer.autoClear = true
		this.prepend(this.renderer.domElement)
		this.resizeObserver.observe(this)
	}

	public onResize() {
		this.aspectRatio = this.offsetWidth / this.offsetHeight
		this.renderer.setSize(this.offsetWidth, this.offsetHeight)
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		this.onResizeCallbacks.forEach(callback => callback())
	}

	public onResizeCall(callback: () => void) {
		this.onResizeCallbacks.push(callback)
	}
}

export { ThreeContext }
