import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
import { size } from 'lodash';



class HeaderHome extends Component {
    changeLanguageApp = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }



    render() {
        let language = this.props.language
        console.log(language)
        return (
            <>

                <div className='home-header-container'>
                    <div className='home-page-content'>

                        {/* <div className='content-left'>

                            <i className="fas fa-bars bars" ></i>
                            <div className='header-logo' onClick={() => this.returnToHome()}>
                                <FormattedMessage id="headerhome.home" />
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
                            
                        </div> */}



                        {/* <!-- navbar --> */}
                        <nav className="navbar navbar-expand-lg" id="navbar">
                            <div className="container-fluid">
                                <a className="navbar-brand" id="logo" onClick={() => this.returnToHome()}><h3 >Bookingcare</h3></a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span><i className="fa-solid fa-bars"   ></i></span>
                                </button>
                                <div className="nav-bar-body collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" onClick={() => this.returnToHome()}>Trang chủ</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#about">Chuyên khoa</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#menu">Cơ sở y tế</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#product">Bác sĩ</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#gallary">Cẩm nang</a>
                                        </li>

                                    </ul>
                                    {/* <form className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </form> */}
                                    <div className='switch-language'>
                                        <div className={language === LANGUAGES.VI ? 'vi-language active' : 'vi-language'} ><span onClick={() => this.changeLanguageApp(LANGUAGES.VI)}>VN</span></div>
                                        <div className={language === LANGUAGES.EN ? 'en-language active' : 'en-language'}><span onClick={() => this.changeLanguageApp(LANGUAGES.EN)}>EN</span></div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        {/* <!-- navbar --> */}
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='title1'><FormattedMessage id="home-header-banner.title-1" /></div>
                        <div className='title2'><FormattedMessage id="home-header-banner.title-2" /></div>
                        <div className='get-started' >
                            <button type="button" className="btn detail" ><FormattedMessage id="home-header-banner.view-detail" /> &nbsp; <span><i className="fas fa-chevron-down"></i></span> </button>
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
                        <div className='light-image' style={{ height: '187px' }}></div>
                    </div>
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderHome));
