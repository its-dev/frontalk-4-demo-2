import { RoomComponent } from './room.component'
import { RootRender } from './root-render.decorator'
import c from '../styles/styles.sass'

export function RoomsComponent(props) {
    RootRender.call(this, 'div', [c.rooms])

    this.items = []
    let list = []

    const onClickItem = (room) => {
        props.ViewRoom.state = room.id
    }
    
    const render = (data) => {
        this.elem.innerHTML = ''
        this.items = []
        list = data
        list.forEach((room, i) => {
            this.items.push(new RoomComponent({data: room, onClick: onClickItem}))
            this.elem.appendChild(this.items[i].elem)
        })
    }

    let activeItem = null
    
    const onSetActive = (id) => {
        activeItem = id
        this.items.forEach(item => {
            let state = item.id === id
            item.toggleActive(state)
        })
    }

    Object.defineProperty(this, 'activeItem', {
		get: () => activeItem,
		set: onSetActive
	})

    Object.defineProperty(this, 'list', {
		get: () => list,
		set: render
	})

    this.list = props.list ? props.list : []
}
