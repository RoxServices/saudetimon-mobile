import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import styles from './styles';

interface Props {
  openModal: () => void;
  label?: string;
}

const CustomPicker: React.FC<Props> = ({ openModal, label = '' }) => (
  <TouchableOpacity
    style={styles.touchable}
    onPress={openModal}
    activeOpacity={0.5}
  >
    <Text style={styles.selectedText} numberOfLines={1}>
      {label}
    </Text>
    <Entypo name="chevron-small-down" size={24} color="rgba(56, 53, 53, 0.8)" />
  </TouchableOpacity>
);

CustomPicker.propTypes = {
  openModal: PropTypes.func.isRequired,
  label: PropTypes.string,
};

CustomPicker.defaultProps = {
  label: '',
};

export default CustomPicker;
