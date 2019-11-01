import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from '../ducks/auth';
import { signIn, signUp, init, signOut, getPermissions } from './auth';

import { TeamsTypes } from '../ducks/teams';
import { getTeams, createTeam, setActiveTeam } from './teams';

import { getProjects, createProject } from './projects';
import { ProjectsTypes } from '../ducks/projects';

import { MembersTypes } from '../ducks/members';
import { getMembers, updateMember, inviteMember } from './members';

export default function* rootSaga() {
  return yield all([
    init(),

    takeLatest(AuthTypes.INIT_CHECK_SUCCESS, getPermissions),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),

    takeLatest(TeamsTypes.GET_TEAMS_REQUEST, getTeams),
    takeLatest(TeamsTypes.CREATE_TEAM_REQUEST, createTeam),
    takeLatest(TeamsTypes.SELECT_TEAM, setActiveTeam),

    takeLatest(TeamsTypes.SELECT_TEAM, getProjects),
    takeLatest(TeamsTypes.SELECT_TEAM, getPermissions),
    takeLatest(ProjectsTypes.GET_PROJECTS_REQUEST, getProjects),
    takeLatest(ProjectsTypes.CREATE_PROJECT_REQUEST, createProject),

    takeLatest(TeamsTypes.SELECT_TEAM, getMembers),
    takeLatest(MembersTypes.GET_MEMBERS_REQUEST, getMembers),
    takeLatest(MembersTypes.UPDATE_MEMBER_REQUEST, updateMember),
    takeLatest(MembersTypes.INVITE_MEMBER_REQUEST, inviteMember),
  ]);
}
