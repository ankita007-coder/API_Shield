export interface RateRule {
  _id: string;
  target: "ip" | "user";
  scope: "endpoint" | "global";
  identifier: string;
  limit: number;
  timeWindow: number;
  algorithm: "fixed_window" | "sliding_window" | "token_bucket";
  active: boolean;
  createdAt: string;
  updatedAt: string;
}