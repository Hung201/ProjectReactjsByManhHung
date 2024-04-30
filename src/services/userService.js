import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (idInput) => {
    return axios.get(`/api/get-all-users?id=${idInput}`)
}

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

const deleteUserService = (userId) => {
    return axios.delete("/api/delete-user", {
        data: {
            id: userId
        }
    });
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/get-allcodes?type=${inputType}`, { type: inputType })
}

const editUserService = (user) => {
    return axios.put("api/edit-user", user);
}

const getAllcodeService = (type) => {
    return axios.get(`/api/get-allcodes?type=${type}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctor`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}

const getDetailInforDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postPatientBookingAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}
const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}
const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}
const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-all-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}
export {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService,
    getAllcodeService, getTopDoctorHomeService, getAllDoctorService, saveDetailDoctorService,
    getDetailInforDoctorService, getAllCodeService, getScheduleDoctorByDate, saveBulkScheduleDoctor,
    getExtraInforDoctorById, getProfileDoctorById, postPatientBookingAppointment, postVerifyBookAppointment,
    createNewSpecialty, getAllSpecialty, getDetailSpecialtyById, createNewClinic,
    getAllClinic, getDetailClinicById, getAllPatientForDoctor, postSendRemedy
}