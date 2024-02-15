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
            <div className='theme'>
                <div className='manage-system-container'>
                    <div className='manage-system-content'>
                        <div className='content-left'>
                            <div className="toggle">
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
                                <a href="#" className='log-out'>
                                    <span className="material-icons-sharp">
                                        logout
                                    </span>
                                    <h3>Logout</h3>
                                </a>
                            </div>
                        </div>
                        <div className='content-mid'>
                            <h1>Analytics</h1>
                            <div class="analyse">
                                <div class="sales">
                                    <div class="status">
                                        <div class="info">
                                            <h3>Total Sales</h3>
                                            <h1>$65,024</h1>
                                        </div>
                                        <div class="progresss">
                                            <svg>
                                                <circle cx="38" cy="38" r="36"></circle>
                                            </svg>
                                            <div class="percentage">
                                                <p>+81%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="visits">
                                    <div class="status">
                                        <div class="info">
                                            <h3>Site Visit</h3>
                                            <h1>24,981</h1>
                                        </div>
                                        <div class="progresss">
                                            <svg>
                                                <circle cx="38" cy="38" r="36"></circle>
                                            </svg>
                                            <div class="percentage">
                                                <p>-48%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="searches">
                                    <div class="status">
                                        <div class="info">
                                            <h3>Searches</h3>
                                            <h1>14,147</h1>
                                        </div>
                                        <div class="progresss">
                                            <svg>
                                                <circle cx="38" cy="38" r="36"></circle>
                                            </svg>
                                            <div class="percentage">
                                                <p>+21%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
