import {
  USER_LOGIN_INFO,
  INTERVIEW_DATA,
  LEAD_DATA,
  TEST_TASK_DATA,
} from '../actions/types';

const INITIAL_STATE = {
  loginInfo: [],
  interviewsData: [],
  leadsData: [],
  testTasksData: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGIN_INFO:
      return {
        ...state,
        loginInfo: action.payload,
      };
    case INTERVIEW_DATA:
      return {
        ...state,
        interviewsData: action.payload,
      };
    case LEAD_DATA:
      return {
        ...state,
        leadsData: action.payload,
      };
    case TEST_TASK_DATA:
      return {
        ...state,
        testTasksData: action.payload,
      };
    default:
      return state;
  }
}
