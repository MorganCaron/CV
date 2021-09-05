import Nootstrap from 'nootstrap-ui'
import { Component, Flip, Router } from 'custom-element-ts'
import './Layouts'

import html from './App.html'

@Component({
	selector: 'app-main',
	template: html
})
class App extends HTMLElement {

	private m_router: Router = new Router({
		mode: 'hash'
	})
	private m_flipLeft: Flip = new Flip()
	private m_flipRight: Flip = new Flip()

	private beforePageChanging() {
		const leftColumn = this.querySelector('hr + .container .col-md-8')
		const rightColumn = this.querySelector('hr + .container .col-md-4 section')
		if (leftColumn) this.m_flipLeft.save(leftColumn as HTMLElement)
		if (rightColumn) this.m_flipRight.save(rightColumn as HTMLElement)
	}

	private afterPageChanging() {
		const keyframeOptions = { duration: 500, easing: 'ease-in-out' }
		const flipOptions = { enableX: false, enableY: true, enableWidth: false, enableHeight: false }
		//this.m_flipLeft.play(keyframeOptions, flipOptions)
		this.m_flipRight.play(keyframeOptions, flipOptions)
	}

	connected() {
		const routes = ["", "software", "web"]
		this.m_router.addRoute({
			path: 'CV\\/?((.*))?',
			controller: (...parameters: string[]) => {
				console.log(parameters)
				const route = (parameters?.length > 0 && parameters[0]) ? parameters[0] : ''
				console.log(route)
				this.beforePageChanging()
				const style = this.querySelector("#style")
				if (!style) return;
				style.innerHTML = (route === "") ? "section.all, section.software, section.web, article.all, article.software, article.web { display: block; } span.all, span.software, span.web, li.all, li.software, li.web { display: inline; }" : `section.${route}, article.${route} { display: block; } span.${route}, li.${route} { display: inline; }`
				this.afterPageChanging()
			}
		})

		this.querySelector('#filter')?.addEventListener('change', (event: any) => {
			const filter = event.target.options[event.target.selectedIndex].value
			this.m_router.navigate('CV/' + (filter !== 'all' ? filter : ''))
		}, false)

		this.m_router.listen()
	}

}

window.addEventListener('load', () => {
	const nootstrap = new Nootstrap()
}, false)
