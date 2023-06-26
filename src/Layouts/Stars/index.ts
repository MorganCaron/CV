import { Component, Attribute } from '@/Libs/CustomElementTs'

enum StarType {
	Full,
	Half,
	Empty
}

@Component({
	selector: 'app-stars'
})
export class Stars extends HTMLElement {

	@Attribute()
	public stars: number

	connected() {
		for (let i = 0; i < Math.floor(this.stars); ++i)
			this.addStar(StarType.Full)
		if (this.stars % 1 != 0)
			this.addStar(StarType.Half)
		for (let i = Math.ceil(this.stars); i < 5; ++i)
			this.addStar(StarType.Empty)
	}

	addStar(starType: StarType): void {
		const starElement = document.createElement('i')
		switch (starType) {
			case StarType.Full: {
				starElement.classList.add('las', 'la-star')
				break;
			}
			case StarType.Half: {
				starElement.classList.add('las', 'la-star-half-alt')
				break;
			}
			case StarType.Empty: {
				starElement.classList.add('lar', 'la-star')
				break;
			}
		}
		this.appendChild(starElement)
	}
}
