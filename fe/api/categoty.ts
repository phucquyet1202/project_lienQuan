import axios from "axios";
import url from "./url";

export const getAllCategory = async () => {
  const data = await axios.get(`${url}/category`);
  return data;
};
export const getOneCategory = async (id: string) => {
  const data = await axios.get(`${url}/category/${id}`);
  return data;
};
export const createCategory = async (category: any) => {
  const data = await axios.post(`${url}/category`, category);
  return data;
};
export const updateCategory = async (id: string, category: any) => {
  const data = await axios.patch(`${url}/category/${id}`, category);
  return data;
};
export const deleteCategory = async (id: string) => {
  const data = await axios.delete(`${url}/category/${id}`);
  return data;
};
