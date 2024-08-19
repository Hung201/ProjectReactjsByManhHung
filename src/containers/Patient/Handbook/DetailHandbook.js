import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailHandbook.scss';
import HeaderHome from '../../HomePage/HeaderHome';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailHandbookById, getAllDoctorService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandbook: {},
            arrDoctor: [],
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailHandbookById({
                id: id,
            });
            if (res && res.errCode === 0) {
                let arrDoctor = res.data;
                this.setState({
                    dataDetailHandbook: res.data,
                })
            }

            let resAllDoctor = await getAllDoctorService();
            if (resAllDoctor && resAllDoctor.errCode === 0) {
                let arrDoctor = resAllDoctor.data;
                this.setState({
                    arrDoctor: arrDoctor,
                })
            }

        }


    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailHandbookById({
                id: id,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    dataDetailSpecialty: res.data,
                })
            }
        }
    }
    render() {
        let { dataDetailHandbook, arrDoctor } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className='detail-handbook-container'>
                    <HeaderHome />
                    <div className='detail-handbook-body'>
                        <div className='description-handbook'>
                            {dataDetailHandbook && !_.isEmpty(dataDetailHandbook)
                                &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailHandbook.descriptionHTML }}>

                                </div>
                            }
                        </div>

                    </div>

                </div>
                <div className='list-doctor'>

                    {arrDoctor && arrDoctor.length > 0 &&
                        arrDoctor.map((item, index) => {
                            return (

                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item.id}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item.id}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item.id}
                                            />
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
