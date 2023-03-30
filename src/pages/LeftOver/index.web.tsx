import React, { useState, useContext, createRef, useEffect } from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Picker } from '@react-native-picker/picker';

import styles from './styles';
import IPatient from '../../../typescript/IPatient';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import AttachmentField from '../../components/AttachmentField/index.web';
import masks from '../../utils/masks';
import PatientContext from '../../contexts/patientContext';
import swAlert from '../../utils/alert';
import catchHandler from '../../utils/catchHandler';
import IGroup from '../../../typescript/IGroup';

const LeftOver: React.FC = () => {
  const { goBack } = useNavigation();
  const { uploadProgress, createPatientCall, getGroupsCall } = useContext(
    PatientContext
  );
  const inputIdDocFrontRef = createRef<HTMLInputElement>();
  const inputIdDocVerseRef = createRef<HTMLInputElement>();
  const inputCpfRef = createRef<HTMLInputElement>();
  const inputAddressProofRef = createRef<HTMLInputElement>();
  const inputWorkContractRef = createRef<HTMLInputElement>();

  const [selectedGroup, setSelectedGroup] = useState('');
  const [patient, setPatient] = useState<IPatient>({} as IPatient);
  const [idDocFront, setIdDocFront] = useState<File>();
  const [idDocVerse, setIdDocVerse] = useState<File>();
  const [cpf, setCpf] = useState<File>();
  const [addressProof, setAddressProof] = useState<File>();
  const [workContract, setWorkContract] = useState<File>();
  const [groups, setGroups] = useState<IGroup[]>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const patientParsed = {
      ...patient,
      cpf: masks.numberMask(patient.cpf),
      susCard: patient.susCard ? masks.numberMask(patient.susCard) : undefined,
      phone: masks.numberMask(patient.phone),
    };

    try {
      const msg = await createPatientCall(
        patientParsed,
        '2',
        selectedGroup,
        'false',
        undefined,
        idDocFront,
        idDocVerse,
        cpf,
        addressProof,
        undefined,
        undefined,
        workContract
      );

      swAlert('success', '', msg);
      goBack();
    } catch (err) {
      catchHandler(
        err,
        'Não foi possível efetuar o cadastro. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await getGroupsCall('2');

        setGroups(data);
        setSelectedGroup(data[0].id.toString());
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar os grupos. Tente novamente ou contate o suporte.'
        );
      }
    };

    getGroups();
  }, [getGroupsCall]);

  return (
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
          <Text style={styles.pageTitleText}>Sobra de Doses</Text>
        </View>

        <Text style={styles.fieldsCategory}>Grupo</Text>
        <View style={styles.fields}>
          <Picker
            selectedValue={selectedGroup}
            onValueChange={itemValue => setSelectedGroup(itemValue as string)}
            style={{ width: '100%' }}
          >
            {groups &&
              groups.map(group => (
                <Picker.Item
                  key={group.id}
                  label={group.group}
                  value={group.id.toString()}
                />
              ))}
          </Picker>
        </View>

        <Text style={styles.fieldsCategory}>Dados Gerais</Text>
        <View style={styles.fields}>
          <View style={styles.textInput}>
            <Text style={styles.inputName}>
              Nome Completo <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={patient.name}
              onChange={e =>
                setPatient({ ...patient, name: e.nativeEvent.text })
              }
            />
          </View>

          <View style={styles.textInput}>
            <Text style={styles.inputName}>
              CPF <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={patient.cpf}
              onChange={e =>
                setPatient({
                  ...patient,
                  cpf: masks.cpfMask(e.nativeEvent.text),
                })
              }
            />
          </View>

          <View style={styles.textInput}>
            <Text style={styles.inputName}>Nº Cartão SUS</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={patient.susCard}
              onChange={e =>
                setPatient({
                  ...patient,
                  susCard: masks.susCardMask(e.nativeEvent.text),
                })
              }
            />
          </View>

          <View style={styles.textInput}>
            <Text style={styles.inputName}>
              Telefone para Contato <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="(00) 00000-0000"
              value={patient.phone}
              onChange={e =>
                setPatient({
                  ...patient,
                  phone: masks.phoneMask(e.nativeEvent.text),
                })
              }
            />
          </View>
        </View>

        <Text style={styles.fieldsCategory}>Endereço</Text>
        <View style={styles.fields}>
          <View style={styles.textInput}>
            <Text style={styles.inputName}>
              Rua <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={patient.street}
              onChange={e =>
                setPatient({ ...patient, street: e.nativeEvent.text })
              }
            />
          </View>

          <View style={styles.textInput}>
            <Text style={styles.inputName}>
              Número <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={patient.number}
              onChange={e =>
                setPatient({ ...patient, number: e.nativeEvent.text })
              }
            />
          </View>

          <View style={styles.textInput}>
            <Text style={styles.inputName}>Complemento</Text>
            <TextInput
              style={styles.input}
              value={patient.complement}
              onChange={e =>
                setPatient({ ...patient, complement: e.nativeEvent.text })
              }
            />
          </View>

          <View style={styles.textInput}>
            <Text style={styles.inputName}>
              Referência <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={patient.reference}
              onChange={e =>
                setPatient({ ...patient, reference: e.nativeEvent.text })
              }
            />
          </View>

          <View style={styles.textInput}>
            <Text style={styles.inputName}>
              Bairro <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={patient.neighborhood}
              onChange={e =>
                setPatient({ ...patient, neighborhood: e.nativeEvent.text })
              }
            />
          </View>
        </View>

        <Text style={styles.fieldsCategory}>Anexos</Text>
        <View style={styles.fields}>
          <AttachmentField
            ref={inputIdDocFrontRef}
            field={idDocFront}
            setField={setIdDocFront}
            refClick={() => inputIdDocFrontRef.current?.click()}
            fieldName="Documento de Identidade (Frente)"
            mandatory
          />

          <AttachmentField
            ref={inputIdDocVerseRef}
            field={idDocVerse}
            setField={setIdDocVerse}
            refClick={() => inputIdDocVerseRef.current?.click()}
            fieldName="Documento de Identidade (Verso)"
            mandatory
          />

          <AttachmentField
            ref={inputCpfRef}
            field={cpf}
            setField={setCpf}
            refClick={() => inputCpfRef.current?.click()}
            fieldName="CPF ou Cartão SUS"
            mandatory
          />

          <AttachmentField
            ref={inputAddressProofRef}
            field={addressProof}
            setField={setAddressProof}
            refClick={() => inputAddressProofRef.current?.click()}
            fieldName="Comprovante de Endereço"
            mandatory
          />

          <AttachmentField
            ref={inputWorkContractRef}
            field={workContract}
            setField={setWorkContract}
            refClick={() => inputWorkContractRef.current?.click()}
            fieldName="Contracheque ou Contrato de Trabalho"
            mandatory
          />
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit}>
          <LinearGradient colors={['#2265ac', '#034f9a']} style={styles.submit}>
            <Text style={styles.submitTxt}>Enviar</Text>
          </LinearGradient>
        </TouchableOpacity>

        {loading && (
          <AnimatedCircularProgress
            size={80}
            width={12}
            fill={uploadProgress}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
            style={{ alignSelf: 'center' }}
          />
        )}

        <TouchableOpacity
          style={styles.btnBack}
          activeOpacity={0.5}
          onPress={goBack}
        >
          <Text style={styles.btnBackText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LeftOver;
