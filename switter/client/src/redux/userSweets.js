import { getUserSweets } from "../api";
import { receiveSweets } from "./sweets";
import { normalizeSweets, getSweetIds } from "../helper";

const FETCHING_USER_SWEETS = "FETCHING_USER_SWEETS";
const RECEIVE_USER_SWEETIDS = "RECEIVE_USER_SWEETIDS";

const fetchingUserSweets = () => {
  return {
    type: FETCHING_USER_SWEETS
  };
};

const receiveUserSweetIds = (uid, sweetIds) => {
  return {
    type: RECEIVE_USER_SWEETIDS,
    uid,
    sweetIds
  };
};

export const receiveUserSweets = uid => async dispatch => {
  dispatch(fetchingUserSweets());
  const userSweets = await getUserSweets(uid);
  const normalizedUserSweets = normalizeSweets(userSweets);
  const userSweetIds = getSweetIds(userSweets);
  dispatch(receiveSweets(normalizedUserSweets));
  dispatch(receiveUserSweetIds(uid, userSweetIds));
};

const initialState = {
  isFetching: false
};

const userSweets = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER_SWEETS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_USER_SWEETIDS:
      return {
        ...state,
        isFetching: false,
        [action.uid]: action.sweetIds
      };
    default:
      return state;
  }
};

export default userSweets;
