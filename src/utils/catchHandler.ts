import { AxiosResponse } from 'axios';
import { Platform, Alert } from 'react-native';

import swAlert from './alert';

interface Err extends Error {
  response?: AxiosResponse<{ msg: string }>;
}

const catchHandler = (err: Err, errMsg: string): void => {
  if (Platform.OS === 'web') {
    if (err.message === 'Network Error') {
      swAlert(
        'error',
        'Erro',
        'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.'
      );
    } else if (err.response) {
      swAlert('error', 'Erro', err.response.data.msg);
    } else {
      swAlert('error', 'Erro', errMsg);
    }
  } else if (err.message === 'Network Error') {
    Alert.alert(
      'Erro',
      'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.'
    );
  } else if (err.response) {
    Alert.alert('Erro', err.response.data.msg);
  } else {
    Alert.alert('Erro', errMsg);
  }
};

export default catchHandler;
