import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const logoWidth = windowWidth * 0.47;
const logoHeight = logoWidth * 0.3;
const buttonWidth = windowWidth * 0.77;
const buttonHeight = buttonWidth * 0.151351351;
const marginItemsLeft = windowWidth * 0.15;
const marginItemTitle = windowHeight * 0.025;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
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
    top: windowWidth * 0.001,
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
  items: {
    marginLeft: marginItemsLeft,
  },
  textInput: {
    marginBottom: 24,
    width: '80%',
  },
  input: {
    borderColor: 'rgba(56, 53, 53, 0.5)',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  status: {
    textAlign: 'center',
    fontSize: 28,
    color: '#848484',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBackground: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  statusAnalysis: {
    backgroundColor: '#73c2cf',
  },
  statusPreApproved: {
    backgroundColor: '#b7ba1b',
  },
  statusApproved: {
    backgroundColor: '#83bb72',
  },
  statusDenied: {
    backgroundColor: '#cf1312',
  },
  statusText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  statusHelperText: {
    textAlign: 'center',
    color: '#fff',
  },
  statusComplement: {
    alignSelf: 'center',
    width: '80%',
  },
  statusComplementText: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 24,
    fontWeight: '700',
    color: '#777',
  },
  btnUpdate: {
    marginTop: '10%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#034f9a',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnUpdateText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 8,
  },
  btnBack: {
    marginTop: '5%',
    marginBottom: 8,
    width: '40%',
    paddingVertical: 4,
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
