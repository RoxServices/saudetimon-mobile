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
import { useNavigation, RouteProp } from '@react-navigation/native';
import {
  launchCameraAsync,
  MediaTypeOptions,
  launchImageLibraryAsync,
} from 'expo-image-picker';
import { getDocumentAsync } from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PropTypes from 'prop-types';

import styles from './styles';
import IPatient, { IAttachment } from '../../../typescript/IPatient';
import backgroundYellow from '../../images/backgroundYellow.png';
import logoPref from '../../images/logoPref.png';
import AttachmentField from '../../components/AttachmentField';
import masks from '../../utils/masks';
import PatientContext from '../../contexts/patientContext';
import catchHandler from '../../utils/catchHandler';

interface Params {
  cpf: string;
  category: string;
  group: string;
}

interface Props {
  route: RouteProp<{ params: Params }, 'params'>;
}

const UpdateRegistration: React.FC<Props> = ({ route }) => {
  const { goBack, reset } = useNavigation();
  const { cpf, group } = route.params;
  const { getPatientCall, updatePatientCall, uploadProgress } = useContext(
    PatientContext
  );

  const [patient, setPatient] = useState<IPatient>({} as IPatient);
  const [idDocFront, setIdDocFront] = useState<IAttachment>();
  const [idDocVerse, setIdDocVerse] = useState<IAttachment>();
  const [cpfAttachment, setCpfAttachment] = useState<IAttachment>();
  const [addressProof, setAddressProof] = useState<IAttachment>();
  const [medicalReport, setMedicalReport] = useState<IAttachment>();
  const [medicalAuthorization, setMedicalAuthorization] = useState<
    IAttachment
  >();
  const [workContract, setWorkContract] = useState<IAttachment>();
  const [preNatalCard, setPreNatalCard] = useState<IAttachment>();
  const [puerperalCard, setPuerperalCard] = useState<IAttachment>();
  const [bornAliveDec, setBornAliveDec] = useState<IAttachment>();
  const [auxDoc, setAuxDoc] = useState<IAttachment>();

  const [loading, setLoading] = useState(false);
  const [editableFields, setEditableFields] = useState({
    name: false,
    cpf: false,
    susCard: false,
    phone: false,
    street: false,
    number: false,
    complement: false,
    reference: false,
    neighborhood: false,
  });

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
        setCpfAttachment({ uri, name: String(fileName), type });
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
        setWorkContract({ uri, name: String(fileName), type });
        break;
      case 7:
        setPreNatalCard({ uri, name: String(fileName), type });
        break;
      case 8:
        setPuerperalCard({ uri, name: String(fileName), type });
        break;
      case 9:
        setBornAliveDec({ uri, name: String(fileName), type });
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

    try {
      if (patient.id) {
        const msg = await updatePatientCall(
          patient.id.toString(),
          patientParsed,
          idDocFront,
          idDocVerse,
          cpfAttachment,
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
        reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        });
      }
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
    const getPatient = async () => {
      try {
        const data = await getPatientCall(cpf);

        setPatient({
          ...data,
          cpf: masks.cpfMask(data.cpf),
          susCard: data.susCard ? masks.susCardMask(data.susCard) : undefined,
          phone: masks.phoneMask(data.phone),
          number: data.number.toString(),
        });
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar os dados cadastrados. Tente novamente ou contate o suporte.'
        );
      }
    };

    getPatient();
  }, [cpf, getPatientCall]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={backgroundYellow} style={styles.container}>
          <View style={styles.logo}>
            <Image source={logoPref} style={styles.logoImg} />
          </View>

          <View style={styles.menu}>
            <View style={styles.pageTitle}>
              <Text style={styles.pageTitleText}>Atualizar Cadastro</Text>
            </View>

            <Text style={styles.fieldsCategory}>Dados Gerais</Text>
            <View style={styles.fields}>
              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Nome Completo <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
                  <TextInput
                    style={styles.input}
                    value={patient.name}
                    onChange={e =>
                      setPatient({ ...patient, name: e.nativeEvent.text })
                    }
                    editable={editableFields.name}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, name: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  CPF <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
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
                    editable={editableFields.cpf}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, cpf: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>Nº Cartão SUS</Text>
                <View>
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
                    editable={editableFields.susCard}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, susCard: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Telefone para Contato <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
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
                    editable={editableFields.phone}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, phone: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={styles.fieldsCategory}>Endereço</Text>
            <View style={styles.fields}>
              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Rua <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
                  <TextInput
                    style={styles.input}
                    value={patient.street}
                    onChange={e =>
                      setPatient({ ...patient, street: e.nativeEvent.text })
                    }
                    editable={editableFields.street}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, street: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Número <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={patient.number as string}
                    onChange={e =>
                      setPatient({ ...patient, number: e.nativeEvent.text })
                    }
                    editable={editableFields.number}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, number: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>Complemento</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    value={patient.complement}
                    onChange={e =>
                      setPatient({ ...patient, complement: e.nativeEvent.text })
                    }
                    editable={editableFields.complement}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, complement: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Referência <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
                  <TextInput
                    style={styles.input}
                    value={patient.reference}
                    onChange={e =>
                      setPatient({ ...patient, reference: e.nativeEvent.text })
                    }
                    editable={editableFields.reference}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({ ...editableFields, reference: true })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.textInput}>
                <Text style={styles.inputName}>
                  Bairro <Text style={styles.mandatory}>*</Text>
                </Text>
                <View>
                  <TextInput
                    style={styles.input}
                    value={patient.neighborhood}
                    onChange={e =>
                      setPatient({
                        ...patient,
                        neighborhood: e.nativeEvent.text,
                      })
                    }
                    editable={editableFields.neighborhood}
                  />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.editButton}
                    onPress={() =>
                      setEditableFields({
                        ...editableFields,
                        neighborhood: true,
                      })
                    }
                  >
                    <Feather name="edit" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={styles.fieldsCategory}>Anexos</Text>
            <View style={styles.fields}>
              <AttachmentField
                field={idDocFront}
                setField={setIdDocFront}
                fieldNumber={0}
                fieldName="Documento de Identidade - Frente"
                pickDocument={pickDocument}
                pickImageFromGallery={pickImageFromGallery}
                pickImageFromCamera={pickImageFromCamera}
              />

              <AttachmentField
                field={idDocVerse}
                setField={setIdDocVerse}
                fieldNumber={1}
                fieldName="Documento de Identidade - Verso"
                pickDocument={pickDocument}
                pickImageFromGallery={pickImageFromGallery}
                pickImageFromCamera={pickImageFromCamera}
              />

              <AttachmentField
                field={cpfAttachment}
                setField={setCpfAttachment}
                fieldNumber={2}
                fieldName="CPF ou Cartão SUS"
                pickDocument={pickDocument}
                pickImageFromGallery={pickImageFromGallery}
                pickImageFromCamera={pickImageFromCamera}
              />

              <AttachmentField
                field={addressProof}
                setField={setAddressProof}
                fieldNumber={3}
                fieldName="Comprovante de Endereço"
                pickDocument={pickDocument}
                pickImageFromGallery={pickImageFromGallery}
                pickImageFromCamera={pickImageFromCamera}
              />

              {(patient.idComorbidity || patient.renOncImun) && (
                <AttachmentField
                  field={medicalReport}
                  setField={setMedicalReport}
                  fieldNumber={4}
                  fieldName="Laudo Médico Atualizado"
                  pickDocument={pickDocument}
                  pickImageFromGallery={pickImageFromGallery}
                  pickImageFromCamera={pickImageFromCamera}
                />
              )}

              {patient.renOncImun && (
                <AttachmentField
                  field={medicalAuthorization}
                  setField={setMedicalAuthorization}
                  fieldNumber={5}
                  fieldName="Autorização Médica"
                  pickDocument={pickDocument}
                  pickImageFromGallery={pickImageFromGallery}
                  pickImageFromCamera={pickImageFromCamera}
                />
              )}

              {/gestante/i.test(group) && (
                <AttachmentField
                  field={preNatalCard}
                  setField={setPreNatalCard}
                  fieldNumber={7}
                  fieldName="Cartão de Pré Natal"
                  pickDocument={pickDocument}
                  pickImageFromGallery={pickImageFromGallery}
                  pickImageFromCamera={pickImageFromCamera}
                />
              )}

              {group ===
                'Gestantes e puérperas a partir de 18 anos COM comorbidades' && (
                <>
                  <AttachmentField
                    field={puerperalCard}
                    setField={setPuerperalCard}
                    fieldNumber={8}
                    fieldName="Cartão de Puérperas"
                    pickDocument={pickDocument}
                    pickImageFromGallery={pickImageFromGallery}
                    pickImageFromCamera={pickImageFromCamera}
                  />

                  <AttachmentField
                    field={bornAliveDec}
                    setField={setBornAliveDec}
                    fieldNumber={9}
                    fieldName="Declaração de Nascido Vivo"
                    pickDocument={pickDocument}
                    pickImageFromGallery={pickImageFromGallery}
                    pickImageFromCamera={pickImageFromCamera}
                  />
                </>
              )}

              {/saúde/i.test(group) && (
                <AttachmentField
                  field={workContract}
                  setField={setWorkContract}
                  fieldNumber={6}
                  fieldName="Contracheque ou Declaração de profissional autônomo autenticada em cartório / Declaração do local de estágio"
                  pickDocument={pickDocument}
                  pickImageFromGallery={pickImageFromGallery}
                  pickImageFromCamera={pickImageFromCamera}
                />
              )}

              {/lactante/i.test(group) && (
                <>
                  <AttachmentField
                    field={medicalReport}
                    setField={setMedicalReport}
                    fieldNumber={4}
                    fieldName="Declaração Médica de Bebê Amamentando"
                    pickDocument={pickDocument}
                    pickImageFromGallery={pickImageFromGallery}
                    pickImageFromCamera={pickImageFromCamera}
                  />

                  <AttachmentField
                    field={medicalAuthorization}
                    setField={setMedicalAuthorization}
                    fieldNumber={5}
                    fieldName="Autorização Médica"
                    pickDocument={pickDocument}
                    pickImageFromGallery={pickImageFromGallery}
                    pickImageFromCamera={pickImageFromCamera}
                  />
                </>
              )}

              {/motorista/i.test(group) && (
                <AttachmentField
                  field={workContract}
                  setField={setWorkContract}
                  fieldNumber={6}
                  fieldName="Declaração da Empresa Prestadora dos Serviços"
                  pickDocument={pickDocument}
                  pickImageFromGallery={pickImageFromGallery}
                  pickImageFromCamera={pickImageFromCamera}
                />
              )}

              {(/trabalhadores/i.test(group) ||
                /caminhoneiros/i.test(group) ||
                /estagiários/i.test(group) ||
                group === 'Forças de Segurança e Salvamento') &&
                !/saúde/i.test(group) && (
                  <AttachmentField
                    field={workContract}
                    setField={setWorkContract}
                    fieldNumber={6}
                    fieldName="Contracheque ou Contrato de Trabalho / Declaração do local de estágio informando atividade exercida"
                    pickDocument={pickDocument}
                    pickImageFromGallery={pickImageFromGallery}
                    pickImageFromCamera={pickImageFromCamera}
                  />
                )}

              {/deficientes/i.test(group) && (
                <AttachmentField
                  field={medicalReport}
                  setField={setMedicalReport}
                  fieldNumber={4}
                  fieldName="Laudo Médico"
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
          </View>
        </ImageBackground>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#ffc816" />
    </>
  );
};

UpdateRegistration.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  route: PropTypes.any.isRequired,
};

export default UpdateRegistration;
