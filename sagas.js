import { put, takeEvery, all } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

// out worker saga will perform the async increment task
export function* incrementAsync() {
	yield delay(1000);
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

export default function* rootSaga() {
	yield all([
		helloSaga(),
		watchIncrementAsync()
	]);
}
