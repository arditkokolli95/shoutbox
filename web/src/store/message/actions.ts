import { CALL_API } from "../middleware/api"
import { APIMethod } from '../../shared/request';
import FormData from 'form-data'

export const GETMESSAGESLISTACTIONS = {
  request: 'GETMESSAGESLIST_REQUEST',
  success: 'GETMESSAGESLIST_SUCCESS',
  failure: 'GETMESSAGESLIST_FAILURE',
  clear: 'GETMESSAGESLIST_CLEAR',
  failureMessage: 'Failed to fetch messages',
}

export function getMessages() {
  return {
    [CALL_API]: {
      endpoint: `messages`,
      types: [
        GETMESSAGESLISTACTIONS.request,
        GETMESSAGESLISTACTIONS.success,
        GETMESSAGESLISTACTIONS.failure,
        GETMESSAGESLISTACTIONS.failureMessage
      ],
    },
  }
}
export function cleanMessages() {
  return { type: GETMESSAGESLISTACTIONS.clear }
}

export const GETMESSAGEACTIONS = {
  request: 'GETMESSAGE_REQUEST',
  success: 'GETMESSAGE_SUCCESS',
  failure: 'GETMESSAGE_FAILURE',
  clear: 'GETMESSAGE_CLEAR',
  failureMessage: 'Failed to fetch messages',
}

export function getMessage(id: string) {
  return {
    [CALL_API]: {
      endpoint: `messages/${id}`,
      types: [
        GETMESSAGEACTIONS.request,
        GETMESSAGEACTIONS.success,
        GETMESSAGEACTIONS.failure,
        GETMESSAGEACTIONS.failureMessage
      ],
    },
  }
}
export function cleanMessage() {
  return { type: GETMESSAGEACTIONS.clear }
}

export const POSTMESSAGEACTIONS = {
  request: 'POSTMESSAGE_REQUEST',
  success: 'POSTMESSAGE_SUCCESS',
  failure: 'POSTMESSAGE_FAILURE',
  clear: 'POSTMESSAGE_CLEAR',
  failureMessage: 'Failed to post messages',
}

export function postMessage(form: FormData) {
  return {
    [CALL_API]: {
      endpoint: `messages`,
      method: APIMethod.POST,
      body: form, 
      types: [
        POSTMESSAGEACTIONS.request,
        POSTMESSAGEACTIONS.success,
        POSTMESSAGEACTIONS.failure,
        POSTMESSAGEACTIONS.failureMessage
      ],
    },
  }
}