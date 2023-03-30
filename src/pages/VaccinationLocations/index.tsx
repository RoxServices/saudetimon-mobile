import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { openURL } from 'expo-linking';
import { AxiosResponse } from 'axios';

import styles from './styles';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import catchHandler from '../../utils/catchHandler';
import IVaccineLocation from '../../../typescript/IVaccineLocation';
import api from '../../services/api';

const VaccinationLocations: React.FC = () => {
  const navigation = useNavigation();
  const [locations, setLocations] = useState<IVaccineLocation[]>();

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response: AxiosResponse<IVaccineLocation[]> = await api.get(
          '/vaccinelocations'
        );

        setLocations(response.data);
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar os locais de vacinação. Tente novamente ou contate o suporte.'
        );
      }
    };

    getLocations();
  }, []);

  return (
    <>
      <ImageBackground
        source={backgroundYellow}
        style={styles.container}
        imageStyle={{ resizeMode: 'repeat' }}
      >
        <View style={styles.logo}>
          <Image source={logoPref} style={styles.logoImg} />
        </View>

        <View style={styles.menu}>
          <View style={styles.pageTitle}>
            <Text style={styles.pageTitleText}>Locais de Vacinação</Text>
          </View>

          {locations && (
            <FlatList
              style={styles.items}
              data={locations}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  activeOpacity={0.5}
                  onPress={() => openURL(item.url)}
                >
                  <Image
                    source={{
                      uri: `${api.defaults.baseURL}/uploads/vacLocPics/${item.picture}`,
                    }}
                    style={styles.itemImg}
                  />
                  <View style={styles.itemTexts}>
                    <Text style={styles.itemTextUpper}>{item.name}</Text>
                    <Text style={styles.itemTextLower}>{item.helperText}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
            />
          )}

          <TouchableOpacity
            style={styles.btnBack}
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnBackText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="light" backgroundColor="#ffc816" />
    </>
  );
};

export default VaccinationLocations;
