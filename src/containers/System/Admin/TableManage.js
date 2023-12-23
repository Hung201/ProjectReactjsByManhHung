import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManage.scss';
import * as actions from "../../../store/actions";

class TableManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        this.props.fetchAllUsersRedux();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                users: this.props.users
            })
        }

    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }

    handleChangeUser = (user) => {
        this.props.editUserFromParent(user)
    }
    render() {
        let users = this.state.users
        return (
            <>
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
                            {users && users.length > 0 &&
                                users.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className='btn-edit'
                                                    onClick={() => this.handleChangeUser(item)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className='btn-delete'
                                                    onClick={() => this.handleDeleteUser(item)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }



                        </tbody>
                    </table>
                </div>
            </>
        );
    };
}



const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManage);
