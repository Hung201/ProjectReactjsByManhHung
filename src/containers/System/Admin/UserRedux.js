import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { getAllcodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: []
        }
    }
    async componentDidMount() {
        try {
            let res = await getAllcodeService('gender')
            this.setState({
                genders: res.data
            })
            console.log(this.state.genders)
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        let genders = this.state.genders;
        let language = this.props.language;

        return (
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
                                <input type="email" className="form-control" />
                            </div>
                            <div className="col-3">
                                <label className="form-label"><FormattedMessage id="manage-user.password" /></label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="col-3">
                                <label className="form-label"><FormattedMessage id="manage-user.first-name" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-3">
                                <label className="form-label"><FormattedMessage id="manage-user.last-name" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-3">
                                <label className="form-label"><FormattedMessage id="manage-user.phone" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-9">
                                <label className="form-label"><FormattedMessage id="manage-user.address" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-3">
                                <label className="form-label"><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-select">
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} >
                                                    {language === LANGUAGES.VI ? item.ValueVi : item.valueEn}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label className="form-label"><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-select">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label className="form-label"><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-select">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label className="form-label"><FormattedMessage id="manage-user.image" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
