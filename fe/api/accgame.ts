import axios from "axios";
import url from "./url";

export const getAllAccgame = async () => {
  const data = await axios.get(`${url}/accgame`);
  return data;
};
export const getOneAccgame = async (id: string) => {
  const data = await axios.get(`${url}/accgame/${id}`);
  return data;
};
export const createAccgame = async (Accgame: any) => {
  const data = await axios.post(`${url}/accgame`, Accgame);
  return data;
};
export const updateAccgame = async (id: string, Accgame: any) => {
  const data = await axios.patch(`${url}/accgame/${id}`, Accgame);
  return data;
};
export const deleteAccgame = async (id: string) => {
  const data = await axios.delete(`${url}/accgame/${id}`);
  return data;
};
