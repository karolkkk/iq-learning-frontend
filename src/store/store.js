import Vuex from 'vuex';
import Vue from 'vue';
import { restApi } from '../api/restApi';
import { merge } from '../util/utilFunctions';

Vue.use(Vuex);

function initialState() {
  return {
    subjects: null,

    loadingQuestions: true,
    userQuestions: [],

    publicQuestions: [],
    allQuestions: [],
    filteredQuestions: [],

    userTests: [],
    filteredUserTests: [],
    publicTests: [],
    filteredPublicTests: [],

    articles: [],
  };
}

export default new Vuex.Store({
  state: initialState,
  getters: {
    subjects: state => state.subjects,

    userQuestions: state => state.userQuestions,
    publicQuestions: state => state.publicQuestions,
    allQuestions: state => state.allQuestions,
    filteredQuestions: state => state.filteredQuestions,

    userTests: state => state.userTests,
    filteredUserTests: state => state.filteredUserTests,
  },
  mutations: {
    setSubjects(state, data) {
      state.subjects = data;
    },

    setQuestionsLoading(state, data) {
      state.loadingQuestions = data;
    },
    setUserQuestions(state, data) {
      state.userQuestions = data;
    },
    setPublicQuestions(state, data) {
      state.publicQuestions = data;
    },
    setAllQuestions(state) {
      state.allQuestions = merge(
        state.userQuestions,
        state.publicQuestions,
        'id'
      );
    },
    filterAllQuestions(state, data) {
      state.filteredQuestions = state.allQuestions.filter(item => {
        return item.subject.id === data;
      });
    },
    filterUserQuestions(state, data) {
      state.filteredQuestions = state.userQuestions.filter(item => {
        return item.subject.id === data;
      });
    },
    setUserTests(state, data) {
      state.userTests = data;
    },
    setFilteredUserTests(state, data) {
      state.filteredUserTests = data.sort((a, b) => (a.id > b.id ? 1 : -1));
    },
    setPublicTests(state, data) {
      state.publicTests = data;
    },
    setFilteredPublicTests(state, data) {
      state.filteredPublicTests = data.sort((a, b) => (a.id > b.id ? 1 : -1));
    },
  },
  actions: {
    loadSubjects({ commit }) {
      restApi.getSubjects().then(response => {
        return commit('setSubjects', response);
      });
    },
    loadUserQuestions({ commit }) {
      commit('setQuestionsLoading', true);
      restApi.getUserQuestions().then(async response => {
        commit('setQuestionsLoading', false);
        await commit('setUserQuestions', response);
        commit('setAllQuestions');
      });
    },
    loadPublicQuestions({ commit }) {
      restApi.getPublicQuestions().then(async response => {
        await commit('setPublicQuestions', response);
        commit('setAllQuestions');
      });
    },
    loadUserTests({ commit }) {
      restApi.getUserTests().then(response => {
        commit('setUserTests', response);
      });
    },
    loadFilteredUserTests({ commit }, id) {
      restApi.getUserTestsById(id).then(response => {
        commit('setFilteredUserTests', response);
      });
    },
    loadPublicTests({ commit }) {
      restApi.getPublicTests().then(response => {
        commit('setPublicTests', response);
      });
    },
    loadFilteredPublicTests({ commit }, id) {
      restApi.getPublicTestsById(id).then(response => {
        commit('setFilteredPublicTests', response);
      });
    },
  },
});
