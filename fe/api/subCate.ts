import axios from "axios";
import url from "./url";

export const getAllSubCate = async () => {
  const data = await axios.get(`${url}/sub-cate`);
  return data;
};
export const getOneSubCate = async (id: string) => {
  const data = await axios.get(`${url}/sub-cate/${id}`);
  return data;
};
export const createSubCate = async (SubCate: any) => {
  const data = await axios.post(`${url}/sub-cate`, SubCate);
  return data;
};
export const updateSubCate = async (id: string, SubCate: any) => {
  const data = await axios.patch(`${url}/sub-cate/${id}`, SubCate);
  return data;
};
export const deleteSubCate = async (id: string) => {
  const data = await axios.delete(`${url}/sub-cate/${id}`);
  return data;
};
