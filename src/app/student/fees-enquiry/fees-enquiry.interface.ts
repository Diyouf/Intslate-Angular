export interface unpaidTermsData {
  term: string;
  amount: number;
  id: string;
}

interface TermData {
  _id: string;
  amount: number;
  status: 'Paid' | 'Unpaid';
}

export interface PaidFeesInterface {
  term1: TermData;
  term2: TermData;
  term3: TermData;
  [key: string]: TermData; // Index signature to allow dynamic property access
}

interface TermData {
  amount: number;
}

export interface FeeStructure {
  term1: TermData;
  term2: TermData;
  term3: TermData;
}

export interface PaymentHandlerConfig {
  key: string;
  locale: string;
  token: (stripeToken: token) => void;
}

export interface token {
  card: {
    id: string;
    object: string;
    
  };
  client_ip: string;
  created: number;
  email: string;
  id: string;
  livemode: boolean;
  object: string;
  type: string;
  used: boolean;
}
