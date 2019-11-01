import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsActions from '~/store/ducks/projects';

import Icon from 'react-native-vector-icons/MaterialIcons';

import NewProject from '~/components/NewProject';
import Can from '~/components/Can';

class Projects extends Component {
  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    const { getProjectsRequest, activeTeam } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  toggleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  toggleModalClosed = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { projects, activeTeam } = this.props;
    const { isModalOpen } = this.state;

    if (!activeTeam) return null;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.projectsList}
          data={projects.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.projectContainer}>
              <Text style={styles.projectTitle}>{item.title}</Text>
            </View>
          )}
        />

        <Can checkPermission="projects_create">
          <TouchableOpacity
            style={styles.newProjectButton}
            onPress={this.toggleModalOpen}
          >
            <Icon name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </Can>

        <NewProject
          visible={isModalOpen}
          onRequestClose={this.toggleModalClosed}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  activeTeam: state.teams.active,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ProjectsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  projectsList: {
    padding: 20,
  },

  projectContainer: {
    backgroundColor: 'rgba(0, 0, 0, .4)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 20,
    borderRadius: 5,
    marginBottom: 15,
  },

  projectTitle: {
    fontSize: 14,
    color: '#fff',
  },

  newProjectButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7289da',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginLeft: 330,
    //position: 'absolute',
  },
});
