export interface IAttachment {
  uri: string;
  name: string;
  type: string;
}

export default interface IPatient {
  id?: number;
  name: string;
  cpf: string;
  susCard?: string;
  phone: string;
  street: string;
  number: string;
  complement?: string;
  reference: string;
  neighborhood: string;
  renOncImun: boolean;
  idComorbidity?: number | null;
}
