export interface Type<T> extends Function {
	new(...args: any[]): T
}

export const recordToArray = <Key extends string | number | symbol, Value>(record: Record<Key, Value>): Value[] =>
	Object.keys(record).map(key => record[key as Key])

export const flatify = <T>(array: any[]): T[] =>
	array.reduce((flat: T[], toFlatten: T | any[]) =>
		flat.concat(Array.isArray(toFlatten) ? flatify(toFlatten) : toFlatten), [])

export const xor = (lhs: boolean, rhs: boolean) => (lhs ? !rhs : rhs)

export type Zipped<A, B> = { first: A, second: B }[]

export const zip = <A, B>(first: A[], second: B[]): Zipped<A, B> => {
	const zipped: { first: A, second: B }[] = []
	for (let i = 0; i < Math.min(first.length, second.length); ++i)
		zipped.push({ first: first[i], second: second[i] })
	return zipped
}

export const removeDuplicates = <T>(array: T[]): T[] => [...new Set<T>(array)]

export const escapeHtml = (unsafeString: string): string =>
	unsafeString
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;")
