interface HTMLElementRect {
	node: HTMLElement
	rect: DOMRect
}

export interface FlipOptions {
	enableX: boolean
	enableY: boolean
	enableWidth: boolean
	enableHeight: boolean
}

export class Flip {
	elements: HTMLElementRect[]

	constructor() {
		this.elements = []
	}

	save(element: HTMLElement) {
		this.elements = []
		element.childNodes.forEach(node => {
			if (node instanceof HTMLElement)
				this.elements.push({
					node: node,
					rect: node.getBoundingClientRect()
				})
		})
	}

	play(keyframeOptions: KeyframeAnimationOptions, flipOptions?: FlipOptions) {
		this.elements.forEach(pair => {
			const startPos = pair.rect
			const endPos = pair.node.getBoundingClientRect()
			if (endPos.width && endPos.height) {
				const deltaX = (!flipOptions || flipOptions.enableX) ? startPos.x - endPos.x : 0
				const deltaY = (!flipOptions || flipOptions.enableY) ? startPos.y - endPos.y : 0
				const scaleW = (!flipOptions || flipOptions.enableWidth) ? startPos.width / endPos.width : 1
				const scaleH = (!flipOptions || flipOptions.enableHeight) ? startPos.height / endPos.height : 1
				if (pair.node.animate && (deltaX || deltaY || scaleW || scaleH))
					pair.node.animate([{
						transformOrigin: 'top left',
						transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleW}, ${scaleH})`
					}, {
						transformOrigin: 'top left',
						transform: 'none'
					}], { ...keyframeOptions, fill: 'both' })
			}
		})
	}
}
