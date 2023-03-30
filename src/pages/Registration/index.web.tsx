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
import { RadioButton } from 'react-native-paper';

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
import IComorbidity from '../../../typescript/IComorbidity';

const Registration: React.FC = () => {
  const { goBack } = useNavigation();
  const {
    uploadProgress,
    createPatientCall,
    getGroupsCall,
    getComorbiditiesCall,
  } = useContext(PatientContext);
  const inputIdDocFrontRef = createRef<HTMLInputElement>();
  const inputIdDocVerseRef = createRef<HTMLInputElement>();
  const inputCpfRef = createRef<HTMLInputElement>();
  const inputAddressProofRef = createRef<HTMLInputElement>();
  const inputMedicalReportRef = createRef<HTMLInputElement>();
  const inputMedicalAuthorizationRef = createRef<HTMLInputElement>();
  const inputPreNatalCardRef = createRef<HTMLInputElement>();
  const inputPuerperalCardRef = createRef<HTMLInputElement>();
  const inputBornAliveDecRef = createRef<HTMLInputElement>();
  const inputWorkContractRef = createRef<HTMLInputElement>();
  const inputAuxDocRef = createRef<HTMLInputElement>();

  const [selectedGroup, setSelectedGroup] = useState('');
  const [patient, setPatient] = useState<IPatient>({} as IPatient);

  const [idDocFront, setIdDocFront] = useState<File>();
  const [idDocVerse, setIdDocVerse] = useState<File>();
  const [cpf, setCpf] = useState<File>();
  const [addressProof, setAddressProof] = useState<File>();
  const [medicalReport, setMedicalReport] = useState<File>();
  const [medicalAuthorization, setMedicalAuthorization] = useState<File>();
  const [preNatalCard, setPreNatalCard] = useState<File>();
  const [puerperalCard, setPuerperalCard] = useState<File>();
  const [bornAliveDec, setBornAliveDec] = useState<File>();
  const [workContract, setWorkContract] = useState<File>();
  const [auxDoc, setAuxDoc] = useState<File>();

  const [groups, setGroups] = useState<IGroup[]>();
  const [loading, setLoading] = useState(false);
  const [renOncImun, setRenOncImun] = useState('0');
  const [comorbidities, setComorbidities] = useState<IComorbidity[]>();
  const [selectedComorbidity, setSelectedComorbidity] = useState('');
  const [comorbidityPatient, setComorbidityPatient] = useState('0');

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
        const data = await getGroupsCall('3', 'group');

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

  useEffect(() => {
    const getComorbidities = async () => {
      try {
        const data = await getComorbiditiesCall();

        setComorbidities(data);
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
  }, [comorbidityPatient, getComorbiditiesCall]);

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
          <Text style={styles.pageTitleText}>Cadastro</Text>
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

        <Text style={styles.fieldsCategory}>Paciente com Comorbidade?</Text>
        <View style={styles.radioButtons}>
          <View style={styles.radioButtonItem}>
            <RadioButton
              value="0"
              status={comorbidityPatient === '0' ? 'checked' : 'unchecked'}
              onPress={() => setComorbidityPatient('0')}
              color="#000"
            />
            <Text>Não</Text>
          </View>
          <View style={styles.radioButtonItem}>
            <RadioButton
              value="1"
              status={comorbidityPatient === '1' ? 'checked' : 'unchecked'}
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
              <Picker
                selectedValue={selectedComorbidity}
                onValueChange={itemValue =>
                  setSelectedComorbidity(itemValue as string)
                }
                style={{ width: '100%' }}
              >
                {comorbidities &&
                  comorbidities.map(comorbidity => (
                    <Picker.Item
                      key={comorbidity.id}
                      label={comorbidity.comorbidity}
                      value={comorbidity.id.toString()}
                    />
                  ))}
              </Picker>
              <Text style={styles.helperText}>
                Se sua comorbidade não está na lista, então infelizmente você
                não está elegível ao cadastro.
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

          {(comorbidityPatient === '1' || renOncImun === '1') && (
            <AttachmentField
              ref={inputMedicalReportRef}
              field={medicalReport}
              setField={setMedicalReport}
              refClick={() => inputMedicalReportRef.current?.click()}
              fieldName="Laudo Médico Atualizado"
              mandatory
            />
          )}

          {renOncImun === '1' && (
            <AttachmentField
              ref={inputMedicalAuthorizationRef}
              field={medicalAuthorization}
              setField={setMedicalAuthorization}
              refClick={() => inputMedicalAuthorizationRef.current?.click()}
              fieldName="Autorização Médica"
              mandatory
            />
          )}

          {groups &&
            /gestante/i.test(
              groups.find(grp => grp.id.toString() === selectedGroup)
                ?.group as string
            ) && (
              <AttachmentField
                ref={inputPreNatalCardRef}
                field={preNatalCard}
                setField={setPreNatalCard}
                refClick={() => inputPreNatalCardRef.current?.click()}
                fieldName="Cartão de Pré Natal"
                mandatory
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
                  ref={inputPuerperalCardRef}
                  field={puerperalCard}
                  setField={setPuerperalCard}
                  refClick={() => inputPuerperalCardRef.current?.click()}
                  fieldName="Cartão de Puérperas"
                  mandatory
                />

                <AttachmentField
                  ref={inputBornAliveDecRef}
                  field={bornAliveDec}
                  setField={setBornAliveDec}
                  refClick={() => inputBornAliveDecRef.current?.click()}
                  fieldName="Declaração de Nascido Vivo"
                  mandatory
                />
              </>
            )}

          {groups &&
            /saúde/i.test(
              groups.find(grp => grp.id.toString() === selectedGroup)
                ?.group as string
            ) && (
              <AttachmentField
                ref={inputWorkContractRef}
                field={workContract}
                setField={setWorkContract}
                refClick={() => inputWorkContractRef.current?.click()}
                fieldName="Contracheque ou Declaração de profissional autônomo autenticada em cartório / Declaração do local de estágio"
                mandatory
              />
            )}

          {groups &&
            /lactante/i.test(
              groups.find(grp => grp.id.toString() === selectedGroup)
                ?.group as string
            ) && (
              <>
                <AttachmentField
                  ref={inputMedicalReportRef}
                  field={medicalReport}
                  setField={setMedicalReport}
                  refClick={() => inputMedicalReportRef.current?.click()}
                  fieldName="Declaração Médica de Bebê Amamentando"
                  mandatory
                />

                <AttachmentField
                  ref={inputMedicalAuthorizationRef}
                  field={medicalAuthorization}
                  setField={setMedicalAuthorization}
                  refClick={() => inputMedicalAuthorizationRef.current?.click()}
                  fieldName="Autorização Médica"
                  mandatory
                />
              </>
            )}

          {groups &&
            /motorista/i.test(
              groups.find(grp => grp.id.toString() === selectedGroup)
                ?.group as string
            ) && (
              <AttachmentField
                ref={inputWorkContractRef}
                field={workContract}
                setField={setWorkContract}
                refClick={() => inputWorkContractRef.current?.click()}
                fieldName="Declaração da Empresa Prestadora dos Serviços"
                mandatory
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
                ref={inputWorkContractRef}
                field={workContract}
                setField={setWorkContract}
                refClick={() => inputWorkContractRef.current?.click()}
                fieldName="Contracheque ou Contrato de Trabalho / Declaração do local de estágio informando atividade exercida"
                mandatory
              />
            )}

          {groups &&
            /deficientes/i.test(
              groups.find(grp => grp.id.toString() === selectedGroup)
                ?.group as string
            ) && (
              <AttachmentField
                ref={inputMedicalReportRef}
                field={medicalReport}
                setField={setMedicalReport}
                refClick={() => inputMedicalReportRef.current?.click()}
                fieldName="Laudo Médico"
                mandatory
              />
            )}

          <AttachmentField
            ref={inputAuxDocRef}
            field={auxDoc}
            setField={setAuxDoc}
            refClick={() => inputAuxDocRef.current?.click()}
            fieldName="Documentação Auxiliar (Certidão de Casamento, Contrato de Aluguel, etc.)"
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

export default Registration;
