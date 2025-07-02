export const API_QUERY_PATH = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    verifyAuth: "/auth/verify",
    verifyAdmin: "/auth/verify/admin",
    refreshCsrf: "/auth/csf",
  },
  testimoni: {
    get: "/testimoni",
    create: "/testimoni",
    getDetail: (id: string) => `/testimoni/${id}`,
  },
  mealplan: {
    get: "/mealplan",
    create: "/mealplan",
    getDetail: (id: string) => `/mealplan/${id}`,
    edit: (id: string) => `/mealplan/${id}`,
    delete: (id: string) => `/mealplan/${id}`,
  },
};
