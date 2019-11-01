import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from '~/store/ducks/teams';

import Modal from '~/components/Modal';

class NewTeam extends Component {
  state = {
    newTeam: '',
  };

  handleSubmit = () => {
    const { createTeamRequest, onRequestClose } = this.props;
    const { newTeam } = this.state;

    createTeamRequest(newTeam);
    onRequestClose();
  };

  render() {
    const { visible, onRequestClose } = this.props;
    const { newTeam } = this.state;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>NAME</Text>
        <TextInput
          style={styles.input}
          autoFocus
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={newTeam}
          onChangeText={text => this.setState({ newTeam: text })}
        />

        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>CREATE TEAM</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRequestClose} style={styles.cancel}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(TeamsActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(NewTeam);

const styles = StyleSheet.create({
  label: {
    color: '#f6f6f6',
  },

  input: {
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#fff',
    marginTop: 10,
    borderRadius: 4,
    marginBottom: 10,
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
    color: '#fff',
  },

  cancel: {
    alignItems: 'center',
    marginTop: 20,
  },

  cancelText: {
    color: '#aaa',
  },
});
