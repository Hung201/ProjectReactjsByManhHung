import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import UserModal from './UserModal';
import { emitter } from '../../utils/emitter';
import UserEditModal from './UserEditModal';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditModal: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact()
    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL')
        this.setState({
            arrUsers: response.users
        })
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }



    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal: false
                })
                emitter.emit('EVENT_CLEAR_MODAL')
            }
        } catch (e) {
            console.log(e)
        }

    }

    handleDeleteUser = async (user) => {
        console.log(user)
        try {
            let res = await deleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleChangeUser = (user) => {
        this.setState({
            isOpenEditModal: true,
            userEdit: user
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }

    userAfterChange = async (user) => {
        console.log('check data: ', user)
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenEditModal: false
                })
                await this.getAllUserFromReact()
            }
            else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <UserModal
                    isOpen={this.state.isOpenModal}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditModal &&
                    <UserEditModal
                        isOpen={this.state.isOpenEditModal}
                        toggleUserModal={this.toggleUserEditModal}
                        userEdit={this.state.userEdit}
                        userAfterChange={this.userAfterChange}
                    />
                }
                <div className='users-title text-center my-3'>
                    Manage Users
                </div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-user-plus"></i> Add a new user
                    </button>
                </div>
                <div className='users-content'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">Address</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button onClick={() => this.handleDeleteUser(item)}>Delete</button>
                                            <button onClick={() => this.handleChangeUser(item)}>Change</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    };
}



const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
