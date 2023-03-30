import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const logoWidth = windowWidth * 0.68;
const logoHeight = (logoWidth * 7) / 16;
const buttonWidth = windowWidth * 0.77;
const buttonHeight = buttonWidth * 0.151351351;
const handHeight = windowHeight * 0.75;
const handWidth = handHeight * 1.08575804;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  rectanglesTop: {
    height: '1%',
    flexDirection: 'row',
  },
  rectangle1: {
    width: '25%',
    height: '100%',
    backgroundColor: '#ffc410',
  },
  rectangle2: {
    width: '25%',
    height: '100%',
    backgroundColor: '#71c3cf',
  },
  rectangle3: {
    width: '25%',
    height: '100%',
    backgroundColor: '#82bc72',
  },
  rectangle4: {
    width: '25%',
    height: '100%',
    backgroundColor: '#045199',
  },
  logo: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: logoWidth,
    height: logoHeight,
    maxWidth: 490,
    maxHeight: 200,
  },
  mainContent: {
    flex: 1,
    marginTop: '6%',
    backgroundColor: '#efefef',
    borderTopStartRadius: windowWidth * 0.25,
    borderTopEndRadius: windowWidth * 0.25,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  hand: {
    position: 'absolute',
    width: handWidth,
    height: handHeight,
    right: 0,
  },
  buttons: {
    alignItems: 'flex-end',
    marginBottom: '10%',
  },
  btnStart: {
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: '5%',
  },
  btnStartTxt: {
    color: '#efefef',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  btnDoubts: {
    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: '5%',
  },
  btnDoubtsTxt: {
    color: '#81ba75',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  btnPhones: {
    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: '#81ba75',
    justifyContent: 'center',
    borderRadius: 6,
  },
  btnPhonesTxt: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default styles;
