import React from 'react';
import { View, TouchableOpacity, Alert, Text, Image } from 'react-native';
import { MaterialIcons as MdIcon, AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import styles from './styles';

interface Props {
  field?: {
    uri: string;
    name: string;
    type: string;
  };
  setField: React.Dispatch<React.SetStateAction<Props['field'] | undefined>>;
  fieldNumber: number;
  fieldName: string;
  mandatory?: boolean;
  pickDocument: (field: number) => Promise<void>;
  pickImageFromGallery: (field: number) => Promise<void>;
  pickImageFromCamera: (field: number) => Promise<void>;
}

const AttachmentField: React.FC<Props> = ({
  field,
  setField,
  fieldNumber,
  fieldName,
  mandatory = false,
  pickDocument,
  pickImageFromGallery,
  pickImageFromCamera,
}) => (
  <View style={styles.textInput}>
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        Alert.alert(
          'Tipo de Arquivo',
          undefined,
          [
            {
              text: 'Documento (PDF)',
              style: 'default',
              onPress: () => pickDocument(fieldNumber),
            },
            {
              text: 'Imagem',
              style: 'default',
              onPress: () =>
                Alert.alert(
                  'Adicionar Imagem...',
                  undefined,
                  [
                    {
                      text: 'Da Galeria',
                      style: 'default',
                      onPress: () => pickImageFromGallery(fieldNumber),
                    },
                    {
                      text: 'Da Câmera',
                      style: 'default',
                      onPress: () => pickImageFromCamera(fieldNumber),
                    },
                  ],
                  { cancelable: true }
                ),
            },
          ],
          { cancelable: true }
        )
      }
    >
      <Text style={styles.inputName}>
        {fieldName} {mandatory && <Text style={styles.mandatory}>*</Text>}
      </Text>
    </TouchableOpacity>
    {field && field.type === 'application/pdf' && (
      <View style={styles.pdf}>
        <View style={{ top: -10 }}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Deseja apagar este arquivo?', undefined, [
                {
                  style: 'cancel',
                  text: 'Cancelar',
                },
                {
                  style: 'destructive',
                  text: 'Apagar',
                  onPress: () => setField(undefined),
                },
              ])
            }
          >
            <MdIcon name="cancel" color="#f44336" size={16} />
          </TouchableOpacity>
        </View>
        <AntDesign name="pdffile1" size={24} color="#000" />
        <Text style={styles.pdfName}>{field.name}</Text>
      </View>
    )}
    {field && field.type !== 'application/pdf' && (
      <View style={styles.img}>
        <Image source={{ uri: field.uri }} style={styles.imgSelected} />
        <View style={{ position: 'absolute', right: 0 }}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Deseja apagar esta imagem?', undefined, [
                {
                  style: 'cancel',
                  text: 'Cancelar',
                },
                {
                  style: 'destructive',
                  text: 'Apagar',
                  onPress: () => setField(undefined),
                },
              ])
            }
          >
            <MdIcon name="cancel" color="#f44336" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    )}
  </View>
);

AttachmentField.propTypes = {
  field: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  setField: PropTypes.func.isRequired,
  fieldNumber: PropTypes.number.isRequired,
  fieldName: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  pickDocument: PropTypes.func.isRequired,
  pickImageFromGallery: PropTypes.func.isRequired,
  pickImageFromCamera: PropTypes.func.isRequired,
};

AttachmentField.defaultProps = {
  field: undefined,
  mandatory: false,
};

export default AttachmentField;
