import {
    CREATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    UPDATE_BlOCKED,
} from '../actions/types';

const initialState = {
    profile: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PROFILE:
            localStorage.setItem('token', payload.tkn);
            return {
                ...state,
                loading: true,
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case UPDATE_PROFILE:
            const updatedProfile = state.profile;
            let { key, value } = payload;
            updatedProfile[[key]] = value;
            return {
                ...state,
                profile: updatedProfile,
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case UPDATE_BlOCKED:
            const profile = state.profile;
            profile.blocked = payload;
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
