import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss'

class HeaderHome extends Component {

    render() {

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
                                <div className='text-1-child'>Chuyên khoa</div>
                                <div className='text-2-child'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div className='text-1-child'>Cơ sở y tế</div>
                                <div className='text-2-child'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div className='text-1-child'>Bác sĩ</div>
                                <div className='text-2-child'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div className='text-1-child'>Gói khám</div>
                                <div className='text-2-child'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>

                        <div className='content-right'>
                            <div className='support'>
                                <i className="fas fa-question-circle question-icon"></i>
                                <div className='sp-text'>Hỗ trợ</div>
                            </div>
                            <div className='icon-right'>
                                <i className="fas fa-adjust light-icon"></i>
                                <i className="fas fa-user-circle user-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='title1'>Nền tảng y tế</div>
                    <div className='title2'>Chăm sóc sức khỏe toàn diện</div>
                    <div className='get-started'>
                        <button type="button" className="btn detail">View Detail &nbsp; <span><i className="fas fa-chevron-down"></i></span> </button>
                    </div>
                    <div className='options'>
                        <div className='options-child'>
                            <div className='icon-child'><i className="far fa-hospital"></i></div>
                            <div className='text-child'>Khám chuyên khoa</div>
                        </div>
                        <div className='options-child'>
                            <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                            <div className='text-child'>Khám từ xa</div>
                        </div>
                        <div className='options-child'>
                            <div className='icon-child'><i className="fas fa-hospital-alt"></i></div>
                            <div className='text-child'>Khám tổng quát</div>
                        </div>
                        <div className='options-child'>
                            <div className='icon-child'><i className="fas fa-vial"></i></div>
                            <div className='text-child'>Xét nghiệm y học</div>
                        </div>
                        <div className='options-child'>
                            <div className='icon-child'><i className="fas fa-user-shield"></i></div>
                            <div className='text-child'>Sức khỏe tinh thần</div>
                        </div>
                        <div className='options-child'>
                            <div className='icon-child'><i className="far fa-address-card"></i></div>
                            <div className='text-child'>Bài Test Sức Khỏe</div>
                        </div>
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);
