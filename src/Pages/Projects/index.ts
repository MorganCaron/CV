import { Component } from '@/Libs/CustomElementTs'

import html from './index.html?raw'

@Component({
	selector: 'page-projects',
	classes: 'd-block',
	template: html
})
export class Projects extends HTMLElement {
}
