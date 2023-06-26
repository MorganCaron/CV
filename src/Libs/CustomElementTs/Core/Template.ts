import { removeDuplicates } from './Utils'

export const TemplateInformations = {
	openSymbol: '{{',
	closeSymbol: '}}'
}

export interface TemplateMatch {
	key: string
	sample: string
}

const TemplateGetRegex = () => new RegExp(TemplateInformations.openSymbol + ' *(.+?)? *' + TemplateInformations.closeSymbol, 'g')

export const TemplateGetMatchs = (str: string): TemplateMatch[] => {
	const regex = TemplateGetRegex()
	let match: RegExpExecArray | null
	let matchs: TemplateMatch[] = []
	while (match = regex.exec(str))
		matchs.push({ key: match[1], sample: match[0] })
	return matchs
}

export const TemplateGetKeys = (str: string): string[] => removeDuplicates(TemplateGetMatchs(str).map(match => match.key))

export interface NodeContainingVariables {
	node: Node
	attributeName?: string
	template: string
}

const findVariablesInTextNode = (node: Node): Record<string, NodeContainingVariables[]> => {
	const variables: Record<string, NodeContainingVariables[]> = {}
	if (node.nodeValue)
		TemplateGetKeys(node.nodeValue).forEach(key => {
			if (!variables[key]) variables[key] = []
			variables[key].push({
				node: node,
				template: node.nodeValue ?? ""
			})
		})
	return variables
}

export const findVariablesInHTMLElement = (component: HTMLElement): Record<string, NodeContainingVariables[]> => {
	let containsVariable: Record<string, NodeContainingVariables[]> = {}
	component.childNodes.forEach(node => {
		if (node.nodeType == Node.TEXT_NODE)
			containsVariable = { ...containsVariable, ...findVariablesInTextNode(node) }
		else if (node.nodeType == Node.ELEMENT_NODE)
			containsVariable = { ...containsVariable, ...findVariablesInHTMLElement(node as HTMLElement) }
	})
	return containsVariable
}

const setVariablesInTextNode = (component: HTMLElement, nodeContainingVariables: NodeContainingVariables) => {
	nodeContainingVariables.node.nodeValue = TemplateGetMatchs(nodeContainingVariables.template).reduce((text: string, match: TemplateMatch) =>
		text.replace(match.sample, (component as any)[match.key]), nodeContainingVariables.template)
}

export const setVariablesInNodes = (component: HTMLElement, nodesContainingVariables?: NodeContainingVariables[]) => {
	nodesContainingVariables?.forEach(nodeContainingVariables => {
		if (nodeContainingVariables.node.nodeType == Node.TEXT_NODE)
			setVariablesInTextNode(component, nodeContainingVariables)
	})
}
