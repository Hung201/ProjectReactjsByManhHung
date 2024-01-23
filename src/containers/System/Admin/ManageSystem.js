import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSystem.scss';


class ManageSystem extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        return (
            <div classNameName='manage-system-container'>
                <div className='manage-system-content'>
                    <div className="toggle">
                        <div className="logo">
                            Hung
                        </div>
                        <div className="close" id="close-btn">
                            <span className="material-icons-sharp">
                                close
                            </span>
                        </div>
                    </div>
                    <div className="sidebar">
                        <a href="#">
                            <span className="material-icons-sharp">
                                person_outline
                            </span>
                            <h3>Users</h3>
                        </a>

                        <a href="#" className="active">
                            <span className="material-icons-sharp">
                                insights
                            </span>
                            <h3>Analytics</h3>
                        </a>
                        <a href="#">
                            <span className="material-symbols-outlined">
                                schedule
                            </span>
                            <h3>Schedule</h3>
                        </a>
                        <a href="#">
                            <span className="material-icons-sharp">
                                mail_outline
                            </span>
                            <h3>Tickets</h3>
                            <span className="message-count">27</span>
                        </a>
                        <a href="#">
                            <span className="material-icons-sharp">
                                settings
                            </span>
                            <h3>Settings</h3>
                        </a>
                        <a href="#">
                            <span className="material-icons-sharp">
                                add
                            </span>
                            <h3>New Login</h3>
                        </a>
                        <a href="#">
                            <span className="material-icons-sharp">
                                logout
                            </span>
                            <h3>Logout</h3>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSystem);
