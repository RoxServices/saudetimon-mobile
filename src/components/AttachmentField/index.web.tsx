import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign, MaterialIcons as MdIcon } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import styles from './styles';
import swAlert from '../../utils/alert';

interface Props {
  field?: File;
  setField: React.Dispatch<React.SetStateAction<File | undefined>>;
  refClick(): void;
  fieldName: string;
  mandatory?: boolean;
  filesAccepted?: string;
}

const AttachmentField = forwardRef<HTMLInputElement, Props>(
  (
    {
      field,
      setField,
      refClick,
      fieldName,
      mandatory,
      filesAccepted = 'application/pdf, image/*',
    },
    ref
  ) => (
    <View style={styles.textInput}>
      <TouchableOpacity activeOpacity={0.5} onPress={refClick}>
        <Text style={styles.inputName}>
          {fieldName} {mandatory && <Text style={styles.mandatory}>*</Text>}
        </Text>
      </TouchableOpacity>
      <input
        type="file"
        hidden
        ref={ref}
        accept={filesAccepted}
        onChange={e => setField(e.target.files ? e.target.files[0] : undefined)}
      />
      {field && field.type === 'application/pdf' && (
        <View style={styles.pdf}>
          <View style={{ top: -10 }}>
            <TouchableOpacity
              onPress={() =>
                swAlert(
                  'question',
                  '',
                  'Deseja apagar este arquivo?',
                  'Apagar',
                  true,
                  'Cancelar',
                  '#f44336'
                ).then(result => {
                  if (result.isConfirmed) setField(undefined);
                })
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
          <Image
            source={{ uri: URL.createObjectURL(field) }}
            style={styles.imgSelected}
          />
          <View style={{ position: 'absolute', right: 0 }}>
            <TouchableOpacity
              onPress={() =>
                swAlert(
                  'question',
                  '',
                  'Deseja apagar esta imagem?',
                  'Apagar',
                  true,
                  'Cancelar',
                  '#f44336'
                ).then(result => {
                  if (result.isConfirmed) setField(undefined);
                })
              }
            >
              <MdIcon name="cancel" color="#f44336" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
);

AttachmentField.propTypes = {
  field: PropTypes.instanceOf(File),
  setField: PropTypes.func.isRequired,
  refClick: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  filesAccepted: PropTypes.string,
};

AttachmentField.defaultProps = {
  field: undefined,
  mandatory: false,
  filesAccepted: 'application/pdf, image/*',
};

export default AttachmentField;
