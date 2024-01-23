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
export {
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService,
    getAllcodeService, getTopDoctorHomeService, getAllDoctorService, saveDetailDoctorService,
    getDetailInforDoctorService, getAllCodeService, getScheduleDoctorByDate, saveBulkScheduleDoctor,
    getExtraInforDoctorById, getProfileDoctorById
}