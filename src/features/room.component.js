import c from '../styles/styles.sass'

const template = ({name, time, preview, avatar, icon}) => (`
    ${icon ? (`
        <div class="${c.room_icon}">
            <span>${icon}</span>
        </div>
    `) : (`
        <div class="${c.room_icon}">
            <img src="${avatar}" alt="room: ${name}"/>
        </div>
    `)}
    <div class="${c.room_text}">
        <span class="${c.room_name}">${name}</span>
        <span class="${c.room_preview}">${preview}</span>
    </div>
    <span class="${c.room_time}">${time}</span>
`)

export function RoomComponent({
    data, onClick = (data) => {}
}) {
    let { id, name = '', time = '', preview = '', avatar } = data
    
    this.id = id
    this.elem = document.createElement('div')
    this.elem.classList.add(c.room)
    this.elem.onclick = () => onClick(data)
    
    let icon = !avatar ? name[0] : ''
    
    this.elem.innerHTML = template({name, time, preview, avatar, icon})
    
    this.toggleActive = (state = false) => {
        if (this.elem) this.elem.classList.toggle(c.roomActive, state)
    }
}
