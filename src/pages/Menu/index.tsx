import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import bedridden from '../../images/bedridden.png';
import registration from '../../images/registration.png';
import check from '../../images/check.png';
import vacLoc from '../../images/vacLoc.png';

const Menu: React.FC = () => {
  const { navigate, goBack } = useNavigation();

  return (
    <>
      <ImageBackground
        source={backgroundYellow}
        style={styles.container}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.logo}>
          <Image source={logoPref} style={styles.logoImg} />
        </View>

        <View style={styles.menu}>
          <View style={styles.pageTitle}>
            <Text style={styles.pageTitleText}>Menu</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.items}>
              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() => navigate('BedRidden')}
              >
                <Image source={bedridden} style={styles.itemImg} />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>Pacientes Acamados</Text>
                  <Text style={styles.itemTextLower}>
                    Cadastro para pacientes acamados
                  </Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() => navigate('LeftOver')}
              >
                <Image source={leftover} style={styles.itemImg} />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>Sobra de Doses</Text>
                  <Text style={styles.itemTextLower}>
                    Cadastro para sobra de doses
                  </Text>
                </View>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() => navigate('Registration')}
              >
                <Image source={registration} style={styles.itemImg} />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>Cadastro</Text>
                  <Text style={styles.itemTextLower}>
                    Cadastro Geral para Grupos Prioritários
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() => navigate('StatusCheck')}
              >
                <Image source={check} style={styles.itemImg} />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>Checagem</Text>
                  <Text style={styles.itemTextLower}>
                    Verifique o status da sua solicitação
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.5}
                onPress={() => navigate('VaccinationLocations')}
              >
                <Image source={vacLoc} style={styles.itemImg} />
                <View style={styles.itemTexts}>
                  <Text style={styles.itemTextUpper}>Locais de Vacinação</Text>
                  <Text style={styles.itemTextLower}>
                    Clique para visualizar o local no mapa
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btnBack}
              activeOpacity={0.5}
              onPress={goBack}
            >
              <Text style={styles.btnBackText}>Voltar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
      <StatusBar style="light" backgroundColor="#ffc816" />
    </>
  );
};

export default Menu;
