import { Component } from '@/Libs/CustomElementTs'

import html from './index.html?raw'

@Component({
	selector: 'app-footer',
	template: html
})
export class Footer extends HTMLElement { }
