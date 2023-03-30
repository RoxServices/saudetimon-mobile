import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';

import styles from './styles';

interface Props {
  open: boolean;
  close: () => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data: {
    option: string;
    value: string;
  }[];
}

const CustomPickerModal: React.FC<Props> = ({
  open,
  close,
  setValue,
  data,
}) => (
  <Portal>
    <Modal
      visible={open}
      onDismiss={close}
      contentContainerStyle={styles.content}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            activeOpacity={0.5}
            onPress={() => {
              setValue(item.value);
              close();
            }}
          >
            <Text style={styles.optionTxt}>{item.option}</Text>
            <View style={styles.hr} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.value}
      />
    </Modal>
  </Portal>
);

CustomPickerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      option: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default CustomPickerModal;
