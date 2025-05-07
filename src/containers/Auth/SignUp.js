import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './SignUp.scss';
import { Modal } from 'reactstrap';
import { handleSignUpApi } from '../../services/userService';
import { toast } from "react-toastify";
import { emitter } from '../../utils/emitter';
import { LANGUAGES } from '../../utils';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            isShowHidePassword: false,
            isShowHidePasswordConfirm: false,
            errMessage: '',
        }
    }
    componentDidMount() {
        this.props.fetchGenderStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            })
        }
        if (prevProps.users !== this.props.users) {
            let arrGenders = this.props.genderRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            })
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


    checkValidateInput = () => {
        let isValid = true;
        let arrChecks = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        let arrAlert = [];
        let point = 0;
        for (let i = 0; i < arrChecks.length; i++) {
            if (!this.state[arrChecks[i]]) {
                point++
                isValid = false;
                arrAlert.push(arrChecks[i])
            }
        }
        if (point !== 0) {
            alert('This input is required: ' + arrAlert)
        }
        return isValid
    }
    handleSignUpOnClick = async () => {

        let res = await handleSignUpApi({
            email: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
        })
        if (res && res.errCode === 0) {
            toast.success('Sign up successed!')
            emitter.emit('EVENT_OFF_MODAL')
            this.setState({
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '',
            })
        } else if (res && res.errCode === 1) {
            toast.error(res.errMessage)
        }
        else {
            toast.error('Sign up failed!')
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
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }


    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let { isOpenModal, closeModalClose, handleKeyDown } = this.props;
        let { email, password, firstName, lastName, phoneNumber,
            address, gender } = this.state
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
                            <div className="col-6">
                                <input
                                    placeholder="First Name"
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>
                            <div className="form-ln col-6">
                                <input
                                    placeholder="Last Name"
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>
                            <div className="col-12">
                                <input
                                    placeholder="Phone"
                                    type="text"
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className="col-12">
                                <input
                                    placeholder="Address"
                                    type="text"
                                    className="form-control"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>
                            <div className="col-6">
                                <select
                                    placeholder='Gender'
                                    className="form-control"
                                    value={gender}
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.ValueVi : item.valueEn}
                                                </option>
                                            )
                                        })}
                                </select>
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
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
