export interface Establishment {
  id: string;
  address: string;
  city: string;
  email: string;
  guid: string;
  index: number;
  latitude: string;
  longitude: string;
  name: string;
  phone: string;
  picture: string | ArrayBuffer;
  registered: string;
  account_number: string;
  account_number_digit: string;
  account_type: string;
  bank: string;
  automated_withdraw: AutomatedWithDraw;
  cpf_cnpj: string;
}

type AutomatedWithDraw = {
  name: string;
  value: boolean;
};
