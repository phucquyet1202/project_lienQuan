import axios from "axios";
import url from "./url";

export const Register = async (user: any) => {
  const data = await axios.post(`${url}/user/register`, user);
  return data;
};
export const LogIn = async (user: any) => {
  const data = await axios.post(`${url}/user/login`, user);
  return data;
};
export const getAllUser = async () => {
  const data = await axios.get(`${url}/user`);
  return data;
};
export const getInfoUser = async () => {
  const data = await axios.get(`${url}/user/info`);
  return data;
};
export const updateUser = async (id: string, user: any) => {
  const data = await axios.patch(`${url}/user/${id}`, user);
  return data;
};
export const deleteUser = async (id: string) => {
  const data = await axios.delete(`${url}/user/${id}`);
  return data;
};
