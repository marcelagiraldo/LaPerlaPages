import { createStore } from 'vuex';

export default createStore({
  state: {
    identificador: 0
  },
  mutations: {
    setMyVariable(state, newValue) {
      state.identificador = newValue;
    }
  }
});
