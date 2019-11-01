import { call, put, select } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { AsyncStorage } from '@react-native-community/async-storage';
import api from '~/services/api';
import NavigationService from '~/services/navigation';

import AuthActions from '../ducks/auth';
import TeamActions from '../ducks/teams';

export function* init() {
  const token = yield call([AsyncStorage, 'getItem'], '@Omni:token');

  if (token) {
    yield put(AuthActions.signInSuccess(token));
  }

  const team = yield call([AsyncStorage, 'getItem'], '@Omni:team');

  if (team) {
    yield put(TeamActions.selectTeam(JSON.parse(team)));
  }

  yield put(AuthActions.initCheckSuccess());
}

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password });

    yield call([AsyncStorage, 'setItem'], '@Omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
    NavigationService.navigate('Main');
  } catch (err) {
    yield put(
      ToastActionsCreators.displayError('Invalid credentials! Check your data')
    );
  }
}

export function* signUp({ name, email, password }) {
  try {
    const response = yield call(api.post, 'users', { name, email, password });

    yield call([AsyncStorage, 'setItem'], '@Omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
  } catch (err) {
    console.log('ERROR');
  }
}

export function* signOut() {
  yield call([AsyncStorage, 'clear']);
}

export function* getPermissions() {
  const signedIn = yield select(state => state.auth.signedIn);
  const team = yield select(state => state.teams.active);

  if (!signedIn || !team) {
    return;
  }

  const response = yield call(api.get, 'permissions');

  const { roles, permissions } = response.data;

  yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}
