import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamActions from '~/store/ducks/teams';

import Icon from 'react-native-vector-icons/MaterialIcons';

import NewTeam from '~/components/NewTeam';

class TeamSwitcher extends Component {
  static propTypes = {
    getTeamsRequest: PropTypes.func.isRequired,
    teams: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        })
      ),
    }).isRequired,
  };

  state = {
    isModalOpen: false,
  };

  UNSAFE_componentDidMount() {
    const { getTeamsRequest } = this.props;

    getTeamsRequest();
  }

  toggleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  toggleModalClosed = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { teams, selectTeam } = this.props;
    const { isModalOpen } = this.state;

    return (
      <View style={styles.container}>
        {teams.data.map(team => (
          <TouchableOpacity
            key={team.id}
            style={styles.teamContainer}
            onPress={() => selectTeam(team)}
          >
            <Image
              style={styles.teamAvatar}
              source={{
                uri: `https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${team.name}`,
              }}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.newTeam} onPress={this.toggleModalOpen}>
          <Icon name="add" size={24} color="#999" />
        </TouchableOpacity>

        <NewTeam
          visible={isModalOpen}
          onRequestClose={this.toggleModalClosed}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(TeamActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamSwitcher);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 10,
    paddingTop: getStatusBarHeight() + 25,
  },

  teamContainer: {
    marginBottom: 10,
  },

  teamAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  newTeam: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
