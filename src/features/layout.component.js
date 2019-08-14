import { RootRender } from './root-render.decorator'
import c from '../styles/styles.sass'

const template = () => (`
    <div class="${c.layout_left}">
        <div id="chatSearch"></div>
        <div id="chatRooms"></div>
    </div>
    <div class="${c.layout_right}">
        <div id="chatTop"></div>
        <div id="chatList"></div>
        <div id="chatWrite"></div>
    </div>
`)

export function LayoutComponent({ root, ViewRoom }) {   
    this.rightElem
    
    const render = () => {
        this.elem.innerHTML = template()
        this.rightElem = this.elem.querySelector(`.${c.layout_right}`)
        resize()
    }

    const resize = () => {
        let isMobile = this.elem.clientWidth <= 800
        this.elem.classList.toggle(c.layoutMobile, isMobile)
    }

    const onSetViewRoom = (state) => {
        if (this.rightElem) {
            this.rightElem.classList.toggle(c.layout_rightOpen, !!state)
        }
    }

    RootRender.call(this, 'div', [c.layout], render)

    this.root = root

    window.addEventListener('resize', resize)
    ViewRoom.subscribe(onSetViewRoom)
}
