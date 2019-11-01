import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MembersActions from '~/store/ducks/members';

import Modal from '~/components/Modal';

class InviteMember extends Component {
  state = {
    email: '',
  };

  handleSubmit = () => {
    const { inviteMemberRequest, onRequestClose } = this.props;
    const { email } = this.state;

    inviteMemberRequest(email);
    onRequestClose();
  };

  render() {
    const { visible, onRequestClose } = this.props;
    const { email } = this.state;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={email}
          onChangeText={text => this.setState({ email: text })}
        />

        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>INVITE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRequestClose} style={styles.cancel}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(InviteMember);

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
