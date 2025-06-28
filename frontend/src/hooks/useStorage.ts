import { useSelector } from "react-redux";
import type { RootState } from "redux/redux.store";
import { aliasName } from "utils/aliasName";

export const selectJwtToken = (state: RootState) => state.auth.token;
export const selectCsrfToken = (state: RootState) =>
  state.auth[aliasName.csrf_token];
export const selectUser = (state: RootState) => state.user;

export function useStorage() {
  const token = useSelector(selectJwtToken);
  const csrf = useSelector(selectCsrfToken);
  const user = useSelector(selectUser);

  return { token, csrf, user };
}
