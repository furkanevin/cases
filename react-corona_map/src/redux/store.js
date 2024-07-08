import { applyMiddleware, createStore } from 'redux';
import statisticsReducer from './statisticsReducer';
import createSagaMiddleware from 'redux-saga';
import statisticsSaga from './sagas/statisticsSaga';

const sagaMiddleware = createSagaMiddleware();

export default createStore(statisticsReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(statisticsSaga);
