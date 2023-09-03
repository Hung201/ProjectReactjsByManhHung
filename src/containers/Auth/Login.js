import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: '',
            isShowHidePassword: false
        }
    }
    handleUserNameOnChangeInput = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    handleUserPasswordOnChangeInput = (event) => {
        this.setState({
            userPassword: event.target.value
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
                                value={this.state.userName}
                                onChange={(event) => this.handleUserNameOnChangeInput(event)}
                            />
                        </div>
                        <div className='col-12 form-group form-password'>
                            <input type={this.state.isShowHidePassword === true ? 'text' : 'password'}
                                className='form-control'
                                placeholder="Your password..."
                                value={this.state.userPassword}
                                onChange={(event) => this.handleUserPasswordOnChangeInput(event)}
                            />
                            <div className='eye-show-hide'
                                onClick={() => this.handleShowHideOnCLick()}>
                                {this.state.isShowHidePassword === true ?
                                    <i className="far fa-eye "></i> : <i class="far fa-eye-slash"></i>}
                            </div>
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
                        <div class="col-12 text-center text-muted delimiter text-social-network">
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
