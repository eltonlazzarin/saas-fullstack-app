import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthActions from '~/store/ducks/auth';

class SignIn extends Component {
  static propTypes = {
    signInRequest: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const { signInRequest } = this.props;

    signInRequest(email, password);
  };

  render() {
    const { email, password } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
      >
        <View>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            value={email}
            onChangeText={text => this.setState({ email: text })}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            autoFocus
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            value={password}
            onChangeText={text => this.setState({ password: text })}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType="send"
            ref={el => {
              this.password = el;
            }}
            onSubmitEditing={this.handleSubmit}
          />

          <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353940',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 30,
  },

  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#f6f6f6',
    textAlign: 'center',
  },

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
    fontSize: 20,
    color: '#f6f6f6',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
