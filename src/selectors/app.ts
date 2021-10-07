import {AppStateType} from '../reduxStore'

export const getUnhandledError = (state: AppStateType) => {
    return state.app.unhandledError
}