let accessToken: string | undefined;

const authTokenStore = {
  getAccessToken: () => accessToken,
  setAccessToken: (token: string) => {
    accessToken = token;
  },
  clearAccessToken: () => {
    accessToken = undefined;
  },
};

export default authTokenStore;
