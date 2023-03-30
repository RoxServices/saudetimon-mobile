import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import api from '../../services/api';
import IDoubt from '../../../typescript/IDoubt';
import catchHandler from '../../utils/catchHandler';

const FrequentDoubts: React.FC = () => {
  const { goBack } = useNavigation();
  const [doubts, setDoubts] = useState<IDoubt[]>();

  useEffect(() => {
    const getDoubts = async () => {
      try {
        const response = await api.get('/doubts');

        setDoubts(response.data);
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar as dúvidas frequentes. Tente novamente ou contate o suporte.'
        );
      }
    };

    getDoubts();
  }, []);

  return (
    <>
      <ImageBackground source={backgroundYellow} style={styles.container}>
        <View style={styles.logo}>
          <Image source={logoPref} style={styles.logoImg} />
        </View>

        <View style={styles.menu}>
          <View style={styles.pageTitle}>
            <Text style={styles.pageTitleText}>Dúvidas Frequentes</Text>
          </View>

          {doubts ? (
            <FlatList
              style={styles.doubts}
              data={doubts}
              renderItem={({ item, index }) => (
                <View style={styles.doubt}>
                  <Text style={styles.question}>
                    {index + 1}. {item.question}
                  </Text>
                  <Text style={styles.answer}>{item.answer}</Text>
                </View>
              )}
              keyExtractor={doubt => doubt.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <ActivityIndicator size={40} color="#034f9a" />
          )}

          <TouchableOpacity
            style={styles.btnBack}
            activeOpacity={0.5}
            onPress={goBack}
          >
            <Text style={styles.btnBackText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="light" backgroundColor="#ffc816" />
    </>
  );
};

export default FrequentDoubts;
