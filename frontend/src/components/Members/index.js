import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersActions from 'store/ducks/members';

import Can from 'components/Can';
import Modal from 'components/Modal';
import Button from 'styles/components/Button';
import api from 'services/api';
import { MembersList, Invite } from './styles';

class Members extends Component {
  static propTypes = {
    closeMembersModal: PropTypes.func.isRequired,
    getMembersRequest: PropTypes.func.isRequired,
    updateMemberRequest: PropTypes.func.isRequired,
    inviteMemberRequest: PropTypes.func.isRequired,
    members: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          user: PropTypes.shape({
            name: PropTypes.string,
          }),
          roles: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              name: PropTypes.string,
            })
          ),
        })
      ),
    }).isRequired,
  };

  state = {
    roles: [],
    invite: '',
  };

  async componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();

    const response = await api.get('roles');

    this.setState({ roles: response.data });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRolesChange = (memberId, roles) => {
    const { updateMemberRequest } = this.props;

    updateMemberRequest(memberId, roles);
  };

  handleInvite = e => {
    e.preventDefault();

    const { inviteMemberRequest } = this.props;
    const { invite } = this.state;

    inviteMemberRequest(invite);
  };

  render() {
    const { closeMembersModal, members } = this.props;
    const { roles, invite } = this.state;

    return (
      <Modal size="big">
        <h1>Member</h1>

        <Can checkRole="administrator">
          <Invite onSubmit={this.handleInvite}>
            <input
              name="invite"
              placeholder="Invite to team"
              onChange={this.handleInputChange}
              value={invite}
            />
            <Button type="submit">Submit</Button>
          </Invite>
        </Can>

        <form>
          <MembersList>
            {members.data.map(member => (
              <li key={member.id}>
                <strong>{member.user.name}</strong>
                <Can checkRole="administrator">
                  {can => (
                    <Select
                      isMulti
                      options={roles}
                      isDisabled={!can}
                      value={member.roles}
                      getOptionLabel={role => role.name}
                      getOptionValue={role => role.id}
                      onChange={value =>
                        this.handleRolesChange(member.id, value)
                      }
                    />
                  )}
                </Can>
              </li>
            ))}
          </MembersList>

          <Button onClick={closeMembersModal} filled={false} color="gray">
            Cancelar
          </Button>
        </form>
      </Modal>
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
