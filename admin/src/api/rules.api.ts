import api from "./axios";
import type{ RateRule } from "../types/rule.types";

export const createRule = async (data: any) => {
  const res = await api.post("/admin/rules", data);
  return res.data;
};

export const fetchRules = async (): Promise<RateRule[]> => {
  const res = await api.get("/admin/rules");
  return res.data;
};

export const deleteRule = async (id: string) => {
  await api.delete(`/admin/rules/${id}`);
};

export const updateRule = async (id: string, data: Partial<RateRule>) => {
  const res = await api.put(`/admin/rules/${id}`, data);
  return res.data;
};