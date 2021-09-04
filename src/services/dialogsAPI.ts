import { UserPhotosType } from "../types/types"
import { apiBase, ResultCodesEnum } from "./API"

export const dialogsAPI = {
    getAllDialogsList() {
        return apiBase.get<AllDialogsListItemType[]>('dialogs').then((res) => res.data)
    },
    getUserMessagesList(userId: number, pageSize: number, currentPage: number) {
        return apiBase.get<DialogMessagesListResponseType>(
            `dialogs/${userId}/messages?page=${currentPage}&count${pageSize}`)
    },
    sendMessageToUser(userId: number, message: string) {
        return apiBase.post<DialogsDefaultResponseType<SendDialogMessageResponseDataType, ResultCodesEnum>>(
            `dialogs/${userId}/messages`, {body: message})
    },
    setDialogAtTheDialogsListTop(userId: number) { // start chatting, refresh your companion so that he was on top (AllDialogsList[0])
        return apiBase.put<DialogsDefaultResponseType<{}, ResultCodesEnum>>(`dialogs/${userId}`)
    },
    getMessageViewedStatus(messageId: string) {
        return apiBase.get<boolean>(`dialogs/messages/${messageId}/viewed`)
    },
    markMessageAsSpam(messageId: string) {
        return apiBase.post<DialogsDefaultResponseType<{}, ResultCodesEnum>>(`dialogs/messages/${messageId}/spam`)
    },
    deleteMessage(messageId: string) {
        return apiBase.delete<DialogsDefaultResponseType<{}, ResultCodesEnum>>(`dialogs/messages/${messageId}`)
    },
    restoreMessage(messageId: string) { //from deleted and spam
        return apiBase.put<DialogsDefaultResponseType<{}, ResultCodesEnum>>(`dialogs/messages/${messageId}/restore`)
    },
    getMessagesNewerThenDate(userId: number, date: string) {
        return apiBase.get<DialogsMessageType[]>(`dialogs/${userId}/messages/new?newerThen=${date}`)
    },
    getNewMessagesTotalCount() {
        return apiBase.get<number>(`dialogs/messages/new/count`)
    }

}


type DialogsDefaultResponseType<D = {}, RC = ResultCodesEnum, FE = []> = {
    data: D
    resultCode: RC
    fieldsErrors: FE
    messages: Array<string>
}

export type AllDialogsListItemType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string // "2021-09-04T11:10:28.433"
    lastUserActivityDate: string // "2021-08-28T17:15:38.69"
    newMessagesCount: number
    photos: UserPhotosType
    userName: string
}

type SendDialogMessageResponseDataType = {
     message: DialogsMessageType
}

type DialogsMessageType = {
    addedAt: string // "2021-09-04T10:00:58.087"
    body: string // "Hello my friend"
    deletedByRecipient: boolean
    deletedBySender: boolean
    distributionId: number | null
    id: number // "f1e38413-fa75-41e9-a7ed-4e2ce05d1718"
    isSpam: boolean
    recipientId: number // 16320
    recipientName: string // "vanaf"
    senderId: number // 17964
    senderName: string // "insane4L"
    translatedBody: null | string
    viewed: boolean
}




type DialogMessagesListResponseType = {
    error: null // | ??????
    items: DialogsMessagesListItem[]
    totalCount: number
}
type DialogsMessagesListItem = {
    addedAt: string // "2021-09-04T10:00:58.087"
    body: string // "Hello my friend"
    id: number // "f1e38413-fa75-41e9-a7ed-4e2ce05d1718"
    recipientId: number // 16320
    senderId: number // 17964
    senderName: string // "insane4L"
    translatedBody: null | string
    viewed: boolean
}
