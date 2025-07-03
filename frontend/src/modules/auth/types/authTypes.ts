import type { BaseApiResponseTypes } from "types/BaseApiResponse";

export type verifyAuthResponse = BaseApiResponseTypes;
export type verifyAdminResponse = BaseApiResponseTypes;
export type csrfTokenRefreshResponse = BaseApiResponseTypes & {
  responseObject: {
    cft: string;
  };
};
