import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import { openURL } from 'expo-linking';
import { FontAwesome } from '@expo/vector-icons';
import ModalWeb from 'modal-react-native-web';
import PropTypes from 'prop-types';
import { AxiosResponse } from 'axios';

import styles from './styles';
import IPhone from '../../../../typescript/IPhone';
import api from '../../../services/api';
import catchHandler from '../../../utils/catchHandler';

interface Props {
  open: boolean;
  close: () => void;
}

const Contact: React.FC<Props> = ({ open, close }) => {
  const [phones, setPhones] = useState<IPhone[]>();

  useEffect(() => {
    const getPhones = async () => {
      try {
        const response: AxiosResponse<IPhone[]> = await api.get('/phones');

        setPhones(response.data);
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar os contatos. Tente novamente ou contate o suporte.'
        );
      }
    };

    getPhones();
  }, []);

  return Platform.OS === 'web' ? (
    <ModalWeb
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={close}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Fale Conosco</Text>
          {phones && (
            <FlatList
              style={styles.mh250}
              data={phones}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.phone}
                  activeOpacity={0.5}
                  onPress={() => openURL(`https://wa.me/55${item.phone}`)}
                >
                  <FontAwesome name="whatsapp" size={24} color="#2dD366" />
                  <Text style={styles.phoneTxt}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
            />
          )}
          <TouchableOpacity
            onPress={close}
            style={styles.closeModal}
            activeOpacity={0.5}
          >
            <Text style={styles.closeModalTxt}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalWeb>
  ) : (
    <Modal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={close}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Fale Conosco</Text>
          {phones && (
            <FlatList
              data={phones}
              style={styles.mh250}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.phone}
                  activeOpacity={0.5}
                  onPress={() => openURL(`https://wa.me/55${item.phone}`)}
                >
                  <FontAwesome name="whatsapp" size={24} color="#2dD366" />
                  <Text style={styles.phoneTxt}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
            />
          )}
          <TouchableOpacity
            onPress={close}
            style={styles.closeModal}
            activeOpacity={0.5}
          >
            <Text style={styles.closeModalTxt}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

Contact.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Contact;
