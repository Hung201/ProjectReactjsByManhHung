import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowHidePassword: false,
            errMessage: ''
        }
    }
    handleUserNameOnChangeInput = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleUserPasswordOnChangeInput = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLoginOnClick = () => {
        console.log('state: ', this.state)
    }

    handleShowHideOnCLick = () => {
        this.setState({
            isShowHidePassword: !this.state.isShowHidePassword
        })
    }

    handleLoginOnClick = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }


        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.errMessage
                    })
                }
            }

        }

    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLoginOnClick()
        }
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 form-group'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder="Your name..."
                                value={this.state.username}
                                onChange={(event) => this.handleUserNameOnChangeInput(event)}
                            />
                        </div>
                        <div className='col-12 form-group form-password'>
                            <input type={this.state.isShowHidePassword === true ? 'text' : 'password'}
                                className='form-control'
                                placeholder="Your password..."
                                value={this.state.password}
                                onChange={(event) => this.handleUserPasswordOnChangeInput(event)}
                                onKeyDown={(event) => this.handleKeyDown(event)}

                            />
                            <div className='eye-show-hide'
                                onClick={() => this.handleShowHideOnCLick()}>
                                {this.state.isShowHidePassword === true ?
                                    <i className="far fa-eye "></i> : <i className="far fa-eye-slash"></i>}
                            </div>
                        </div>
                        <div className='col-12 form-error' >
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 form-btn'>
                            <button
                                type="button"
                                className="btn btn-info btn-block btn-round text-white btn-login-content"
                                onClick={() => this.handleLoginOnClick()}
                            >Login</button>
                        </div>
                        <div className='col-12 text-muted delimiter text-social-network'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center text-muted delimiter text-social-network">
                            <span> or use a social network</span>
                        </div>
                        <div className='col-12 social-network'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-twitter twitter"></i>
                        </div>
                        <div className="modal-footer d-flex justify-content-center footer-signup">
                            <div className="signup-section">Not a member yet? <a href="#a" className="text-info"> Sign Up</a>.</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
