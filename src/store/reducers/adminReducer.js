import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //gender
        case actionTypes.FETCH_GENDER_START:

            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state }
            copyState.genders = action.data
            return {
                ...copyState,
            }

        case actionTypes.FETCH_GENDER_FAILED:

            return {
                ...state,
            }

        //role
        case actionTypes.FETCH_ROLE_START:

            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:

            state.roles = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAILED:

            return {
                ...state,
            }
        //positon
        case actionTypes.FETCH_POSITION_START:

            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:

            state.positions = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAILED:

            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:

            state.users = action.users
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_FAILED:

            state.users = []
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;