import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils/constant';


class HomeFooter extends Component {


    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2023 Phạm Mạnh Hùng. Thanks for visiting my website. This is my facebook if you need &#8594;
                    <a target='_blank' href='https://www.facebook.com/profile.php?id=100067974010531'> Click here!</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
