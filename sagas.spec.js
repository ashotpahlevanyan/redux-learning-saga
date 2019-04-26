import test from 'tape';

import { put, call } from 'redux-saga/effects';
import { incrementAsync, delay } from "./sagas";

test('incrementAsync saga', (assert) => {
	const gen = incrementAsync();

	assert.deepEqual(
		gen.next().value,
		call(delay, 1000),
		'increment async saga must call delay(1000)'
	//previously ? 'incrementAsync should return a Promise that will resolve after 1 second'
	);

	assert.deepEqual(
		gen.next().value,
		put({ type: 'INCREMENT'}),
		'incrementAsync saga must dispatch an increment action'
	);

	assert.deepEqual(
		gen.next(),
		{ done: true, value: undefined },
		'increment async saga must be done'
	);

	assert.end();
});