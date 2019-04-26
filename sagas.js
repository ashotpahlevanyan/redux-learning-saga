import { put, takeEvery, all, call } from 'redux-saga/effects';

export const delay = (ms) => new Promise(res => setTimeout(res, ms));

// out worker saga will perform the async increment task
export function* incrementAsync() {
	// yield delay(1000); instead of calling directly we will call it
	// indirectly to make subsequent comparison possible
	yield call(delay, 1000);
	yield put({type: 'INCREMENT'})
}

// watch increment saga will watch for async increment
// action and run the increment async saga
export function* watchIncrementAsync() {
	yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export function* helloSaga() {
	console.log('Hello Sagas!');
}

// yields an array of 2 sagas as a result of calling two sagas
// the two resulting generators will be called parallel
// and we need to invoke only one rootSaga in main
export default function* rootSaga() {
	yield all([
		helloSaga(),
		watchIncrementAsync()
	]);
}
