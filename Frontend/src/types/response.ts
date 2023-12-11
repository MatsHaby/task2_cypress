type ApiSendFail = {
  status: "fail";
  data: { [key: string]: string[] };
};

type ApiSendError = {
  status: "error";
  message: string;
};

 type ApiSendSuccess<T extends object> = {
  status: "success";
  data: T;
};

export type ApiResponse<T extends object> = ApiSendFail | ApiSendError | ApiSendSuccess<T>;
