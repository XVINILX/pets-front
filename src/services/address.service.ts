import axios from "axios";

export const getAddressByCEP = async (
  cep: string
): Promise<AddressResponse> => {
  const response = await axios.get(
    `https://api.brasilaberto.com/v1/zipcode/${cep}`
  );
  return response.data;
};
