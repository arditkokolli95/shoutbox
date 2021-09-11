import { GETMESSAGESLISTACTIONS, GETMESSAGEACTIONS } from "./actions";
import {
  ListReducerGenerator,
  ObjReducerGenerator,
  defaultClearArrayState,
  defaultClearObjState
} from "../../shared/ReducerGenerator";
import { Action } from '../../shared/ReducerTypes';

function getMessagesState (state = defaultClearArrayState, action: Action) {
  return ListReducerGenerator(GETMESSAGESLISTACTIONS, state, action)
};

function getMessageState (state = defaultClearObjState, action: Action) {
  return ObjReducerGenerator(GETMESSAGEACTIONS, state, action)
};

export default {
    getMessagesState,
    getMessageState,
};
