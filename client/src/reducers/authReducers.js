//global 상태값 지정

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
