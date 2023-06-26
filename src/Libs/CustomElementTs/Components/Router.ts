import { Component } from '../Core/Component'
import { Router, RouterMode } from '../Core/Router'
import { Type } from '../Core/Utils'

interface ComponentRoute {
	path: string
	component: Type<HTMLElement>
}

@Component({
	selector: 'app-router'
})
class RouterComponent extends HTMLElement {

	router: Router = new Router({
		mode: 'hash'
	})

	beforePageChanging: (() => void) | null = null
	afterPageChanging: (() => void) | null = null

	set mode(mode: RouterMode) {
		this.router.mode = mode
	}

	get mode(): RouterMode {
		return this.router.mode
	}

	addRoute(route: ComponentRoute): void {
		this.router.addRoute({
			path: route.path,
			controller: (...parameters: any[]) => {
				if (this.beforePageChanging !== null) this.beforePageChanging()
				this.innerHTML = ''
				this.appendChild(new route.component(parameters))
				if (this.afterPageChanging !== null) this.afterPageChanging()
			}
		})
	}

	removeRoute(path: string): void {
		this.router.removeRoute(path)
	}

	listen(): void {
		this.router.listen()
	}

	navigate(path: string = ''): void {
		this.router.navigate(path)
	}

}

export { RouterComponent, ComponentRoute }
