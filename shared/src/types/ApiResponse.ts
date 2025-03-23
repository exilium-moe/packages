import { HttpStatusEnum } from "./HttpStatusEnum";

type ApiSuccess = {
  success: true;
  status: HttpStatusEnum;
  message: string;
  // eslint-disable-next-line
  metadata?: Record<string, any>;
};

export type ApiResponse<T = void> =
  | (T extends void ? ApiSuccess : ApiSuccess & { data: T })
  | (Omit<ApiSuccess, "success"> & { success: false });
