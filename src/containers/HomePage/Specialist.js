import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialist.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}
class Specialist extends Component {



    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };

        return (
            <div className='section-specialist'>
                <div className='specialist-content'>
                    <Slider {...settings}>
                        <div className='img-item'>
                            <h3>1</h3>
                        </div>
                        <div className='img-item'>
                            <h3>2</h3>
                        </div>
                        <div className='img-item'>
                            <h3>3</h3>
                        </div>
                        <div className='img-item'>
                            <h3>4</h3>
                        </div>
                        <div className='img-item'>
                            <h3>5</h3>
                        </div>
                        <div className='img-item'>
                            <h3>6</h3>
                        </div>
                    </Slider>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialist);
