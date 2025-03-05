import axios from "axios";
import url from "./url";

export const getLayOut = async () => {
  const data = await axios.get(`${url}/layout`);
  return data;
};
export const getBanner = async () => {
  const data = await axios.get(`${url}/banner`);
  return data;
};
export const createLayOut = async (layOut: any) => {
  const data = await axios.post(`${url}/layout`, layOut);
  return data;
};
export const createBanner = async (banner: any) => {
  const data = await axios.post(`${url}/banner`, banner);
  return data;
};
export const updateLayOut = async (id: string, layout: any) => {
  const data = await axios.patch(`${url}/layout/${id}`, layout);
  return data;
};
export const updateBanner = async (id: string, banner: any) => {
  const data = await axios.patch(`${url}/banner/${id}`, banner);
  return data;
};
