export type ProfileContactsType = {
    github: string | undefined
    vk: string | undefined
    facebook: string | undefined
    instagram: string | undefined
    twitter: string | undefined
    website: string | undefined
    youtube: string | undefined
    mainLink: string | undefined
};

export type UserPhotosType = {
    small: string | null
    large: string | null
};

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContactsType
    photos: UserPhotosType
    aboutMe: string
};

export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: UserPhotosType
    status: string | null
    followed: boolean
}

export type PostType = {
    id: number
    postDate: string
    label: string
    likesCount: number
    comments: number
}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


export type RequestErrorHandlingType = {
    [errorName: string]: null | string
}