import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './SignUp.scss';
import { Modal } from 'reactstrap';
import { handleSignUpApi } from '../../services/userService';
import { toast } from "react-toastify";
import { emitter } from '../../utils/emitter';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            isShowHidePassword: false,
            isShowHidePasswordConfirm: false,
            errMessage: '',
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
    handleUserPasswordConfirmOnChangeInput = (event) => {
        this.setState({
            passwordConfirm: event.target.value
        })
    }

    handleSignUpOnClick = async () => {
        if (this.state.password === this.state.passwordConfirm) {
            let res = await handleSignUpApi({
                email: this.state.username,
                password: this.state.password
            })
            if (res && res.errCode === 0) {
                toast.success('Sign up successed!')
                emitter.emit('EVENT_OFF_MODAL')
                this.setState({
                    username: '',
                    password: '',
                    passwordConfirm: ''
                })
            } else if (res && res.errCode === 1) {
                toast.error(res.errMessage)
            }
            else {
                toast.error('Sign up failed!')
            }
        } else {
            toast.error('The password entered is incorrect!')
        }


    }

    handleShowHideOnCLick = () => {
        this.setState({
            isShowHidePassword: !this.state.isShowHidePassword
        })
    }

    handleShowHidePasswordConfirmOnCLick = () => {
        this.setState({
            isShowHidePasswordConfirm: !this.state.isShowHidePasswordConfirm
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLoginOnClick()
        }
    }


    render() {
        let { isOpenModal, closeModalClose, handleKeyDown } = this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                className={'sign-up-modal-container'}
                size=''
                centered
            >
                <div className='sign-up-background'>
                    <div className='sign-up-container'>

                        <div className='sign-up-content row'>
                            <div className='col-12 sign-up-modal-header'>
                                <span className='right'
                                    onClick={closeModalClose}
                                ><i className="fas fa-times"></i></span>
                            </div>
                            <div className='col-12 text-center text-sign-up'>Sign Up</div>
                            <div className='col-12 form-group email'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder="Email"
                                    value={this.state.username}
                                    onChange={(event) => this.handleUserNameOnChangeInput(event)}
                                />
                            </div>
                            <div className='col-12 form-group form-password'>
                                <input type={this.state.isShowHidePassword === true ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder="Password"
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
                            {/* Confirm password */}
                            <div className='col-12 form-group form-password'>
                                <input type={this.state.isShowHidePasswordConfirm === true ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder="Confirm Password"
                                    value={this.state.passwordConfirm}
                                    onChange={(event) => this.handleUserPasswordConfirmOnChangeInput(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}

                                />
                                <div className='eye-show-hide'
                                    onClick={() => this.handleShowHidePasswordConfirmOnCLick()}>
                                    {this.state.isShowHidePasswordConfirm === true ?
                                        <i className="far fa-eye "></i> : <i className="far fa-eye-slash"></i>}
                                </div>
                            </div>
                            <div className='col-12 form-error' >
                                {this.state.errMessage}
                            </div>
                            <div className='col-12 form-btn'>
                                <button
                                    type="button"
                                    className="btn btn-info btn-block btn-round text-white btn-sign-up-content"
                                    onClick={() => this.handleSignUpOnClick()}
                                >Sign Up</button>
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
