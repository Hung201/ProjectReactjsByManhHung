import actionTypes from './actionTypes';
import {
    getAllcodeService, createNewUserService, getAllUsers, deleteUserService,
    editUserService, getTopDoctorHomeService, getAllDoctorService, saveDetailDoctorService,
    getAllCodeService, getAllSpecialty,
    getAllClinic
} from '../../services/userService';
import { toast } from "react-toastify";


export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService("ROLE");

            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', e)
        }
    }

}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService("POSITION");

            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchRoleStart error', e)
        }
    }

}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                // toast.success("Create a new user  succeed!")
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            dispatch(fetchAllUserFailed());
            console.log('fetchAllUserFailed error', e)
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.fetchAllUserFailed
})

export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(id);
            if (res && res.errCode === 0) {
                toast.success("Delete a user  succeed!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Delete a user failed!")
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            toast.error("Delete a user failed!")
            console.log('deleteUserFailed error', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Change a new user succeed!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(editUserFailed())
                toast.error("Change a new user failed!")
            }
        } catch (e) {
            dispatch(editUserFailed());
            toast.error("Change a new user failed!")
            console.log('editUserFailed error', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data))
            } else {
                dispatch(fetchTopDoctorFailed())
            }
        } catch (e) {
            dispatch(fetchTopDoctorFailed());
            console.log('fetchTopDoctorFailed error', e)
        }
    }
}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctor: data
})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
})


export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data))
            } else {
                dispatch(fetchAllDoctorFailed())
            }
        } catch (e) {
            dispatch(fetchAllDoctorFailed());
            console.log('fetchAllDoctorFailed error', e)
        }
    }
}

export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    allDoctor: data
})

export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
})


export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            if (res && res.errCode === 0) {
                toast.success("Save infor detail doctor succeed!")

                dispatch(saveDetailDoctorSuccess())
            } else {
                toast.error("Save infor detail doctor error!")
                dispatch(saveDetailDoctorFailed())
            }
        } catch (e) {
            toast.error("Save infor detail doctor error!")
            console.log('SAVE_DETAIL_DOCTOR_FAILED: ', e)
            dispatch(saveDetailDoctorFailed())
        }
    }
}

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
})

export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
})

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch(fetchAllScheduleTimeSuccess(res.data))
            } else {
                dispatch(fetchAllScheduleTimeFailed())
            }
        } catch (e) {
            console.log('FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTime: data
})

export const fetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAILED
})

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFailed())
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchGenderStart error', e)
        }
    }

}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})