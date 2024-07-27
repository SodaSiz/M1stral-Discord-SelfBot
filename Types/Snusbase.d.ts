export type FieldConfig = {
  [key: string]: {
    label: string;
  };
};

export type Data = {
  [key: string]: UserInfo[];
};

export type UserInfo = {
  username?: string;
  email?: string;
  name?: string;
  created?: string;
  followers?: string;
  country?: string;
  gender?: string;
  city?: string;
  id?: string;
  hash?: string;
  phone?: string;
  password?: string;
  host?: string;
  [key: string]: any; // Permet des propriétés supplémentaires
};

export type ExtractedInfo = {
  [key: string]: Map<string, { value: string, sources: string[] }[]>; // Utiliser Map pour stocker les valeurs et leurs sources
};
