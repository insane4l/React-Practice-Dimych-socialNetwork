let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null

const closeHandler = () => {
    console.log('WebSocket channel CLOSED');
    setTimeout(createChannel, 4000)
}
const messageHandler =  (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages) )
}
function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}


export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.close()
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', closeHandler)
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type SubscriberType = (messages: ChatMessageType[]) => void