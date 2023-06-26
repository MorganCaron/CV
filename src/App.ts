import { Component, RouterComponent } from '@/Libs/CustomElementTs'
import Nootstrap from '@/Libs/Nootstrap'

import { Home, Projects, CV, About } from './Pages'

import '@/Layouts'
import './style.sass'

import html from './App.html?raw'

const nootstrap = new Nootstrap()

@Component({
	selector: 'app-main',
	classes: "scroll-snap-proximity",
	template: html
})
class App extends HTMLElement {

	connected() {
		this.initRouter()
	}

	private initRouter(): void {
		const router = this.querySelector<RouterComponent>('app-router')!
		router.mode = 'hash';

		Array(
			{ path: '', component: Home },
			{ path: 'projects', component: Projects },
			{ path: 'cv', component: CV },
			{ path: 'about', component: About }
		).forEach(route => router.addRoute(route))
		router.listen()
	}
}
