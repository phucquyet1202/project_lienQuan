import axios from "axios";
import url from "./url";

export const getAllReview = async () => {
  const data = await axios.get(`${url}/review`);
  return data;
};
export const getOneReview = async (id: string) => {
  const data = await axios.get(`${url}/review/${id}`);
  return data;
};
export const createReview = async (Review: any) => {
  const data = await axios.post(`${url}/review`, Review);
  return data;
};
export const updateReview = async (id: string, Review: any) => {
  const data = await axios.patch(`${url}/review/${id}`, Review);
  return data;
};
export const deleteReview = async (id: string) => {
  const data = await axios.delete(`${url}/review/${id}`);
  return data;
};
