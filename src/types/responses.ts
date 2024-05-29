import { Response as NodeResponse } from "node-fetch";

export type InitialBaseResponseType = {
  response_code: "00" | "01";
  token: string;
  response_text: string;
  description: string;
  wiki: string;
  custom_data: {
    id_invoice: number;
    keyof_customdata: string;
    valueof_customdata: string;
  }[];
};

export type BaseResponseType = Omit<InitialBaseResponseType, "custom_data"> & {
  custom_data: Record<string, any>;
};

export interface InitialStatusResponseType extends InitialBaseResponseType {
  montant: number;
  amount: number;
  status: "pending" | "completed" | "nocompleted";
  operator_id: string;
  operator_name: string;
  external_id: string | null;
  request_id: string | null;
  customer: string | null;
  date: string | null;
}

export type StatusResponseType = Omit<
  InitialStatusResponseType,
  "custom_data"
> & {
  custom_data: Record<string, any>;
};

export type InitialLigdicashResponseType =
  | InitialBaseResponseType
  | InitialStatusResponseType;

export type LigdicashResponseType = BaseResponseType | StatusResponseType;

export type IsomorphicResponse = Response | NodeResponse;
