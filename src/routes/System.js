import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import DoctorManage from '../containers/System/Admin/DoctorManage';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManageHandbook from '../containers/System/Handbook/ManageHandbook';
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {/* <Route path="/system/user-manage" component={UserManage} /> */}
                            <Route path="/system/crud-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={DoctorManage} />
                            <Route path="/system/specialist-manage" component={ManageSpecialty} />
                            <Route path="/system/clinic-manage" component={ManageClinic} />
                            <Route path="/system/handbook-manage" component={ManageHandbook} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
