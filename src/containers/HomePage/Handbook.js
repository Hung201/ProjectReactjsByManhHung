import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils/constant';
import { getAllHandbook } from '../../services/userService';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Handbook.scss';
import { withRouter } from 'react-router';

class Handbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: []
        }
    }
    async componentDidMount() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data ? res.data : []
            })
        }
    }

    handleViewDetailHandbook = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${item.id}`)
        }
    }
    render() {

        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            lazyLoad: true,

        };

        let { dataHandbook } = this.state;
        console.log('chekc data: ', dataHandbook)
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Tất cả bài viết</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>

                            {dataHandbook && dataHandbook.length > 0 &&
                                dataHandbook.map((item, index) => {
                                    return (
                                        <div
                                            className='section-customize section-flex'
                                            key={index}
                                            onClick={() => this.handleViewDetailHandbook(item)}
                                        >
                                            <div className='outer-bg'>
                                                <div
                                                    className='bg-image section-handbook'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                            </div>
                                            <h3>{item.name}</h3>
                                        </div>
                                    )
                                })
                            }

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
