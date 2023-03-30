import React, { useState, createContext } from 'react';
import { AxiosResponse } from 'axios';
import PropTypes from 'prop-types';

import api from '../services/api';
import IPatient, { IAttachment } from '../../typescript/IPatient';
import IComorbidity from '../../typescript/IComorbidity';
import IStatus from '../../typescript/IStatus';
import IGroup from '../../typescript/IGroup';

interface PatientContextData {
  uploadProgress: number;
  createPatientCall: (
    patient: IPatient,
    idCategory: string,
    idGroup: string,
    renOncImun: string,
    idComorbidity?: string,
    idDocFront?: IAttachment | File,
    idDocVerse?: IAttachment | File,
    cpf?: IAttachment | File,
    addressProof?: IAttachment | File,
    medicalReport?: IAttachment | File,
    medicalAuthorization?: IAttachment | File,
    workContract?: IAttachment | File,
    prenatalCard?: IAttachment | File,
    puerperalCard?: IAttachment | File,
    bornAliveDec?: IAttachment | File,
    auxDoc?: IAttachment | File
  ) => Promise<string>;
  updatePatientCall: (
    id: string,
    patient: IPatient,
    idDocFront?: IAttachment | File,
    idDocVerse?: IAttachment | File,
    cpf?: IAttachment | File,
    addressProof?: IAttachment | File,
    medicalReport?: IAttachment | File,
    medicalAuthorization?: IAttachment | File,
    workContract?: IAttachment | File,
    prenatalCard?: IAttachment | File,
    puerperalCard?: IAttachment | File,
    bornAliveDec?: IAttachment | File,
    auxDoc?: IAttachment | File
  ) => Promise<string>;
  getComorbiditiesCall: () => Promise<IComorbidity[]>;
  getStatusCall: (cpf: string) => Promise<IStatus>;
  getPatientCall: (cpf: string) => Promise<IPatient>;
  getGroupsCall: (idCategory: string, orderBy?: string) => Promise<IGroup[]>;
}

const PatientContext = createContext<PatientContextData>(
  {} as PatientContextData
);

export const PatientProvider: React.FC = ({ children }) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const createPatientCall = async (
    patient: IPatient,
    idCategory: string,
    idGroup: string,
    renOncImun: string,
    idComorbidity?: string,
    idDocFront?: IAttachment | File,
    idDocVerse?: IAttachment | File,
    cpf?: IAttachment | File,
    addressProof?: IAttachment | File,
    medicalReport?: IAttachment | File,
    medicalAuthorization?: IAttachment | File,
    workContract?: IAttachment | File,
    prenatalCard?: IAttachment | File,
    puerperalCard?: IAttachment | File,
    bornAliveDec?: IAttachment | File,
    auxDoc?: IAttachment | File
  ) => {
    setUploadProgress(0);

    const data = new FormData();
    data.append('name', patient.name);
    data.append('cpf', patient.cpf);
    if (patient.susCard) {
      data.append('susCard', patient.susCard);
    }
    data.append('phone', patient.phone);
    data.append('street', patient.street);
    data.append('number', patient.number);
    if (patient.complement) {
      data.append('complement', patient.complement);
    }
    data.append('reference', patient.reference);
    data.append('neighborhood', patient.neighborhood);
    data.append('idCategory', idCategory);
    data.append('idGroup', idGroup);
    data.append('renOncImun', renOncImun);
    if (idComorbidity) {
      data.append('idComorbidity', idComorbidity);
    }
    if (idDocFront) {
      data.append('idDocFront', idDocFront as Blob);
    }
    if (idDocVerse) {
      data.append('idDocVerse', idDocVerse as Blob);
    }
    if (addressProof) {
      data.append('addressProof', addressProof as Blob);
    }
    if (cpf) {
      data.append('cpf', cpf as Blob);
    }
    if (medicalReport) {
      data.append('medicalReport', medicalReport as Blob);
    }
    if (medicalAuthorization) {
      data.append('medicalAuthorization', medicalAuthorization as Blob);
    }
    if (workContract) {
      data.append('workContract', workContract as Blob);
    }
    if (prenatalCard) {
      data.append('prenatalCard', prenatalCard as Blob);
    }
    if (puerperalCard) {
      data.append('puerperalCard', puerperalCard as Blob);
    }
    if (bornAliveDec) {
      data.append('bornAliveDec', bornAliveDec as Blob);
    }
    if (auxDoc) {
      data.append('auxDoc', auxDoc as Blob);
    }

    const response: AxiosResponse<{ msg: string }> = await api.post(
      '/patients',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e: ProgressEvent) => {
          setUploadProgress((e.loaded * 100) / e.total);
        },
      }
    );

    return response.data.msg;
  };

  const updatePatientCall = async (
    id: string,
    patient: IPatient,
    idDocFront?: IAttachment | File,
    idDocVerse?: IAttachment | File,
    cpf?: IAttachment | File,
    addressProof?: IAttachment | File,
    medicalReport?: IAttachment | File,
    medicalAuthorization?: IAttachment | File,
    workContract?: IAttachment | File,
    prenatalCard?: IAttachment | File,
    puerperalCard?: IAttachment | File,
    bornAliveDec?: IAttachment | File,
    auxDoc?: IAttachment | File
  ) => {
    setUploadProgress(0);

    const data = new FormData();
    data.append('name', patient.name);
    data.append('cpf', patient.cpf);
    if (patient.susCard) {
      data.append('susCard', patient.susCard);
    }
    data.append('phone', patient.phone);
    data.append('street', patient.street);
    data.append('number', patient.number);
    if (patient.complement) {
      data.append('complement', patient.complement);
    }
    data.append('reference', patient.reference);
    data.append('neighborhood', patient.neighborhood);
    if (idDocFront) {
      data.append('idDocFront', idDocFront as Blob);
    }
    if (idDocVerse) {
      data.append('idDocVerse', idDocVerse as Blob);
    }
    if (addressProof) {
      data.append('addressProof', addressProof as Blob);
    }
    if (cpf) {
      data.append('cpf', cpf as Blob);
    }
    if (medicalReport) {
      data.append('medicalReport', medicalReport as Blob);
    }
    if (medicalAuthorization) {
      data.append('medicalAuthorization', medicalAuthorization as Blob);
    }
    if (workContract) {
      data.append('workContract', workContract as Blob);
    }
    if (prenatalCard) {
      data.append('prenatalCard', prenatalCard as Blob);
    }
    if (puerperalCard) {
      data.append('puerperalCard', puerperalCard as Blob);
    }
    if (bornAliveDec) {
      data.append('bornAliveDec', bornAliveDec as Blob);
    }
    if (auxDoc) {
      data.append('auxDoc', auxDoc as Blob);
    }

    const response: AxiosResponse<{ msg: string }> = await api.put(
      `/patients/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e: ProgressEvent) => {
          setUploadProgress((e.loaded * 100) / e.total);
        },
      }
    );

    return response.data.msg;
  };

  const getGroupsCall = async (idCategory: string, orderBy?: string) => {
    const response: AxiosResponse<IGroup[]> = await api.get(
      `/groups?idCategory=${idCategory}&orderBy=${orderBy}`
    );

    return response.data;
  };

  const getComorbiditiesCall = async () => {
    const response: AxiosResponse<IComorbidity[]> = await api.get(
      '/comorbidities'
    );

    return response.data;
  };

  const getStatusCall = async (cpf: string) => {
    const response: AxiosResponse<IStatus> = await api.get(
      `/patients/status/${cpf}`
    );

    return response.data;
  };

  const getPatientCall = async (cpf: string) => {
    const response: AxiosResponse<IPatient> = await api.get(
      `/patients/me/${cpf}`
    );

    return response.data;
  };

  return (
    <PatientContext.Provider
      value={{
        uploadProgress,
        createPatientCall,
        getGroupsCall,
        getComorbiditiesCall,
        getStatusCall,
        getPatientCall,
        updatePatientCall,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

PatientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PatientContext;
