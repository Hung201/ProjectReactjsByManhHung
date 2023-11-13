import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderHome from './HeaderHome';
import Specialist from './Specialist';
import MedicalFacility from './MedicalFacility';
import OutstandingDoctor from './OutstandingDoctor';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Handbook from './Handbook';
import About from './About';
import HomeFooter from './HomeFooter';


class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            lazyLoad: true,

        };
        return (
            <div>
                <HeaderHome />
                <Specialist
                    settings={settings} />
                <MedicalFacility
                    settings={settings} />
                <OutstandingDoctor
                    settings={settings} />
                <Handbook />
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
