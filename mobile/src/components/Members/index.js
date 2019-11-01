import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersActions from '~/store/ducks/members';

import Icon from 'react-native-vector-icons/MaterialIcons';

import InviteMember from '~/components/InviteMember';
import RoleUpdater from '~/components/RoleUpdater';
import Can from '~/components/Can';

class Members extends Component {
  state = {
    isInviteModalOpen: false,
    isRoleModalOpen: false,
    memberEdit: null,
  };

  UNSAFE_componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();
  }

  toggleInviteModalOpen = () => {
    this.setState({ isInviteModalOpen: true });
  };

  toggleInviteModalClosed = () => {
    this.setState({ isInviteModalOpen: false });
  };

  toggleRoleModalOpen = member => {
    this.setState({ isInviteModalOpen: true, memberEdit: member });
  };

  toggleRoleModalClosed = () => {
    this.setState({ isInviteModalOpen: false, memberEdit: null });
  };

  render() {
    const { members } = this.props;
    const { isInviteModalOpen, isRoleModalOpen, memberEdit } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>MEMBERS</Text>

        <FlatList
          style={styles.memberList}
          data={members.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.memberContainer}>
              <Text style={styles.memberName}>{item.user.name}</Text>

              <Can checkRole="administrator">
                <TouchableOpacity
                  hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                  onPress={() => this.toggleRoleModalOpen(item)}
                >
                  <Icon name="settings" size={20} color="#b0b0b0" />
                </TouchableOpacity>
              </Can>
            </View>
          )}
          ListFooterComponent={() => (
            <Can checkPermission="invites_create">
              <TouchableOpacity
                style={styles.button}
                onPress={this.toggleInviteModalOpen}
              >
                <Text style={styles.buttonText}>Invite</Text>
              </TouchableOpacity>
            </Can>
          )}
        />

        {memberEdit && (
          <RoleUpdater
            visible={isRoleModalOpen}
            onRequestClose={this.toggleRoleModalClosed}
            member={memberEdit}
          />
        )}

        <Can checkPermission="invites_create">
          <InviteMember
            visible={isInviteModalOpen}
            onRequestClose={this.toggleInviteModalClosed}
          />
        </Can>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Members);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 20,
    paddingTop: getStatusBarHeight() + 25,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  memberList: {
    marginTop: 20,
  },

  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  memberName: {
    color: '#fff',
    fontSize: 16,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#7289da',
    borderRadius: 4,
    marginTop: 5,
  },

  buttonText: {
    fontSize: 20,
    color: '#f6f6f6',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
