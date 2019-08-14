import { RootRender } from './root-render.decorator'
import c from '../styles/styles.sass'

const template = () => (`
    <form class="${c.search}">
        <input type="text" placeholder="Search"/>
        <button></button>
    </form>
`)

export function SearchComponent({ root }) {
    this.render = () => {
        if (!this.elem.innerHTML) {
            this.elem.innerHTML = template()
        }
    }

    RootRender.call(this, 'div', [c.layout_search], this.render) 

    this.root = root
}
