export interface ActionType {
  request: string;
  success: string;
  failure: string;
  clear: string;
  failureMessage: string;
};

export interface ListState {
  isFetching: boolean;
  result: [];
  success: boolean;
}

export interface Action {
  type: string;
  response: { result: any };
}

export interface SingleState {
  isFetching: boolean;
  result: any;
  success: boolean
}