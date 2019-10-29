import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from 'services/api';

import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, 'members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, { roles: roles.map(role => role.id) });

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Updated member',
        message: 'Member successfully updated',
      })
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Operation error',
        message: 'There was an error, try again!',
      })
    );
  }
}

export function* inviteMember({ email }) {
  try {
    yield call(api.post, 'invites', { invites: [email] });

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Invitation sent',
        message: 'We sent you an invitation to join the team',
      })
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Operation error',
        message: 'There was an error, try again!',
      })
    );
  }
}
