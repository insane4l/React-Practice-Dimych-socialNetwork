import {actions, followOrUnfollow} from "./usersReducer"
import {ResponseType, ResultCodesEnum} from "../services/API"

import {usersAPI} from "../services/usersAPI"
jest.mock("../services/usersAPI")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const response: ResponseType = {
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: []
}


const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    // usersAPIMock.followToUser.mockClear()
    // usersAPIMock.unfollowFromUser.mockClear()
})



it("success toggle follow status to true (Follow) thunk", async () => {
    usersAPIMock.checkFollowStatus.mockReturnValue(Promise.resolve(false)) // check current user status (response false = unfollowed)
    usersAPIMock.followToUser.mockReturnValue(Promise.resolve(response)) 
    
    const thunk = followOrUnfollow(3)
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(3, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowed(3))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(3, false))
})

it("success toggle follow status to false (Unfollow) thunk", async () => {
    usersAPIMock.checkFollowStatus.mockReturnValue(Promise.resolve(true))
    usersAPIMock.unfollowFromUser.mockReturnValue(Promise.resolve(response))
    
    const thunk = followOrUnfollow(6)
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(6, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowed(6))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(6, false))
})
