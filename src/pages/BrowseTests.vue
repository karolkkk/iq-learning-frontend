<template>
  <v-container>
      <v-combobox
              v-model="chips"
              :items="$store.getters.subjects"
              chips
              clearable
              label="Your favorite hobbies"
              multiple
              prepend-icon="filter_list"
              solo
      >
        <template v-slot:selection="{ attrs, item, select, selected }">
          <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="remove(item)"
          >
            <strong>{{ item }}</strong>&nbsp;
            <span>(interest)</span>
          </v-chip>
        </template>
      </v-combobox>
    <v-row>
      <v-col cols="6" v-for="test in $store.state.publicTests">
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
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BrowseTests',
  created() {
    this.$store.dispatch('loadSubjects');
    this.$store.dispatch('loadPublicTests');
  },
  data () {
    return {
      chips: ['Programming', 'Playing video games', 'Watching movies', 'Sleeping'],
      items: ['Streaming', 'Eating'],
    }
  },

  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
  },
};
</script>

<style scoped></style>
