import { apiBase } from "./API"

export const dialogsAPI = {
    getDialogsList() {
        return apiBase.get('dialogs')
    },
    getUserMessagesList(userId: number, pageSize: number, currentPage: number) {
        return apiBase.get(`dialogs/${userId}/messages?page=${currentPage}&count${pageSize}`)
    },
    sendMessageToUser(userId: number, message: string) { //to friend??
        return apiBase.post(`dialogs/${userId}/messages`, {body: message})
    },
    getMessageViewedStatus(messageId: number) {
        return apiBase.get(`dialogs/messages/${messageId}/viewed`)
    },
    markMessageAsSpam(messageId: number) {
        return apiBase.post(`dialogs/messages/${messageId}/spam`)
    },
    deleteMessage(messageId: number) {
        return apiBase.delete(`dialogs/messages/${messageId}`)
    },
    restoreMessage(messageId: number) { //from deleted and spam
        return apiBase.put(`dialogs/messages/${messageId}/restore`)
    },
    getMessagesNewerThenDate(userId: number, date: string) {
        return apiBase.get(`dialogs/${userId}/messages/new?newerThen=${date}`)
    },
    getNewMessagesList() {
        return apiBase.get(`dialogs/messages/new/count`)
    }

}

// dialogs/{userId}
// start chatting, refresh your companion so that he was on top

// REQUEST
// type: put

// URI Parameters:
// userId - (number) - user id of your friend

// RESPONSE
// object
