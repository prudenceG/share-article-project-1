export const AUTHENTICATION_VISIBLE = 'AUTHENTICATION_VISIBLE';
export const AUTHENTICATION_HIDDEN = 'AUTHENTICATION_HIDDEN';

export const authenticationViewVisible = () => {
  return {
    type: AUTHENTICATION_VISIBLE,
    authentication: true,
  };
};

export const authenticationViewHidden = () => {
  return {
    type: AUTHENTICATION_HIDDEN,
    authentication: false,
  };
};
