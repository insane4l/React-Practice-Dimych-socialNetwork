import React from "react"
import HeaderContainer from "./header"
import SideBar from "./sideBar"
import MainSection from "./mainSection"
import Footer from './footer'
import {connect} from 'react-redux'
import {initializeApp} from '../../reducers/appReducer'
import Spinner from '../common/spinner'
import { AppStateType } from "../../reduxStore"

import "./app.scss"


type PropsType = {
    appInitialized: boolean
    initializeApp: () => Promise<void>
}

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
        alert("Something goes wrong, server error")
    }

    render() {
      
        if (!this.props.appInitialized) return <Spinner />

        return (
            <div className="app__wrapper">
                <HeaderContainer />
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

export default connect(mapStateToProps, {initializeApp})(App)
