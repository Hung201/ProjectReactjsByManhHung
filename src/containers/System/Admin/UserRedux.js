import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { LANGUAGES, MANAGE_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css';
import { add } from 'lodash';
import TableManage from './TableManage';


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImage: '',
            isOpen: false,
            action: '',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            userId: ''
        }
    }
    componentDidMount() {
        this.props.fetchGenderStart();
        this.props.fetchRoleStart();
        this.props.fetchPositionStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
            })
        }

        if (prevProps.users !== this.props.users) {
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux
            let arrPositions = this.props.positionRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: MANAGE_ACTIONS.CREATE,
                previewImage: ''
            })
        }


    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImage: objectUrl,
                avatar: base64
            })
        }

    }

    openPreviewImg = () => {
        this.setState({
            isOpen: true
        })
    }

    handleSaveOnClick = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {

            if (this.state.action === MANAGE_ACTIONS.EDIT) {
                //fire redux action
                this.props.editUser({
                    id: this.state.userId,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    avatar: this.state.avatar,
                })
            }

            if (this.state.action === MANAGE_ACTIONS.CREATE) {
                //fire redux action
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    avatar: this.state.avatar
                })
                this.props.fetchAllUsersRedux()
            }

        }

    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
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

    editUserFromParent = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImage: imageBase64,
            action: MANAGE_ACTIONS.EDIT,
            userId: user.id
        })
    }

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let roles = this.props.roleRedux;
        let positions = this.props.positionRedux;
        let { email, password, firstName, lastName, phoneNumber,
            address, gender, position, role, avatar, action } = this.state
        return (
            <>
                <div className="user-redux-container" >
                    <div className='title'>
                        Học React-Redux cùng Mạnh Hùng
                    </div>

                    <div className='user-redux-body'>
                        <div className='row'>
                            <form className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">Thêm mới người dùng</label>
                                </div>
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.email" /></label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        disabled={action === MANAGE_ACTIONS.EDIT}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }} />
                                </div>
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.password" /></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        disabled={action === MANAGE_ACTIONS.EDIT}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }} />
                                </div>
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.first-name" /></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                                </div>
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.last-name" /></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                                </div>
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.phone" /></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                                </div>
                                <div className="col-9">
                                    <label className="form-label"><FormattedMessage id="manage-user.address" /></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }} />
                                </div>
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.gender" /></label>
                                    <select
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
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.position" /></label>
                                    <select
                                        className="form-control"
                                        value={position}
                                        onChange={(event) => { this.onChangeInput(event, 'position') }}>
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.ValueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.role" /></label>
                                    <select
                                        className="form-control"
                                        value={role}
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}>
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.ValueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label className="form-label"><FormattedMessage id="manage-user.image" /></label>
                                    <div className='preview-img-container'>
                                        <input
                                            id='previewImg'
                                            type='file' hidden
                                            onChange={(event) => this.handleOnchangeImage(event)}
                                        />
                                        <label
                                            className='label-upload'
                                            htmlFor='previewImg'
                                        >Tải ảnh <i className="fas fa-upload"></i></label>
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImage})` }}
                                            onClick={() => this.openPreviewImg()}
                                        >
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button
                                        type="button"
                                        className={action === MANAGE_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                        onClick={() => this.handleSaveOnClick()}
                                    >
                                        {action === MANAGE_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* {this.state.isOpen &&
                        <Lightbox
                            mainSrc={this.state.previewImage}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    } */}

                </div>
                <div className='col-12 mb-5'>
                    <TableManage
                        editUserFromParent={this.editUserFromParent}
                    />
                </div>
            </>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        users: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUsersRedux: () => dispatch(actions.fetchAllUserStart()),
        editUser: (data) => dispatch(actions.editUser(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
