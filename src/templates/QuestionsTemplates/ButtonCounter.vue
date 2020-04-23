<template>
  <div>
    <v-row v-for="row in notNullRows" v-bind="row" :key="row.id">
      <v-col class="flex justify-center ma-auto">
        <v-btn
          v-model="row.correct"
          v-on:click="row.correct = !row.correct"
          :color="row.correct ? 'green' : 'red'"
          width="125px"
          outlined
          small
        >
          <v-icon>
            {{ row.correct ? 'mdi-check' : 'mdi-block-helper' }}
          </v-icon>
          &nbsp
          {{ row.correct ? 'CORRECT' : 'INCORRECT' }}
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-text-field
          :name="row.answer"
          v-on:change="emitToParent"
          label="Answer"
          id="answer"
          dense
          hide-details
          v-model="row.answer"
        ></v-text-field>
      </v-col>
      <v-col class="flex justify-center ma-auto">
        <v-btn
          v-if="rows.length !== 1"
          v-on:click="removeRow(row)"
          color="red"
          outlined
          fab
          small
        >
          <v-icon>mdi-delete-empty</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="flex justify-center ma-auto">
      <v-btn v-on:click="addRow" color="secondary" outlined fab small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputs: ['answer'],
      values: [],
      id: 0,
    };
  },
  props: {
    rows: {
      type: Array,
      default: () => [{ id: 0, answer: null, correct: false }],
    },
  },
  computed: {
    notNullRows() {
      if (this.rows === null) {
        return (this.rows = [{ id: 0, answer: null, correct: false }]);
      } else return this.rows;
    },
  },
  methods: {
    addRow: function() {
      this.id += 1;
      this.rows.push({
        id: this.id,
        answer: null,
        correct: false,
      });
    },
    removeRow(row) {
      this.rows.splice(this.rows.indexOf(row), 1);
    },
    emitToParent(row) {
      this.$emit('childToParent', this.rows);
    },
  },
};
</script>
<style scoped></style>
