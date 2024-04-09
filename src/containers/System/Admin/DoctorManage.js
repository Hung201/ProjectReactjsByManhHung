import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManage.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './DoctorManage.scss';
import Select from 'react-select';
import { MANAGE_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctorService } from '../../../services/userService';




const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,



            //save to doctor infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            listClinic: [],


            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',


            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.getAllRequiredDoctorInfor();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE")
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY")
            let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC")


            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            let { resPrice, resPayment, resProvince, resClinic } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE")
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT")
            let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
            let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC")

            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listClinic: dataSelectClinic
            })
        }



    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.ValueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.ValueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }

            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }
        return result
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkDown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? MANAGE_ACTIONS.EDIT : MANAGE_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
        if (this.props.saveDetailDoctorSuccess()) {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                selectedOption: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedClinic: '',
                selectedSpecialty: ''
            })
        }

    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedOption
        })

        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
        let res = await getDetailInforDoctorService(selectedOption.value);
        console.log('check res: ', res)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '', specialtyId = '', clinicId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '', selectedClinic = '',
                selectedSpecialty = '';


            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedClinic: ''
            })
        }
    };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let statename = name.name;
        let stateCopy = { ...this.state };
        stateCopy[statename] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }


    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { hasOldData, listSpecialty, listClinic } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            name="selectedSpecialty"
                        />                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>


                <button
                    onClick={() => this.handleSaveContentMarkDown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
                    {hasOldData === true ?
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </span> : <span>
                            <FormattedMessage id="admin.manage-doctor.add" />
                        </span>
                    }
                </button>
            </div>
        );
    };
}



const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctorSuccess: () => dispatch(actions.saveDetailDoctorSuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManage);
