import { RootRender } from './root-render.decorator'
import c from '../styles/styles.sass'

const template = ({name}) => (`
    <span>От: <b>${name}</b></span>
    <button type="button">Закрыть</button>
`)

export function TopComponent({ ViewRoom, onCrossClick = () => {} }) {
    let name = ''
    this.onCrossClick = onCrossClick
    
    const render = (inName) => {
        name = inName
        if (name) {
            this.elem.innerHTML = template({name}) 
            this.elem.querySelector('button').onclick = () => {
                ViewRoom.state = ''
                this.onCrossClick()
            }
        }
        this.elem.classList.toggle(c.layout_chatTopHide, !name)
    }
    
    Object.defineProperty(this, 'name', {
        get: () => name,
		set: render
    })
    
    RootRender.call(this, 'div', [c.layout_chatTop, c.layout_chatTopHide])
    this.name = name

}
