import React from "react";
import HeaderContainer from "./header";
import SideBar from "./sideBar";
import MainSection from "./mainSection";
import Footer from './footer';
import {connect} from 'react-redux';
import {initializeApp} from '../../reducers/appReducer';
import Spinner from '../common/spinner';

import "./app.scss";

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
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
        );
    }
}

const mapStateToProps = (state) => ({appInitialized: state.app.appInitialized})

export default connect(mapStateToProps, {initializeApp})(App);
