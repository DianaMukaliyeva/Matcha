import matchService from '../services/matchService';

import { GET_MATCH, MATCH_ERROR, FETCH_MORE_MATCH, FILTER_UPDATE, FILTER_RESET } from './types';
import store from '../store';

// Get current user profile
export const getRecommend = (route, filterIsOn) => async (dispatch) => {
    const page = route.split('/')[2];

    const data =
        filterIsOn > 0 ? (page === 'filter' ? store.getState().match.filter : { type: page }) : {};

    try {
        const result =
            filterIsOn > 0
                ? await matchService.matchFilter(data)
                : await matchService.getMatch(route);
        dispatch({
            type: GET_MATCH,
            payload: result,
        });
    } catch (err) {
        dispatch({
            type: MATCH_ERROR,
            payload: { msg: err },
        });
    }
};

// Get more matches for gallery
export const fetchMore = () => (dispatch) => {
    dispatch({
        type: FETCH_MORE_MATCH,
    });
};

// Reset filter to max values
export const resetFilter = () => (dispatch) => {
    dispatch({
        type: FILTER_RESET,
    });
};

// Update filter parameter
export const updateFilter = (filter) => (dispatch) => {
    dispatch({
        type: FILTER_UPDATE,
        payload: filter,
    });
};
