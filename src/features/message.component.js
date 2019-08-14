import c from '../styles/styles.sass'

// const template = ({content, isMe}) => (`
//     <div class="message ${isMe ? 'me' : 'you'}">${content}</div>
// `)

export function MessageComponent({
    content, isMe = true
}) {
    this.elem = document.createElement('div')
    this.elem.classList.add(c.message)
    this.elem.classList.add(isMe ? c.messageMe : c.messageYou)
    this.elem.innerHTML = content
}
