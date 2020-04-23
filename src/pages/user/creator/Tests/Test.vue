<template>
  <v-container>
    <v-row>
      <v-col cols="6" v-for="test in tests">
        <v-card>
          <v-card-title> Test number {{ test.id }} </v-card-title>
          <v-list-item v-for="question in test.questions">
            <v-list-item-content>
              <v-list-item-title class="headline">{{
                question.question
              }}</v-list-item-title>
              <v-card-text v-if="question.choiceTest">
                <v-list-item-subtitle
                  v-for="answers in question.answers"
                  class="pa-2 d-inline"
                >
                  {{ answers.answer }}
                  <v-icon small :color="answers.correct ? 'green' : 'red'">
                    {{ answers.correct ? 'mdi-check' : 'mdi-block-helper' }}
                  </v-icon>
                </v-list-item-subtitle>
              </v-card-text>
            </v-list-item-content>
            <v-btn
              v-if="isEditedTest(test.id)"
              @click="removeQuestion(question.id)"
              color="red"
              outlined
              fab
              x-small
            >
              <v-icon>mdi-delete-empty</v-icon>
            </v-btn>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-on:click="isEditing(test)" color="blue" outlined fab small>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn
              v-on:click="removeTest(test.id)"
              color="red"
              outlined
              fab
              small
            >
              <v-icon>mdi-delete-empty</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from '../../../../store/store';
import { restApi } from '../../../../api/restApi';

export default {
  name: 'Test',
  created() {
    this.getTests();
  },
  computed: {
    tests() {
      if (this.route === 'all') return this.$store.state.userTests;
      else return this.$store.state.filteredUserTests;
    },
    route() {
      return this.$route.params.subject.split('=')[1];
    },
  },
  data() {
    return {
      editedTest: null,
    };
  },
  methods: {
    getTests() {
      if (this.route === 'all') {
        store.dispatch('loadUserTests');
      } else
        store.dispatch(
          'loadFilteredUserTests',
          this.$route.params.subject.split('=')[1]
        );
    },
    isEditing(test) {
      if (test === this.editedTest) {
        return (this.editedTest = null);
      } else this.editedTest = test;
    },
    isEditedTest(id) {
      if (this.editedTest && id) {
        return this.editedTest.id === id;
      } else return false;
    },
    removeTest(id) {
      restApi.removeTest(id).then(response => {
        this.getTests();
      });
    },
    removeQuestion(id) {
      let questions = this.editedTest.questions.map(o => o.id);
      questions = questions.filter(o => o !== id);
      restApi.editTest(this.editedTest, questions).then(response => {
        this.editedTest = null;
        this.getTests();
      });
    },
  },
};
</script>

<style scoped></style>
