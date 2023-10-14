import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';


class HeaderHome extends Component {
    changeLanguageApp = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language
        console.log(language)
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-page-content'>
                        <div className='content-left'>
                            <i className="fas fa-bars bars"></i>
                            <div className='text-home'>
                                Home
                            </div>
                        </div>
                        <div className='search'>
                            <form className="form-inline my-2 my-lg-0 form-search">
                                <i className="fas fa-search search-icon"></i>
                                <input
                                    className="form-control mr-sm-2 search-input"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                            </form>
                        </div>
                        <div className='content-center'>
                            <div className='child-content'>
                                <div className='text-1-child'><FormattedMessage id="headerhome.specialist" /></div>
                                <div className='text-2-child'><FormattedMessage id="headerhome.search-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='text-1-child'><FormattedMessage id="headerhome.health-facilities" /></div>
                                <div className='text-2-child'><FormattedMessage id="headerhome.choose-hospital" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='text-1-child'><FormattedMessage id="headerhome.doctor" /></div>
                                <div className='text-2-child'><FormattedMessage id="headerhome.choose-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div className='text-1-child'><FormattedMessage id="headerhome.examination-package" /></div>
                                <div className='text-2-child'><FormattedMessage id="headerhome.general-health-examination" /></div>
                            </div>
                        </div>

                        <div className='content-right'>
                            <div className='support'>
                                <i className="fas fa-question-circle question-icon"></i>
                                <div className='sp-text'><FormattedMessage id="headerhome.support" /></div>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'vi-language active' : 'vi-language'} ><span onClick={() => this.changeLanguageApp(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'en-language active' : 'en-language'}><span onClick={() => this.changeLanguageApp(LANGUAGES.EN)}>EN</span></div>
                            <div className='icon-right'>
                                <i className="fas fa-adjust light-icon"></i>
                                <i className="fas fa-user-circle user-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='title1'><FormattedMessage id="home-header-banner.title-1" /></div>
                    <div className='title2'><FormattedMessage id="home-header-banner.title-2" /></div>
                    <div className='get-started'>
                        <button type="button" className="btn detail"><FormattedMessage id="home-header-banner.view-detail" /> &nbsp; <span><i className="fas fa-chevron-down"></i></span> </button>
                    </div>
                    <div className='options'>
                        <div className='options-child'>
                            <div className='icon-child'><i className="far fa-hospital"></i></div>
                            <div className='text-child'><FormattedMessage id="home-header-banner.text-child-1" /></div>
                        </div>
                        <div className='options-child'>
                            <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                            <div className='text-child'><FormattedMessage id="home-header-banner.text-child-2" /></div>
                        </div>
                        <div className='options-child'>
                            <div className='icon-child'><i className="fas fa-hospital-alt"></i></div>
                            <div className='text-child'><FormattedMessage id="home-header-banner.text-child-3" /></div>
                        </div>
                        <div className='options-child'>
                            <div className='icon-child'><i className="fas fa-vial"></i></div>
                            <div className='text-child'><FormattedMessage id="home-header-banner.text-child-4" /></div>
                        </div>
                        <div className='options-child'>
                            <div className='icon-child'><i className="fas fa-user-shield"></i></div>
                            <div className='text-child'><FormattedMessage id="home-header-banner.text-child-5" /></div>
                        </div>
                        <div className='options-child'>
                            <div className='icon-child'><i className="far fa-address-card"></i></div>
                            <div className='text-child'><FormattedMessage id="home-header-banner.text-child-6" /></div>
                        </div>
                    </div>
                </div>
            </>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);
