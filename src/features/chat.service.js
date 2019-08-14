import { rooms, chats } from '../temp-data'

export function ChatServive() {

    this.fetchRooms = async () => {
        return rooms
    }
    
    this.fetchMessages = async (id) => {
        let chat = chats.find(el => el.id === id)
        return !chat ? [] : chat.messages
    }

    this.onSubmit = () => {
        
    }

    this.onInput = () => {
        
    }
}