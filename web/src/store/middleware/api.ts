import request from "../../shared/request";

const CALL_API = Symbol('DATA API')

const middleware = () => (next: any) => async(action: any) => {
  const ACTION_API = action[CALL_API]

  // if it's not an api action then there's no need to try to make a request
  if (ACTION_API === undefined) {
    return next(action)
  }

  const {
    endpoint,
    method,
    body,
    types,
  } = ACTION_API

  const [
    requestType,
    successType,
    errorType,
    failureMessage,
  ] = types

  next({ type: requestType })

  try {
    const response = await request(endpoint, method, body)

    if (response.status !== 200) {
      throw new Error('Invalid response from api')
    }

    return next({
      response,
      type: successType,
    })
  } catch (error) {
    return next({
      error,
      message:failureMessage,
      type: errorType,
    })
  }
}

export { CALL_API, middleware }
export default middleware
