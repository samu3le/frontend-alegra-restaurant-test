export default {
  fetchingData: false,
  errors: null,
  data: {},
  auth: {
    token: null,
    nickname: null,
    email: null,
  },
  signIn: {
    fetchingData: false,
    errors: null,
    data: {
      // user: 'user1',
      // password: '12345678',
    },
  },
  signUp: {
    fetchingData: false,
    errors: null,
    data: {
      // nickname: 'user1',
      // email: 'user1@gmail.com',
      // password: '12345678',
      // passwordConfirmation: '12345678',
    },
  },
  signOut: {
    fetchingData: false,
    errors: null,
    data: {},
  },
};
