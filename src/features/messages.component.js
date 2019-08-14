import { MessageComponent } from './message.component'
import { RootRender } from './root-render.decorator'
import c from '../styles/styles.sass'

const template = () => (`
    <div class="${c.messages_scroll}">
        <!-- <div class="${c.messages_date}">
            <span>Yesterday, 4:20 PM</span>
        </div> -->
    </div>
`)

export function MessagesComponent(props = {}) {    
    RootRender.call(this, 'div', [c.messages])

    this.items = []
    let list = []
    
    const render = (data) => {
        this.elem.innerHTML = template()
        this.items = []
        list = data
        let listElem = this.elem.querySelector(`.${c.messages_scroll}`)
        list.forEach((message, i) => {
            this.items.push(new MessageComponent({...message}))
            listElem.appendChild(this.items[i].elem)
        })
        listElem.scroll(0, listElem.scrollHeight)
    }

    Object.defineProperty(this, 'list', {
		get: () => list,
		set: render
	})

    this.list = props.list ? props.list : []
}
