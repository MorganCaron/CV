import { Component } from '../Utils'

@Component({
	selector: 'tilted-block',
	classes: 'm-0 mt-3 ml-3 tilt-right-3',
	extends: 'h2'
})
export class TiltedBlock extends HTMLHeadingElement {

	baseContent: string = ''

	connected() {
		this.innerHTML = `<span>${this.baseContent}</span>`
	}

}
