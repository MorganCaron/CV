import { Component } from 'custom-element-ts'

import css from '!!raw-loader!./style.css'

@Component({
	selector: 'app-terminal',
	style: css
})
export class Terminal extends HTMLElement {

	public write(line: string): void {
		const newLine = document.createElement('div')
		newLine.setAttribute('class', 'line')
		newLine.innerText = line
		this.appendChild(newLine)
	}

	public rewrite(line: string): void {
		const lastLine = this.querySelector('div:last-child')
		if (lastLine)
			lastLine.innerHTML = line
		else
			this.write(line)
	}
}
