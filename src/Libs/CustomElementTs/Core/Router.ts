export declare type RouterMode = 'history' | 'hash'

export interface Route {
	path: string
	controller: (...args: any[]) => void
}

export interface RouterParameters {
	mode?: RouterMode
	routes?: Route[]
}

export class Router {
	routes: Route[]
	root: string
	_mode: RouterMode
	currentFragment: string | null

	constructor(config: RouterParameters) {
		this.routes = []
		this.root = '/'
		this._mode = config.mode || !!(history.pushState) ? 'history' : 'hash'
		this.currentFragment = null
		if (config.routes)
			config.routes.forEach(route => this.addRoute(route))
	}

	set mode(mode: RouterMode) {
		this._mode = !!(history.pushState) ? mode : 'hash'
	}

	get mode(): RouterMode {
		return this._mode
	}

	clearSlashes(path: string): string {
		return path.toString().replace(/\/$/, '').replace(/^\//, '')
	}

	getFragment(): string {
		let fragment = ''
		if (this._mode === 'history') {
			fragment = this.clearSlashes(decodeURI(location.pathname + location.search))
			fragment = fragment.replace(/\?(.*)$/, '')
			fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment
		} else {
			const match = window.location.href.match(/#(.*)$/)
			fragment = match ? match[1] : ''
		}
		return this.clearSlashes(fragment)
	}

	openFragment(fragment: string): void {
		for (let i = 0; i < this.routes.length; ++i) {
			const route = this.routes[i]
			let match = fragment.match('^' + route.path + '$')
			if (match) {
				match.shift()
				route.controller.apply({}, match)
			}
		}
	}

	addRoute(route: Route): void {
		this.routes.push(route)
	}

	removeRoute(path: string): void {
		for (let i = 0; i < this.routes.length; ++i) {
			const route = this.routes[i]
			if (path.toString() === route.path.toString())
				this.routes.splice(i, 1)
		}
	}

	check(path: string): boolean {
		const fragment = this.getFragment()
		return (fragment.match('^' + path + '$') != null)
	}

	listen(): void {
		const updateRoute = () => {
			if (this.currentFragment !== this.getFragment()) {
				this.currentFragment = this.getFragment()
				this.openFragment(this.currentFragment)
			}
		}
		updateRoute()
		window.addEventListener('popstate', updateRoute.bind(this))
	}

	navigate(path: string): void {
		if (this._mode === 'history')
			history.pushState(null, '', this.root + this.clearSlashes(path))
		else
			window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path
		if (this.currentFragment !== this.getFragment()) {
			this.currentFragment = this.getFragment()
			this.openFragment(this.currentFragment)
		}
	}
}
