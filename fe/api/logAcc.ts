import axios from "axios";
import url from "./url";

export const getAllLogAcc = async () => {
  const data = await axios.get(`${url}/log-acc`);
  return data;
};
export const getOneLogAcc = async (id: string) => {
  const data = await axios.get(`${url}/log-acc/${id}`);
  return data;
};
export const createLogAcc = async (LogAcc: any) => {
  const data = await axios.post(`${url}/log-acc`, LogAcc);
  return data;
};
export const updateLogAcc = async (id: string, LogAcc: any) => {
  const data = await axios.patch(`${url}/log-acc/${id}`, LogAcc);
  return data;
};
export const deleteLogAcc = async (id: string) => {
  const data = await axios.delete(`${url}/log-acc/${id}`);
  return data;
};
