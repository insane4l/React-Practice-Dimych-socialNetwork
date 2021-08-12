import {followOrUnfollow} from "./usersReducer"
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
    usersAPIMock.followToUser.mockClear()
    usersAPIMock.unfollowFromUser.mockClear()
})



it("sss", async () => {
    usersAPIMock.followToUser.mockReturnValue(Promise.resolve(response))
    usersAPIMock.unfollowFromUser.mockReturnValue(Promise.resolve(response))
    
    const thunk = followOrUnfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    // expect(dispatchMock).toHaveBeenNthCalledWith(1, )
    // expect(dispatchMock).toHaveBeenNthCalledWith(2, )
    // expect(dispatchMock).toHaveBeenNthCalledWith(3, )
})
