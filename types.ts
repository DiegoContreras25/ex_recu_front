export type Contacto = {
  name: string;
  dni: string;
  email: string;
};

export type Data = {
  message?: string;
};

export type AgendaProps = {
  contactos: Contacto[];
  userID: string;
};

export type ContactoProps = {
  contacto: Contacto;
  userID: string;
};

export type State = {
  email: string;
  name: string;
  id: string;
};
