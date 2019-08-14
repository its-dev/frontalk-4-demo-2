import { RootRender } from './root-render.decorator'
import c from '../styles/styles.sass'

const template = () => (`
    <form class="${c.write_input}">
        <!-- <a href="javascript:;" class="${c.write_link} ${c.write_linkAttach}"></a> -->
        <input type="text" placeholder="Введите сообщение" required/>
        <!-- <a href="javascript:;" class="${c.write_link} ${c.write_linkSmiley}"></a> -->
        <button class="${c.write_link} ${c.write_linkSend}"></button>
    </form>
`)

export function WriteComponent({
    root, ViewMessages, onSubmit = (content) => {}, onInput = (content) => {}
}) {
    this.form
    this.input

    this.onSubmit = onSubmit
    this.onInput = onInput

    const hangleSubmit = (e) => {
        e.preventDefault()
        if (e.target.checkValidity()) {
            let content = this.input.value
            let state = ViewMessages.state
            state.push({ isMe: true, content })
            ViewMessages.state = state
            this.input.value = ''
            this.onSubmit(content)
        }
    }

    const handleInput = (e) => {
        this.onInput(this.input.value)
    }

    this.render = () => {
        if (!this.elem.innerHTML) {
            this.elem.innerHTML = template()
        }
        this.form = this.elem.querySelector('form')
        this.input = this.elem.querySelector('input')
        this.form.onsubmit = hangleSubmit
        this.input.oninput = handleInput
    }

    this.reset = () => {
        this.input.value = ''
    }
    
    this.hide = () => this.elem.classList.add(c.writeHide)
    this.show = () => this.elem.classList.remove(c.writeHide)

    RootRender.call(this, 'div', [c.write, c.writeHide], this.render)

    this.root = root
}
