import { findVariablesInHTMLElement, setVariablesInNodes } from './Template'
import { Type, recordToArray, flatify } from './Utils'

export interface ComponentOptions {
	selector: string
	classes?: string
	attributes?: object
	extends?: string
	template?: string
	removeContent?: boolean
	style?: string
	useShadow?: boolean
	shadowMode?: 'open' | 'closed'
}

// Component decorator
export const Component = (options: ComponentOptions) => {
	// Custom element prerequisite
	if (options.selector.indexOf('-') <= 0) throw new Error('You need at least 1 dash in the component element name.')

	// Set default values for missing attributes
	options = {
		attributes: {},
		removeContent: false,
		useShadow: false,
		shadowMode: 'open',
		...options
	}

	// Create a template for the custom element content
	const template = document.createElement('template')
	template.innerHTML = (options.style ? `<style>${options.style}</style>` : '') + (options.template ?? '')

	return <T extends Type<HTMLElement>>(component: T) => {

		component.prototype.connectedCallback = function() {
			// Save and remove the base content
			this.baseContent = this.innerHTML
			if (options.removeContent)
				this.innerHTML = ''
			
			// Add classes on custom element
			let classes = options.classes || ''
			const externalClasses = this.getAttribute('class')
			if (classes && externalClasses) {
				classes += ' '
				if (externalClasses)
					classes += this.getAttribute('class')
			}
			if (classes)
				this.setAttribute('class', classes)
			
			// Add attributes on custom element
			if (options.attributes)
				for (const [key, value] of Object.entries(options.attributes))
					this.setAttribute(key, value);
			if ((component as any).__attributes__)
				for (const attribute of (component as any).__attributes__)
					if (this.getAttribute(attribute))
						(this as any)[attribute] = this.getAttribute(attribute)
			
			// Set custom element content
			const clone = document.importNode(template.content, true)
			if (options.useShadow)
				this.attachShadow({ mode: options.shadowMode }).appendChild(clone)
			else
				this.appendChild(clone)
			
			this.constructor.__variables__ = findVariablesInHTMLElement(this)
			
			// Call connected() method when the element is ready to use
			this.connected?.()
			this.constructor.__isInitialized__ = true
			
			// Complete variables in the template
			setVariablesInNodes(this, flatify(recordToArray(this.constructor.__variables__)))
		}

		component.prototype.disconnectedCallback = function() {
			// Call disconnected() method when the element is deleted
			this.disconnected?.()
		}

		// Set static attribute observedAttributes who return attributes to watch
		Object.defineProperty(component.prototype.constructor, 'observedAttributes', {
			get() {
				return this.__attributes__ ?? []
			}
		})
		
		// Method to trigger when a watched attribute is modified
		component.prototype.attributeChangedCallback = function(name: string, oldValue: any, newValue: any) {
			if (oldValue === newValue) return;
			(this as any)["__" + name] = newValue
			if ((this.constructor as any).__isInitialized__) {
				// Call update() method when an attribute is changed
				this.update?.()
				
				// Complete variables in the template
				setVariablesInNodes(this, (this.constructor as any).__variables__[name])
			}
		}

		// Define this class as a custom element
		if (typeof options.extends !== 'undefined')
			window.customElements.define(options.selector, component, { extends: options.extends })
		else
			window.customElements.define(options.selector, component)
	}
}

// Attribute decorator
export const Attribute = () => {
	return <T extends HTMLElement>(component: T, propertyKey: string) => {
		(component.constructor as any).__attributes__ ??= [];
		(component.constructor as any).__attributes__.push(propertyKey)
		
		// Update attribute to trigger attributeChangedCallback method
		Object.defineProperty(component, propertyKey, {
			get() {
				return (component as any)["__" + propertyKey]
			},
			set(value: any) {
				(component as any)["__" + propertyKey] = value
				if (value)
					this.setAttribute(propertyKey, value)
				else
					this.removeAttribute(propertyKey)
			},
			enumerable: true
		})
	}
}
