import {CLEAR_ERRORS, SET_CURRENT_TOKENS} from "./types";
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
        payload: null
    }
};