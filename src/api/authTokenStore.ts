let accessToken: string | undefined;

const authTokenStore = {
  getAccessToken(): string | undefined {
    return accessToken;
  },

  setAccessToken(token: string): void {
    accessToken = token;
  },
  clearAccessToken(): void {
    accessToken = undefined;
  },
};

export default authTokenStore;
