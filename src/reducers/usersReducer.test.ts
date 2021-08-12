import usersReducer, {actions, InitialStateType} from "./usersReducer"

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
            {
                name: "User0", id: 0, uniqueUrlName: "u0", photos: {small: "", large: ""},
                status: "hi from u0", followed: false
            },
            {
                name: "User1", id: 1, uniqueUrlName: "u1", photos: {small: "", large: ""},
                status: "hi from u1", followed: false
            },
            {
                name: "User2", id: 2, uniqueUrlName: "u2", photos: {small: "", large: ""},
                status: "hi from u2", followed: true
            },
            {
                name: "User3", id: 3, uniqueUrlName: "u3", photos: {small: "", large: ""},
                status: "hi from u3", followed: true
            },

        ],
        totalUsersCount: 0,
        pageSize: 10,
        currentPage: 1,
        isLoading: false,
        followingInProgress: []
        
    }
})

// it("ddd", () => {
//     let someUsers = [
//         {
//             name: "User0", id: 0, uniqueUrlName: "u0", photos: {small: "", large: ""},
//             status: "hi from u0", followed: false
//         },
//         {
//             name: "User1", id: 1, uniqueUrlName: "u1", photos: {small: "", large: ""},
//             status: "hi from u1", followed: false
//         },
//         {
//             name: "User2", id: 2, uniqueUrlName: "u2", photos: {small: "", large: ""},
//             status: "hi from u2", followed: true
//         },
//         {
//             name: "User3", id: 3, uniqueUrlName: "u3", photos: {small: "", large: ""},
//             status: "hi from u3", followed: true
//         },

//     ]

//     usersReducer(state, actions.setUsers(someUsers))


    
// })

it("should toggle followed status of the user specified by id", () => {

    usersReducer(state, actions.toggleFollowed(0))
    usersReducer(state, actions.toggleFollowed(3))

    expect(state.users[0].followed).toBeTruthy() // toggle to followed: true
    expect(state.users[2].followed).toBeTruthy() // not touched
    expect(state.users[3].followed).toBeFalsy() // toggle to followed: false
})