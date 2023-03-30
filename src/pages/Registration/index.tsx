import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  launchCameraAsync,
  MediaTypeOptions,
  launchImageLibraryAsync,
} from 'expo-image-picker';
import { getDocumentAsync } from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Provider, RadioButton } from 'react-native-paper';

import styles from './styles';
import IPatient, { IAttachment } from '../../../typescript/IPatient';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import AttachmentField from '../../components/AttachmentField';
import masks from '../../utils/masks';
import PatientContext from '../../contexts/patientContext';
import catchHandler from '../../utils/catchHandler';
import IGroup from '../../../typescript/IGroup';
import IComorbidity from '../../../typescript/IComorbidity';
import CustomPicker from '../../components/CustomPicker';
import CustomPickerModal from '../../components/CustomPickerModal';

const Registration: React.FC = () => {
  const { goBack } = useNavigation();
  const {
    uploadProgress,
    getGroupsCall,
    createPatientCall,
    getComorbiditiesCall,
  } = useContext(PatientContext);

  const [patient, setPatient] = useState<IPatient>({} as IPatient);

  const [idDocFront, setIdDocFront] = useState<IAttachment>();
  const [idDocVerse, setIdDocVerse] = useState<IAttachment>();
  const [cpf, setCpf] = useState<IAttachment>();
  const [addressProof, setAddressProof] = useState<IAttachment>();
  const [medicalReport, setMedicalReport] = useState<IAttachment>();
  const [medicalAuthorization, setMedicalAuthorization] = useState<
    IAttachment
  >();
  const [preNatalCard, setPreNatalCard] = useState<IAttachment>();
  const [puerperalCard, setPuerperalCard] = useState<IAttachment>();
  const [bornAliveDec, setBornAliveDec] = useState<IAttachment>();
  const [workContract, setWorkContract] = useState<IAttachment>();
  const [auxDoc, setAuxDoc] = useState<IAttachment>();

  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<IGroup[]>();
  const [comorbidities, setComorbidities] = useState<IComorbidity[]>();
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedComorbidity, setSelectedComorbidity] = useState('');
  const [renOncImun, setRenOncImun] = useState('0');
  const [comorbidityPatient, setComorbidityPatient] = useState('0');
  const [pickerGroup, setPickerGroup] = useState(false);
  const [pickerComorbidity, setPickerComorbidity] = useState(false);

  const closeModal = () => {
    if (pickerGroup) setPickerGroup(false);
    if (pickerComorbidity) setPickerComorbidity(false);
  };

  const setAttachments = (
    field: number,
    uri: string,
    fileName: string,
    type: string
  ) => {
    switch (field) {
      case 0:
        setIdDocFront({ uri, name: String(fileName), type });
        break;
      case 1:
        setIdDocVerse({ uri, name: String(fileName), type });
        break;
      case 2:
        setCpf({ uri, name: String(fileName), type });
        break;
      case 3:
        setAddressProof({ uri, name: String(fileName), type });
        break;
      case 4:
        setMedicalReport({ uri, name: String(fileName), type });
        break;
      case 5:
        setMedicalAuthorization({ uri, name: String(fileName), type });
        break;
      case 6:
        setPreNatalCard({ uri, name: String(fileName), type });
        break;
      case 7:
        setPuerperalCard({ uri, name: String(fileName), type });
        break;
      case 8:
        setBornAliveDec({ uri, name: String(fileName), type });
        break;
      case 9:
        setWorkContract({ uri, name: String(fileName), type });
        break;
      case 10:
        setAuxDoc({ uri, name: String(fileName), type });
        break;
      default:
        break;
    }
  };

  const pickImageFromCamera = async (field: number) => {
    const result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result;
      const fileName = String(uri.split('/').pop());
      const type = `image/${uri.split('.').pop()}`;

      setAttachments(field, uri, fileName, type);
    }
  };

  const pickImageFromGallery = async (field: number) => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result;
      const fileName = String(uri.split('/').pop());
      const type = `image/${uri.split('.').pop()}`;

      setAttachments(field, uri, fileName, type);
    }
  };

  const pickDocument = async (field: number) => {
    const result = await getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: false,
    });

    if (result.type === 'success') {
      const { uri } = result;
      const fileName = result.name;
      const type = 'application/pdf';

      setAttachments(field, uri, fileName, type);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const patientParsed = {
      ...patient,
      cpf: masks.numberMask(patient.cpf),
      susCard: patient.susCard ? masks.numberMask(patient.susCard) : undefined,
      phone: masks.numberMask(patient.phone),
    };

    const selectedComorbidityParsed =
      comorbidityPatient === '1' ? selectedComorbidity : undefined;

    const renOncImunParsed = renOncImun === '1' ? 'true' : 'false';

    try {
      const msg = await createPatientCall(
        patientParsed,
        '3',
        selectedGroup,
        renOncImunParsed,
        selectedComorbidityParsed,
        idDocFront,
        idDocVerse,
        cpf,
        addressProof,
        medicalReport,
        medicalAuthorization,
        workContract,
        preNatalCard,
        puerperalCard,
        bornAliveDec,
        auxDoc
      );

      Alert.alert('', msg);
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
        const data = await getGroupsCall('3', 'group');

        setGroups(data);
        if (selectedGroup === '') setSelectedGroup(data[0].id.toString());
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar os grupos. Tente novamente ou contate o suporte.'
        );
      }
    };

    getGroups();
  }, [getGroupsCall, selectedGroup]);

  useEffect(() => {
    const getComorbidities = async () => {
      try {
        const data = await getComorbiditiesCall();

        setComorbidities(data);
        if (selectedComorbidity === '')
          setSelectedComorbidity(data[0].id.toString());
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar as comorbidades. Tente novamente ou contate o suporte.'
        );
      }
    };

    if (comorbidityPatient === '1') {
      getComorbidities();
    }
  }, [comorbidityPatient, getComorbiditiesCall, selectedComorbidity]);

  return (
    <>
      <Provider>
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
              <Text style={styles.pageTitleText}>Cadastro</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.fieldsCategory}>Grupo</Text>
              <View style={styles.fields}>
                {groups && (
                  <CustomPicker
                    openModal={() => setPickerGroup(true)}
                    label={
                      groups.find(grp => grp.id.toString() === selectedGroup)
                        ?.group
                    }
                  />
                )}
              </View>

              <Text style={styles.fieldsCategory}>
                Paciente Renal, Oncológico ou Imonussuprimido?
              </Text>
              <View style={styles.radioButtons}>
                <View style={styles.radioButtonItem}>
                  <RadioButton
                    value="0"
                    status={renOncImun === '0' ? 'checked' : 'unchecked'}
                    onPress={() => setRenOncImun('0')}
                    color="#000"
                  />
                  <Text>Não</Text>
                </View>
                <View style={styles.radioButtonItem}>
                  <RadioButton
                    value="1"
                    status={renOncImun === '1' ? 'checked' : 'unchecked'}
                    onPress={() => setRenOncImun('1')}
                    color="#000"
                  />
                  <Text>Sim</Text>
                </View>
              </View>

              <Text style={styles.fieldsCategory}>
                Paciente com Comorbidade?
              </Text>
              <View style={styles.radioButtons}>
                <View style={styles.radioButtonItem}>
                  <RadioButton
                    value="0"
                    status={
                      comorbidityPatient === '0' ? 'checked' : 'unchecked'
                    }
                    onPress={() => setComorbidityPatient('0')}
                    color="#000"
                  />
                  <Text>Não</Text>
                </View>
                <View style={styles.radioButtonItem}>
                  <RadioButton
                    value="1"
                    status={
                      comorbidityPatient === '1' ? 'checked' : 'unchecked'
                    }
                    onPress={() => setComorbidityPatient('1')}
                    color="#000"
                  />
                  <Text>Sim</Text>
                </View>
              </View>

              {comorbidityPatient === '1' && (
                <>
                  <Text style={styles.fieldsCategory}>Comorbidade</Text>
                  <View style={styles.fields}>
                    {comorbidities && (
                      <CustomPicker
                        openModal={() => setPickerComorbidity(true)}
                        label={
                          comorbidities.find(
                            grp => grp.id.toString() === selectedComorbidity
                          )?.comorbidity
                        }
                      />
                    )}
                    <Text style={styles.helperText}>
                      Se sua comorbidade não está na lista, então infelizmente
                      você não está elegível ao cadastro.
                    </Text>
                  </View>
                </>
              )}

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
                    Telefone para Contato{' '}
                    <Text style={styles.mandatory}>*</Text>
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
                      setPatient({
                        ...patient,
                        complement: e.nativeEvent.text,
                      })
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
                      setPatient({
                        ...patient,
                        reference: e.nativeEvent.text,
                      })
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
                      setPatient({
                        ...patient,
                        neighborhood: e.nativeEvent.text,
                      })
                    }
                  />
                </View>
              </View>

              <Text style={styles.fieldsCategory}>Anexos</Text>
              <View style={styles.fields}>
                <AttachmentField
                  field={idDocFront}
                  setField={setIdDocFront}
                  fieldNumber={0}
                  fieldName="Documento de Identidade - Frente"
                  mandatory
                  pickDocument={pickDocument}
                  pickImageFromGallery={pickImageFromGallery}
                  pickImageFromCamera={pickImageFromCamera}
                />

                <AttachmentField
                  field={idDocVerse}
                  setField={setIdDocVerse}
                  fieldNumber={1}
                  fieldName="Documento de Identidade - Verso"
                  mandatory
                  pickDocument={pickDocument}
                  pickImageFromGallery={pickImageFromGallery}
                  pickImageFromCamera={pickImageFromCamera}
                />

                <AttachmentField
                  field={cpf}
                  setField={setCpf}
                  fieldNumber={2}
                  fieldName="CPF ou Cartão SUS"
                  mandatory
                  pickDocument={pickDocument}
                  pickImageFromGallery={pickImageFromGallery}
                  pickImageFromCamera={pickImageFromCamera}
                />

                <AttachmentField
                  field={addressProof}
                  setField={setAddressProof}
                  fieldNumber={3}
                  fieldName="Comprovante de Endereço"
                  mandatory
                  pickDocument={pickDocument}
                  pickImageFromGallery={pickImageFromGallery}
                  pickImageFromCamera={pickImageFromCamera}
                />

                {(comorbidityPatient === '1' || renOncImun === '1') && (
                  <AttachmentField
                    field={medicalReport}
                    setField={setMedicalReport}
                    fieldNumber={4}
                    fieldName="Laudo Médico Atualizado"
                    mandatory
                    pickDocument={pickDocument}
                    pickImageFromGallery={pickImageFromGallery}
                    pickImageFromCamera={pickImageFromCamera}
                  />
                )}

                {renOncImun === '1' && (
                  <AttachmentField
                    field={medicalAuthorization}
                    setField={setMedicalAuthorization}
                    fieldNumber={5}
                    fieldName="Autorização Médica"
                    mandatory
                    pickDocument={pickDocument}
                    pickImageFromGallery={pickImageFromGallery}
                    pickImageFromCamera={pickImageFromCamera}
                  />
                )}

                {groups &&
                  /gestante/i.test(
                    groups.find(grp => grp.id.toString() === selectedGroup)
                      ?.group as string
                  ) && (
                    <AttachmentField
                      field={preNatalCard}
                      setField={setPreNatalCard}
                      fieldNumber={6}
                      fieldName="Cartão de Pré Natal"
                      mandatory
                      pickDocument={pickDocument}
                      pickImageFromGallery={pickImageFromGallery}
                      pickImageFromCamera={pickImageFromCamera}
                    />
                  )}

                {groups &&
                  groups.find(
                    grp =>
                      grp.id.toString() === selectedGroup &&
                      grp.group ===
                        'Gestantes e puérperas a partir de 18 anos COM comorbidades'
                  ) && (
                    <>
                      <AttachmentField
                        field={puerperalCard}
                        setField={setPuerperalCard}
                        fieldNumber={7}
                        fieldName="Cartão de Puérperas"
                        mandatory
                        pickDocument={pickDocument}
                        pickImageFromGallery={pickImageFromGallery}
                        pickImageFromCamera={pickImageFromCamera}
                      />

                      <AttachmentField
                        field={bornAliveDec}
                        setField={setBornAliveDec}
                        fieldNumber={8}
                        fieldName="Declaração de Nascido Vivo"
                        mandatory
                        pickDocument={pickDocument}
                        pickImageFromGallery={pickImageFromGallery}
                        pickImageFromCamera={pickImageFromCamera}
                      />
                    </>
                  )}

                {groups &&
                  /saúde/i.test(
                    groups.find(grp => grp.id.toString() === selectedGroup)
                      ?.group as string
                  ) && (
                    <AttachmentField
                      field={workContract}
                      setField={setWorkContract}
                      fieldNumber={9}
                      fieldName="Contracheque ou Declaração de profissional autônomo autenticada em cartório / Declaração do local de estágio informando atividade exercida"
                      mandatory
                      pickDocument={pickDocument}
                      pickImageFromGallery={pickImageFromGallery}
                      pickImageFromCamera={pickImageFromCamera}
                    />
                  )}

                {groups &&
                  /lactante/i.test(
                    groups.find(grp => grp.id.toString() === selectedGroup)
                      ?.group as string
                  ) && (
                    <>
                      <AttachmentField
                        field={medicalReport}
                        setField={setMedicalReport}
                        fieldNumber={4}
                        fieldName="Declaração Médica de Bebê Amamentando"
                        mandatory
                        pickDocument={pickDocument}
                        pickImageFromGallery={pickImageFromGallery}
                        pickImageFromCamera={pickImageFromCamera}
                      />

                      <AttachmentField
                        field={medicalAuthorization}
                        setField={setMedicalAuthorization}
                        fieldNumber={5}
                        fieldName="Autorização Médica"
                        mandatory
                        pickDocument={pickDocument}
                        pickImageFromGallery={pickImageFromGallery}
                        pickImageFromCamera={pickImageFromCamera}
                      />
                    </>
                  )}

                {groups &&
                  /motorista/i.test(
                    groups.find(grp => grp.id.toString() === selectedGroup)
                      ?.group as string
                  ) && (
                    <AttachmentField
                      field={workContract}
                      setField={setWorkContract}
                      fieldNumber={9}
                      fieldName="Declaração da Empresa Prestadora dos Serviços"
                      mandatory
                      pickDocument={pickDocument}
                      pickImageFromGallery={pickImageFromGallery}
                      pickImageFromCamera={pickImageFromCamera}
                    />
                  )}

                {groups &&
                  (/trabalhadores/i.test(
                    groups.find(grp => grp.id.toString() === selectedGroup)
                      ?.group as string
                  ) ||
                    /caminhoneiros/i.test(
                      groups.find(grp => grp.id.toString() === selectedGroup)
                        ?.group as string
                    ) ||
                    /estagiários/i.test(
                      groups.find(grp => grp.id.toString() === selectedGroup)
                        ?.group as string
                    ) ||
                    groups.find(
                      grp =>
                        grp.id.toString() === selectedGroup &&
                        grp.group === 'Forças de Segurança e Salvamento'
                    )) &&
                  !/saúde/i.test(
                    groups.find(grp => grp.id.toString() === selectedGroup)
                      ?.group as string
                  ) && (
                    <AttachmentField
                      field={workContract}
                      setField={setWorkContract}
                      fieldNumber={9}
                      fieldName="Contracheque ou Contrato de Trabalho / Declaração do local de estágio informando atividade exercida"
                      mandatory
                      pickDocument={pickDocument}
                      pickImageFromGallery={pickImageFromGallery}
                      pickImageFromCamera={pickImageFromCamera}
                    />
                  )}

                {groups &&
                  /deficientes/i.test(
                    groups.find(grp => grp.id.toString() === selectedGroup)
                      ?.group as string
                  ) && (
                    <AttachmentField
                      field={medicalReport}
                      setField={setMedicalReport}
                      fieldNumber={4}
                      fieldName="Laudo Médico"
                      mandatory
                      pickDocument={pickDocument}
                      pickImageFromGallery={pickImageFromGallery}
                      pickImageFromCamera={pickImageFromCamera}
                    />
                  )}

                <AttachmentField
                  field={auxDoc}
                  setField={setAuxDoc}
                  fieldNumber={10}
                  fieldName="Documentação Auxiliar (Certidão de Casamento, Contrato de Aluguel, etc.)"
                  pickDocument={pickDocument}
                  pickImageFromGallery={pickImageFromGallery}
                  pickImageFromCamera={pickImageFromCamera}
                />
              </View>

              <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit}>
                <LinearGradient
                  colors={['#2265ac', '#034f9a']}
                  style={styles.submit}
                >
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
            </ScrollView>
          </View>
        </ImageBackground>

        {groups && (
          <CustomPickerModal
            open={pickerGroup}
            close={closeModal}
            setValue={setSelectedGroup}
            data={groups.map(group => ({
              value: group.id.toString(),
              option: group.group,
            }))}
          />
        )}

        {comorbidities && (
          <CustomPickerModal
            open={pickerComorbidity}
            close={closeModal}
            setValue={setSelectedComorbidity}
            data={comorbidities.map(comorbidity => ({
              value: comorbidity.id.toString(),
              option: comorbidity.comorbidity,
            }))}
          />
        )}
      </Provider>
      <StatusBar style="light" backgroundColor="#ffc816" />
    </>
  );
};

export default Registration;
