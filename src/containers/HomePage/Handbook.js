import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils/constant';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Handbook.scss';

class Handbook extends Component {


    render() {

        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            lazyLoad: true,

        };

        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Tất cả bài viết</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='section-customize section-flex'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook' />
                                </div>
                                <h3>Xét nghiệm NIPT tại Hà Nội bao nhiêu tiền? Review chi tiết bảng giá</h3>
                            </div>
                            <div className='section-customize section-flex'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook  ' />
                                </div>
                                <h3>Xét nghiệm NIPT tại Hà Nội bao nhiêu tiền? Review chi tiết bảng giá</h3>
                            </div>
                            <div className='section-customize section-flex'>

                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook' />
                                </div>
                                <h3>Xét nghiệm NIPT tại Hà Nội bao nhiêu tiền? Review chi tiết bảng giá</h3>
                            </div>
                            <div className='section-customize section-flex'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook' />
                                </div>
                                <h3>Xét nghiệm NIPT tại Hà Nội bao nhiêu tiền? Review chi tiết bảng giá</h3>
                            </div>

                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
