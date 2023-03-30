import { StyleSheet, Dimensions, Platform } from 'react-native';
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
  helperText: {
    fontSize: 12,
    marginLeft: '3%',
    marginTop: `${Platform.OS === 'web' ? '3%' : '0%'}`,
  },
  items: {
    marginLeft: marginItemsLeft,
  },
  attachmentText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  snackAddAttachment: {
    backgroundColor: 'rgba(56, 53, 53, 0.8)',
    width: '50%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
  },
  snackAddAttachmentTxt: {
    fontSize: 18,
    fontWeight: '700',
  },
  fieldsCategory: {
    textAlign: 'center',
    marginBottom: '2%',
    fontSize: 18,
    color: 'rgba(56, 53, 53, 0.8)',
  },
  fields: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(56, 53, 53, 0.5)',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    marginBottom: '5%',
  },
  textInput: {
    marginBottom: 24,
    width: '100%',
  },
  inputName: {
    fontSize: 18,
    color: 'rgba(56, 53, 53, 0.8)',
  },
  mandatory: {
    color: '#c62828',
  },
  input: {
    borderColor: 'rgba(56, 53, 53, 0.5)',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  img: {
    width: 90,
    marginTop: 8,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    elevation: 5,
    padding: 12,
  },
  imgSelected: {
    width: 64,
    height: 64,
  },
  submit: {
    width: '80%',
    height: buttonHeight,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: '5%',
  },
  submitTxt: {
    color: '#efefef',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  btnBack: {
    marginTop: '5%',
    marginBottom: '10%',
    width: '40%',
    height: 32,
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
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
});

export default styles;
