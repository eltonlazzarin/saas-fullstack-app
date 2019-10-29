import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProjectsActions from 'store/ducks/projects';
import MembersActions from 'store/ducks/members';

import Can from 'components/Can';
import Modal from 'components/Modal';
import Members from 'components/Members';
import Button from 'styles/components/Button';

import { Container, Project } from './styles';

class Projects extends Component {
  static propTypes = {
    getProjectsRequest: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    createProjectRequest: PropTypes.func.isRequired,
    openMembersModal: PropTypes.func.isRequired,
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }),
    projects: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
        })
      ),
      projectModalOpen: PropTypes.bool,
    }).isRequired,
    members: PropTypes.shape({
      membersModalOpen: PropTypes.bool,
    }).isRequired,
  };

  static defaultProps = {
    activeTeam: null,
  };

  state = {
    newProject: '',
  };

  componentDidMount() {
    const { activeTeam, getProjectsRequest } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateProject = e => {
    e.preventDefault();

    const { createProjectRequest } = this.props;
    const { newProject } = this.state;

    createProjectRequest(newProject);
  };

  render() {
    const {
      activeTeam,
      projects,
      openProjectModal,
      closeProjectModal,
      openMembersModal,
      members,
    } = this.props;
    const { newProject } = this.state;

    if (!activeTeam) return null;

    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Can checkPermission="projects_create">
              <Button onClick={openProjectModal}>+ New</Button>
            </Can>
            <Button onClick={openMembersModal}>Members</Button>
          </div>
        </header>

        {projects.data.map(project => (
          <Project key={project.id}>
            <p>{project.title}</p>
          </Project>
        ))}

        {projects.projectModalOpen && (
          <Modal>
            <h1>Create project</h1>
            <form onSubmit={this.handleCreateProject}>
              <span>Name</span>
              <input
                name="newProject"
                value={newProject}
                onChange={this.handleInputChange}
              />

              <Button size="big" type="submit">
                Save
              </Button>
              <Button onClick={closeProjectModal} size="small" color="gray">
                Cancel
              </Button>
            </form>
          </Modal>
        )}

        {members.membersModalOpen && <Members />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  projects: state.projects,
  members: state.members,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ProjectsActions, ...MembersActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
