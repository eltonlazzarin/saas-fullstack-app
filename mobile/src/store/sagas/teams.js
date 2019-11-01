import { call, put } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { AsyncStorage } from '@react-native-community/async-storage';
import api from '~/services/api';

import TeamsActions from '~/store/ducks/teams';

export function* getTeams() {
  const response = yield call(api.get, 'teams');

  yield put(TeamsActions.getTeamsSuccess(response.data));
}

export function* createTeam({ name }) {
  try {
    const response = yield call(api.post, 'teams', { name });

    yield put(TeamsActions.createTeamSuccess(response.data));
    yield put(TeamsActions.closeTeamModal());
    yield put(ToastActionsCreators.displayInfo('Team created'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Error creating team'));
  }
}

export function* setActiveTeam({ team }) {
  yield call([AsyncStorage, 'setItem'], '@Omni:team', JSON.stringify(team));
}
