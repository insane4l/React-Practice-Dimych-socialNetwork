import {apiBase, ResponseType} from './API'
import {ProfileType, UserPhotosType, UserType} from '../types/types'


export const usersAPI = {
    getUsers(pageSize: number, currentPage: number, term: string, friend: null | boolean) {
        const isFriendFilter = term ? `&term=${term}` : ''
        const byTermFilter = friend === true ? `&friend=${friend}` : friend === false ? `&friend=${false}` : ''
        const queryParams = byTermFilter + isFriendFilter
        return apiBase.get<GetUsersResponseType>(`users?count=${pageSize}&page=${currentPage}${queryParams}`).then(res => res.data)
    },

    setProfilePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)

        return apiBase.put< ResponseType<SavePhotoResponseDataType> >('profile/photo', formData).then(res => res.data)
    },

    setProfileData(data: ProfileType) {
        return apiBase.put<ResponseType>('profile', data).then(res => res.data)
    },

    getUserProfile(userId: number) {
        return apiBase.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },

    getProfileStatus(userId: number) {
        return apiBase.get<string>(`profile/status/${userId}`).then(res => res.data)
    },

    setProfileStatus(message: string) {
        return apiBase.put<ResponseType>('profile/status', {status: message}).then(res => res.data)
    },

    checkFollowStatus(userId: number) {
        return apiBase.get<boolean>(`follow/${userId}`).then(res => res.data)
    },
    followToUser(userId: number) {
        return apiBase.post<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollowFromUser(userId: number) {
        return apiBase.delete<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
}



type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

type SavePhotoResponseDataType = {
    photos: UserPhotosType
}