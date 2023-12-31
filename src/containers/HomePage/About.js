import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils/constant';


class About extends Component {


    render() {


        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về Phạm Mạnh Hùng
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/ddsXMVR7aRI"
                            title="Top EDM | Cho Ngày Dài Mỏi Mệt ♫ Thư Giãn ♫ EMT Music ♫"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        >
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Kiến trúc có tác động mạnh mẽ tới tư duy của con người. Những yếu tố như không gian, màu sắc, thiết kế trang trí,... có ảnh hưởng lớn đến tâm lý và trí não, thay đổi cách suy nghĩ của người sinh hoạt trong môi trường ấy.
                        </p>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
