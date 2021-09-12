import { GETMESSAGESLISTACTIONS, GETMESSAGEACTIONS } from "../store/message/actions";
import { ActionType, ListState, Action, SingleState } from './ReducerTypes';

const defaultClearArrayState: ListState = {
  isFetching: false,
  result: [],
  success: false,
}

const defaultClearObjState: SingleState = {
  isFetching: false,
  result: { },
  success: false,
}

const ListReducerGenerator = (actionType: ActionType, state: ListState, action: Action) => {
  switch (action.type) {
    case actionType.request:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case actionType.success:
      const { result } = action.response
      return Object.assign({}, state, {
        isFetching: false,
        result,
        success: true,
      })
    case actionType.failure:
      return Object.assign({}, state, {
        isFetching: false,
        success: false,
      })
    case actionType.clear:
      return defaultClearArrayState
    default:
      return Object.assign({}, state)
  }
}

const ObjReducerGenerator = (actionType: ActionType, state: SingleState, action: Action) => {
  switch (action.type) {
    case actionType.request:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case actionType.success:
      const {
        result,
      } = action.response
      return Object.assign({}, state, {
        isFetching: false,
        result,
        success: true,
      })
    case actionType.failure:
      return Object.assign({}, state, {
        isFetching: false,
        success: false,
      })
    case actionType.clear:
      return defaultClearObjState
    default:
      return Object.assign({}, state)
  }
}


export {
  ListReducerGenerator,
  ObjReducerGenerator,
  defaultClearArrayState,
  defaultClearObjState,
}