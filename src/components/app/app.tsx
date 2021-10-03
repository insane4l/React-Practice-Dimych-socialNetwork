import React from "react"
import Header from "./header"
import SideBar from "./sideBar"
import MainSection from "./mainSection"
import Footer from './footer'
import {connect} from 'react-redux'
import {actions, initializeApp} from '../../reducers/appReducer'
import Spinner from '../common/spinner'
import { AppStateType } from "../../reduxStore"

import "./app.scss"


class App extends React.Component<PropsType> {

    componentDidMount() {
        this.props.initializeApp();
        //handle all unhandled with "catch" errors
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        //remove because of side effect in global
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    catchAllUnhandledErrors = () => {
        this.props.unhandledErrorCatched(true)
    }

    render() {
      
        if (!this.props.appInitialized) return <Spinner />

        return (
            <div className="app__wrapper">
                <Header />
                <div className="container page__layout">
                    <SideBar />
                    <MainSection />
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({appInitialized: state.app.appInitialized})

export default connect(mapStateToProps, {initializeApp, unhandledErrorCatched: actions.unhandledErrorCatched})(App)



type PropsType = {
    appInitialized: boolean
    initializeApp: () => Promise<void>
    unhandledErrorCatched: (error: boolean) => void
}