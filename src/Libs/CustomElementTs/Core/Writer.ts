export type WagnerFischerOptions = {
	replace: boolean
}

export enum EWagnerFischerEdition {
	NoChange,
	Insertion,
	Substitution,
	Deletion
}

export type WagnerFischerResult = {
	distance: number
	editions: EWagnerFischerEdition[]
}

export const wagnerFischer = (str0: string, str1: string, options: WagnerFischerOptions): WagnerFischerResult => {
	let distances: number[][] = []
	for (let i = 0; i <= str0.length; ++i) distances[i] = [i]
	for (let i = 0; i <= str1.length; ++i) distances[0][i] = i
	for (let j = 1; j <= str1.length; ++j)
		for (let i = 1; i <= str0.length; ++i) {
			if (str0[i - 1] === str1[j - 1])
				distances[i][j] = distances[i - 1][j - 1]
			else {
				const deletion = distances[i - 1][j]
				const insertion = distances[i][j - 1]
				if (options.replace) {
					const substitution = distances[i - 1][j - 1]
					distances[i][j] = Math.min(deletion, insertion, substitution) + 1
				}
				else
					distances[i][j] = Math.min(deletion, insertion) + 1
			}
		}

	let i = str0.length, j = str1.length, editions: EWagnerFischerEdition[] = []
	while (i !== 0 && j !== 0) {
		if (str0[i - 1] === str1[j - 1]) {
			editions.unshift(EWagnerFischerEdition.NoChange)
			--i
			--j
		}
		else if (distances[i - 1][j] < distances[i][j - 1]) {
			editions.unshift(EWagnerFischerEdition.Deletion)
			--i
		}
		else if (options.replace && distances[i - 1][j] === distances[i][j - 1]) {
			editions.unshift(EWagnerFischerEdition.Substitution)
			--i
			--j
		}
		else {
			editions.unshift(EWagnerFischerEdition.Insertion)
			--j
		}
	}
	if (i === 0 && j > 0)
		while (j-- > 0)
			editions.unshift(EWagnerFischerEdition.Insertion)
	else if (i > 0 && j === 0)
		while (i-- > 0)
			editions.unshift(EWagnerFischerEdition.Deletion)

	return {
		distance: distances[str0.length][str1.length],
		editions: editions
	}
}

export type WriterOptions = {
	duration?: number
	interval?: number
	replace: boolean
	update: (newString: string) => void
}

export class Writer {
	public static write(oldString: string, newString: string, options: WriterOptions, callback?: (newString: string) => void): number[] {
		let timeouts: number[] = []
		const wagnerFischerResult = wagnerFischer(oldString, newString, { replace: options.replace })
		if (!wagnerFischerResult.distance) return []
		let str = oldString
		const interval: number = options.duration ? options.duration / wagnerFischerResult.distance : (options.interval ?? 10)
		let posSrc = 0, posDest = 0
		for (let i = 0; i < wagnerFischerResult.editions.length; ++i) {
			const edition = wagnerFischerResult.editions[i]
			if (edition === EWagnerFischerEdition.Insertion)
				timeouts.push(setTimeout((posSrc: number, posDest: number) => {
					str = str.substring(0, posDest) + newString[posSrc] + str.substr(posDest)
					options.update(str)
				}, (i + 1) * interval, posSrc, posDest))
			else if (edition === EWagnerFischerEdition.Substitution)
			timeouts.push(setTimeout((posSrc: number, posDest: number) => {
					str = str.substring(0, posDest) + newString[posSrc] + str.substr(posDest + 1)
					options.update(str)
				}, (i + 1) * interval, posSrc, posDest))
			else if (edition === EWagnerFischerEdition.Deletion)
			timeouts.push(setTimeout((posDest: number) => {
					str = str.substring(0, posDest) + str.substr(posDest + 1)
					options.update(str)
				}, (i + 1) * interval, posDest))
			if (edition !== EWagnerFischerEdition.Deletion) {
				++posDest
				++posSrc
			}
		}
		if (callback)
			timeouts.push(setTimeout(callback, wagnerFischerResult.distance * interval, newString))
		return timeouts
	}
}
