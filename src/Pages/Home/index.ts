import { Component } from '@/Libs/CustomElementTs'

import html from './index.html?raw'

@Component({
	selector: 'page-home',
	classes: 'd-block',
	template: html
})
export class Home extends HTMLElement {
}
