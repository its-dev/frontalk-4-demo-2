import './core/polyfill'

import { Store } from './core/store'
import {
    LayoutComponent,
    ChatServive,
    SearchComponent,
    RoomsComponent,
    MessagesComponent,
    TopComponent,
    WriteComponent,
} from './features'

const ChatServe = new ChatServive()
const ViewRoom = new Store('')
const ViewMessages = new Store([])

const RoomsApp = new RoomsComponent({ ViewRoom })
const TopApp = new TopComponent({ ViewRoom })
const MessagesApp = new MessagesComponent()

export const init = async () => {  
    new LayoutComponent({root: document.getElementById('chatRoot'), ViewRoom})
    new SearchComponent({root: document.getElementById('chatSearch')})
    const WriteApp = new WriteComponent({
        root: document.getElementById('chatWrite'),
        ViewMessages
    })
    RoomsApp.root = document.getElementById('chatRooms')
    MessagesApp.root = document.getElementById('chatList')
    TopApp.root = document.getElementById('chatTop')

    const onSetRoom = async (id) => {
        ViewMessages.state = await ChatServe.fetchMessages(id)
        let room = RoomsApp.list.find(el => el.id === id)
        WriteApp.reset()
        if (room && RoomsApp.activeItem !== id) {
            TopApp.name = room.name
            RoomsApp.activeItem = id
            WriteApp.show()
        } else {
            TopApp.name = ''
            RoomsApp.activeItem = null
            WriteApp.hide()
            ViewMessages.state = []
        }
    }
    
    const onSetMessages = (list) => {
        MessagesApp.list = list
    }

    ViewRoom.subscribe(onSetRoom)
    ViewMessages.subscribe(onSetMessages)
    RoomsApp.list = await ChatServe.fetchRooms()
}


document.addEventListener('DOMContentLoaded', init)
