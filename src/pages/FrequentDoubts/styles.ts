import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const logoWidth = windowWidth * 0.47;
const logoHeight = logoWidth * 0.3;
const buttonWidth = windowWidth * 0.77;
const buttonHeight = buttonWidth * 0.151351351;
const marginItemTitle = windowHeight * 0.025;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    resizeMode: 'cover',
  },
  logo: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15%',
  },
  logoImg: {
    width: logoWidth,
    height: logoHeight,
  },
  menu: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderTopStartRadius: windowWidth * 0.25,
    borderTopEndRadius: windowWidth * 0.25,
  },
  pageTitle: {
    top: '-3%',
    alignSelf: 'center',
    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: '#034f9a',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: marginItemTitle,
  },
  pageTitleText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  doubts: {
    marginHorizontal: '15%',
  },
  doubt: {
    marginBottom: '5%',
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7a7a7a',
  },
  answer: {
    fontSize: 16,
    color: '#9f9f9f',
  },
  btnBack: {
    marginTop: '5%',
    marginBottom: '10%',
    width: '40%',
    height: '5%',
    backgroundColor: '#73c2cf',
    borderTopEndRadius: 4,
    borderBottomEndRadius: 4,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  btnBackText: {
    marginRight: '12%',
    color: '#085188',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default styles;
