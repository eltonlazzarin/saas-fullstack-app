import React from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Modal as RNModal,
} from 'react-native';

const Modal = ({ visible, children, onRequestClose }) => (
  <RNModal
    visible={visible}
    animationType="slide"
    transparent
    onRequestClose={onRequestClose}
  >
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={styles.content}>{children}</View>
    </KeyboardAvoidingView>
  </RNModal>
);

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35394050',
    justifyContent: 'center',
  },

  content: {
    backgroundColor: '#C1C1C150',
    paddingHorizontal: 20,
    paddingVertical: 30,
    margin: 20,
    borderRadius: 5,
    alignItems: 'stretch',
  },
});
