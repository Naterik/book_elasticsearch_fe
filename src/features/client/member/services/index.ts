import createInstanceAxios from "@/lib/api/axios.customize";
import { memberCardUrl } from "./url";
import type { IBackendRes } from "@/types/api/response.types";

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export const postCreateMemberCard = (data: any) => {
  return axios.post<IBackendRes<any>>(memberCardUrl, data);
};

const MemberService = {
  postCreateMemberCard,
};

export default MemberService;
