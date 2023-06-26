import { Component } from '@/Libs/CustomElementTs'

import html from './index.html?raw'

@Component({
	selector: 'page-about',
	template: html
})
export class About extends HTMLElement {
}
