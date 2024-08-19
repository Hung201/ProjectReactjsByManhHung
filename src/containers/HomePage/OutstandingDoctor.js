import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from "../../store/actions";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';



class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []

        }
    }

    componentDidMount() {
        this.props.loadingTopDoctor()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.userTopDoctors !== this.props.userTopDoctors) {
            this.setState({
                arrDoctors: this.props.userTopDoctors
            })

        }
    }


    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }

    }
    render() {
        let arrDoctor = this.state.arrDoctors;
        let language = this.props.language;

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.out-standing-doctor" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.search" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctor && arrDoctor.length > 0
                                && arrDoctor.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div className='section-customize'
                                            key={index}
                                            onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor '
                                                        style={{ backgroundImage: `url(${imageBase64})` }}

                                                    />
                                                </div>
                                                <div className='title-name-image'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            </div>
                                        </div>
                                    )
                                })}
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
        language: state.app.language,
        userTopDoctors: state.admin.userTopDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadingTopDoctor: () => dispatch(actions.fetchTopDoctor()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
