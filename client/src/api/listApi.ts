// import axios from "axios";
// import { TodoLists } from "../utils/types";

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// type ListResponse = {
//   data: TodoLists[];
//   status: number;
// };

// type SingleListResponse = {
//   data: TodoLists;
//   status: number;
// };

// const createList = async (title: string): Promise<SingleListResponse> => {
//   const { data } = await axios.post<SingleListResponse>(
//     `${BASE_URL}/api/lists`,
//     { title }
//   );
//   return data;
// };

// const getLists = async (): Promise<ListResponse> => {
//   const { data } = await axios.get<ListResponse>(`${BASE_URL}/api/lists`);
//   return data;
// };

// const getOneList = async (id: number): Promise<SingleListResponse> => {
//   const { data } = await axios.get<SingleListResponse>(
//     `${BASE_URL}/api/lists/${id}`
//   );
//   return data;
// };

// export const listApi = {
//   createList,
//   getLists,
//   getOneList,
// };
