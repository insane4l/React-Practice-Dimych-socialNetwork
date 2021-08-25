let subscribers = {
    'messages-received': [] as MessagesSubscribersType[],
    'status-changed': [] as StatusSubscribersType[]
} 

let ws: WebSocket | null = null

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 4000)
}
const messageHandler =  (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessages) )
}
const openHandler =  () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler =  () => {
    notifySubscribersAboutStatus('error')
}

const notifySubscribersAboutStatus = (status: WSStatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
    ws?.close()
}
function createChannel() {
    cleanUp()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}


export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
    },
    subscribe(event: EventsTypes, callback: SubscribersTypes) {
        // @ts-ignore
        subscribers[event].push(callback)
    },
    unsubscribe(event: EventsTypes, callback: SubscribersTypes) {
        // @ts-ignore
        subscribers[event] = subscribers[event].filter(s => s !== callback)
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

export type WSStatusType = 'pending' | 'ready' | 'error'

type MessagesSubscribersType = (messages: ChatMessageType[]) => void
type StatusSubscribersType = (status: WSStatusType) => void
type SubscribersTypes = MessagesSubscribersType | StatusSubscribersType
type EventsTypes = 'messages-received' | 'status-changed'