import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'center',
  },
  mh250: {
    maxHeight: 250,
  },
  phone: {
    width: 220,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  phoneTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    padding: 8,
    borderRadius: 8,
  },
  closeModal: {
    marginTop: '5%',
    alignSelf: 'flex-end',
    backgroundColor: '#607d8b',
    padding: 8,
    borderRadius: 8,
  },
  closeModalTxt: {
    fontSize: 18,
    color: '#fff',
  },
});

export default styles;
