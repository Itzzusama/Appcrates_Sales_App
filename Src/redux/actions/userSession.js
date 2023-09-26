import {
  USER_LOGIN_INFO,
  INTERVIEW_DATA,
  LEAD_DATA,
  TEST_TASK_DATA,
} from './types';

export const loginuserInfo = payload => ({
  type: USER_LOGIN_INFO,
  payload,
});
export const interviewData = payload => ({
  type: INTERVIEW_DATA,
  payload,
});
export const leadData = payload => ({
  type: LEAD_DATA,
  payload,
});
export const testTaskData = payload => ({
  type: TEST_TASK_DATA,
  payload,
});
