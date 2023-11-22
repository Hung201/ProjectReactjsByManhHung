import actionTypes from './actionTypes';
import { getAllcodeService, createNewUserService, getAllUsers, deleteUserService, editUserService } from '../../services/userService';
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
            console.log('check res: ', res)
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
                toast.success("Delete a new user  succeed!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            dispatch(deleteUserFailed());
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
            console.log('check res: ', res)
            if (res && res.errCode === 0) {
                toast.success("Change a new user succeed!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(editUserFailed())
            }
        } catch (e) {
            dispatch(editUserFailed());
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
