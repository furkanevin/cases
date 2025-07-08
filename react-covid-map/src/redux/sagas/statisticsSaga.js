import { call, put, takeEvery } from 'redux-saga/effects';
import { getData } from '../../service';

function* fetchData(action) {
  try {
    yield put({ type: 'DATA_FETCH_PENDING' });

    const data = yield call(getData, action);

    if (data) {
      yield put({ type: 'DATA_FETCH_SUCCEEDED', payload: data });
    } else {
      yield put({
        type: 'DATA_FETCH_FAILED',
        payload: 'No data available for the selected country.',
      });
    }
  } catch (e) {
    yield put({ type: 'DATA_FETCH_FAILED', payload: e.message });
  }
}

function* statisticsSaga() {
  yield takeEvery('DATA_FETCH_REQUESTED', fetchData);
}

export default statisticsSaga;
