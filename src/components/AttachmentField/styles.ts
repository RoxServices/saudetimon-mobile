import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  pdf: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfName: {
    marginLeft: 8,
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
});

export default styles;
