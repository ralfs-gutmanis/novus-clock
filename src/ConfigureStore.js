import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import {
  enableVibration,
  enableSound,
  setTimerMax,
  setBonusTime,
  setMinimumTime,
} from './config/Reducers';
import {
  updateCurrentPlayer,
  updateHistory,
  isGameStarted,
  isGameFinished,
} from './game/Reducers';

const allReducers = combineReducers({
  vibrationEnabled: enableVibration,
  soundEnabled: enableSound,
  timerMax: setTimerMax,
  bonusTime: setBonusTime,
  minimumTime: setMinimumTime,
  activePlayerIndex: updateCurrentPlayer,
  history: updateHistory,
  isGameStarted,
  isGameFinished,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export default () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
