<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <v-alert
      v-show="!subject"
      type="warning"
      border="left"
      transition="scale-transition"
    >
      You must select subject to create test from selected questions.
    </v-alert>
    <v-data-table
      :headers="headers"
      :items="questions"
      :loading="$store.state.loadingQuestions"
      :expanded.sync="expanded"
      v-model="selected"
      show-expand
      show-select
      no-data-text="It seems empty here, try adding something"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-select
            name="subject"
            label="Select subject"
            v-model="subject"
            v-bind:items="$store.state.subjects"
            item-value="id"
            @change="filterBySubject"
            class="ma-auto"
            clearable
            return-object
            hide-details
          >
            <template slot="selection" slot-scope="data">
              {{ data.item.name }}, {{ data.item.year }}
            </template>
            <template slot="item" slot-scope="data">
              {{ data.item.name }} year {{ data.item.year }}
            </template>
          </v-select>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-switch
            v-model.sync="seePublic"
            label="Show public questions"
            @change="filterBySubject"
            hide-details
          ></v-switch>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn outlined small fab v-on="on"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }} </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <p>{{ msg }}</p>
                  <form class="pa-6 primary--text">
                    <v-select
                      name="subject"
                      label="Subject"
                      id="id"
                      v-model="editedItem.subject"
                      :items="$store.getters.subjects"
                      item-value="id"
                      required
                      return-object
                    >
                      <template slot="selection" slot-scope="data">
                        {{ data.item.name }}, {{ data.item.year }}
                      </template>
                      <template slot="item" slot-scope="data">
                        {{ data.item.name }}, {{ data.item.year }}
                      </template>
                    </v-select>
                    <v-row>
                      <v-col cols="12" sm="4" md="6">
                        <v-textarea
                          name="question"
                          label="Question"
                          id="question"
                          auto-grow
                          rows="1"
                          v-model="editedItem.question"
                          :rules="[required('question')]"
                        ></v-textarea>
                      </v-col>
                      <v-col class="flex justify-center ma-auto">
                        <v-btn
                          v-model="editedItem.shareable"
                          v-on:click="
                            editedItem.shareable = !editedItem.shareable
                          "
                          color="blue"
                          outlined
                          small
                        >
                          <v-icon>
                            {{
                              editedItem.shareable
                                ? 'mdi-cloud-outline'
                                : ' mdi-cloud-off-outline'
                            }}
                          </v-icon>
                          &nbsp
                          {{ editedItem.shareable ? 'PUBLIC' : 'PRIVATE' }}
                        </v-btn>
                        &nbsp;
                        <v-btn
                          v-model="editedItem.choiceTest"
                          v-on:click="
                            editedItem.choiceTest = !editedItem.choiceTest
                          "
                          color="primary2"
                          outlined
                          small
                        >
                          <v-icon>mdi-baguette</v-icon>
                          CHOICE TEST
                        </v-btn>
                      </v-col>
                    </v-row>
                    <ButtonCounter
                      v-if="editedItem.choiceTest === true"
                      :rows="editedItem.answers"
                      v-on:childToParent="onChildClick"
                    ></ButtonCounter>
                    <p>{{ error }}</p>
                  </form>
                </v-container>
              </v-card-text>
              <v-card-text>{{ error }}</v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="red" outlined @click="close">Cancel</v-btn>
                <v-btn class="primary" dark outlined @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
        <v-icon
          small
          color="primary"
          @click="expand(true)"
          v-if="item.choiceTest && !isExpanded"
          >mdi-chevron-down</v-icon
        >
        <v-icon
          small
          color="primary"
          @click="expand(false)"
          v-if="item.choiceTest && isExpanded"
          >mdi-chevron-up</v-icon
        >
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-list-item
            class="ma-auto d-inline"
            v-for="(answer, index) in item.answers"
          >
            {{ index + 1 }}. {{ answer.answer }}
            <v-icon small :color="answer.correct ? 'green' : 'red'">{{
              answer.correct ? 'mdi-check' : 'mdi-block-helper'
            }}</v-icon>
          </v-list-item>
        </td>
      </template>
      <!--      <template v-slot:item.data-table-select="{ isSelected, select }">
        <v-simple-checkbox :value="isSelected" @input="select($event)"></v-simple-checkbox>
      </template>-->
      <template v-slot:item.shareable="{ item }">
        <v-icon>
          {{ item.shareable ? 'mdi-cloud-outline' : 'mdi-cloud-off-outline' }}
        </v-icon>
      </template>
      <template v-slot:item.choiceTest="{ item }">
        <v-icon>
          {{ item.choiceTest ? 'mdi-playlist-check' : 'mdi-playlist-minus' }}
        </v-icon>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          v-if="$auth.user().id === item.owner"
          small
          color="secondary"
          class="mr-2"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon
          v-if="$auth.user().id === item.owner"
          small
          color="red"
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
      </template>
      <template v-slot:footer="{ headers }">
        <v-divider class="mb-4" horizontal></v-divider>
        <v-dialog v-model="testDialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn
              class="flex ma-auto"
              :disabled="!subject"
              outlined
              small
              v-on="on"
              ><v-icon>mdi-plus</v-icon>Create test from selection</v-btn
            ></template
          >
          <v-card>
            <v-card-title>
              Test
            </v-card-title>
            <v-card-text>
              <v-row class="ma-3" v-for="(question, index) in filteredSelect">
                {{ index + 1 }}. {{ question.question }}
                <v-col
                  class="mt-4"
                  v-if="question.choiceTest"
                  v-for="answer in question.answers"
                >
                  {{ answer.answer }}
                </v-col>
              </v-row>
            </v-card-text>
            <v-btn color="red" outlined @click="closeTest">Cancel</v-btn>
            <v-btn class="primary" dark outlined @click="addTest">Save</v-btn>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { required } from '../../../../util/validationFunctions';
import { restApi } from '../../../../api/restApi';
import ButtonCounter from '../../../../templates/QuestionsTemplates/ButtonCounter';
import { questionsHeaders } from '../../../../util/headers';

export default {
  name: 'NewQuestions',
  components: { ButtonCounter },
  data() {
    return {
      dialog: false,
      testDialog: false,
      seePublic: false,
      error: '',
      msg: '',
      subject: null,
      questionAnswers: [],
      expanded: [],
      selected: [],
      headers: questionsHeaders,
      editedIndex: -1,
      editedItem: {
        id: 0,
        question: '',
        choiceTest: '',
        subject: null,
        year: 0,
        shareable: false,
      },
      defaultItem: {
        id: 0,
        question: '',
        choiceTest: '',
        subject: null,
        year: 1,
        shareable: false,
      },
      required,
    };
  },
  computed: {
    questions() {
      if (this.seePublic && this.subject)
        return this.$store.state.filteredQuestions;
      if (this.seePublic) return this.$store.state.allQuestions;
      if (this.subject) return this.$store.state.filteredQuestions;
      else return this.$store.state.userQuestions;
    },
    filteredSelect() {
      return this.questions.filter(q => {
        return this.selected.includes(q);
      });
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Add question' : 'Edit question';
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.$store.dispatch('loadSubjects');
    this.loadAllQuestions()
  },
  methods: {
    onChildClick(value) {
      this.questionAnswers = value;
    },
    filterBySubject() {
      if (this.subject && this.seePublic) {
        this.$store.commit('filterAllQuestions', this.subject.id);
      } else if (this.subject) {
        this.$store.commit('filterUserQuestions', this.subject.id);
      }
    },
    async loadAllQuestions() {
      await this.$store.dispatch('loadUserQuestions');
      await this.$store.dispatch('loadPublicQuestions');
    },
    editItem(item) {
      this.editedIndex = this.questions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      restApi
        .removeQuestion(item.id)
        .then(() => {
          this.loadAllQuestions();
        })
        .catch(err => {
          this.error = err;
        });
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
      this.error = '';
    },
    save() {
      if (this.editedItem.questions !== '') {
        if (this.editedIndex === -1) {
          // add new question
          restApi
            .addQuestion(
              this.editedItem.subject,
              this.editedItem.question,
              this.editedItem.shareable,
              this.editedItem.choiceTest,
              this.questionAnswers
            )
            .then(response => {
              this.loadAllQuestions();
              this.msg = response.msg;
            })
            .catch(err => {
              this.error = err;
            });
          this.close();
        } else {
          //edit question
          restApi
            .updateQuestion(
              this.editedItem.subject,
              this.editedItem.question,
              this.editedItem.shareable,
              this.editedItem.choiceTest,
              this.questionAnswers,
              this.editedItem.id
            )
            .then(response => {
              this.loadAllQuestions();
              this.msg = response.msg;
            })
            .catch(err => {
              this.error = err;
            });
          this.close();
        }
      } else this.error = `Can't b empti`;
    },
    closeTest() {
      this.testDialog = false;
    },
    addTest() {
      let questionIds = [];
      this.filteredSelect.forEach(item => {
        questionIds.push(item.id);
      });
      restApi.addTest(this.subject.id, true, questionIds).then(() => {
        this.testDialog = false;
      });
    },
  },
};
</script>

<style scoped></style>
