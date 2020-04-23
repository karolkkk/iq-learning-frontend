<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-card flat color="primary--text" class="pa-5">
          <v-list-item-title class="primary2--text"
            >Hello {{ $username }}, you can change your avatar and other user
            setting here!
          </v-list-item-title>
          <v-divider></v-divider>
          <v-row>
            <v-col class="d-flex flex-wrap">
              <v-avatar color="primary" size="100" class="ma-auto">
                <v-btn dark x-small absolute bottom right fab>
                  <v-icon>add</v-icon>
                </v-btn>
                <span class="white--text headline">
                  {{ initials }}
                </span>
              </v-avatar>
              <v-divider vertical></v-divider>
              <v-btn
                      v-for="(social, i) in socials"
                      :key="i"
                      :color="social.color"
                      class="white--text"
                      fab
                      icon
                      small
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </v-col>

          </v-row>
          <v-form v-model="validName">
            <v-list-item-title class="primary2--text"
              >Change or add name and surname</v-list-item-title
            >
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Name"
                  v-model="name"
                  filled
                  :rules="[minLength('name', 3), isName()]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Surname"
                  v-model="surname"
                  filled
                  :rules="[minLength('surname', 3), isName()]"
                ></v-text-field>
                <v-btn
                  dark
                  :disabled="!validName"
                  style="background-image: linear-gradient(to right, #fe7676, #f7717e, #ee6d85, #e46a8c, #d96891);"
                  v-on:click="saveName"
                  >Change name and surname</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
          <v-form v-model="validPass">
            <v-list-item-title class="primary2--text"
              >Change password</v-list-item-title
            >
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  v-model="password"
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  id="newPassword"
                  label="New password"
                  name="New password"
                  type="password"
                  v-model="newPassword"
                  :rules="[
                    minLength(newPassword, 8),
                    passwordNumber(),
                    passwordUppercase(),
                  ]"
                  filled
                ></v-text-field>
                <v-btn
                  dark
                  style="background-image: linear-gradient(to right, #fe7676, #f7717e, #ee6d85, #e46a8c, #d96891);"
                  v-on:click="savePassword"
                  :disabled="!validPass"
                  >Change password</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  isName,
  minLength,
  passwordNumber,
  passwordUppercase,
  required,
} from '../../util/validationFunctions';
import axios from 'axios';

export default {
  name: 'Settings',
  data() {
    return {
      username: null,
      email: null,
      name: null,
      surname: null,
      password: null,
      newPassword: null,
      initials: '',
      socials: [
        {
          icon: 'mdi-linkedin-box',
          color: 'cyan darken-1',
        },
        {
          icon: 'mdi-twitter-box',
          color: 'blue lighten-3',
        },
        {
          icon: 'mdi-reddit',
          color: 'red lighten-2',
        },
        {
          icon: 'mdi-youtube',
          color: 'red',
        }
      ],
      validName: false,
      validPass: false,
      required,
      passwordNumber,
      passwordUppercase,
      minLength,
      isName,
    };
  },
  methods: {
    saveName() {
      let token = localStorage.getItem('default_auth_token');
      axios({
        method: 'post', //you can set what request you want to be
        url: 'http://localhost:8080/user/name',
        data: { name: this.name, surname: this.surname },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(response => {
          this.$auth.user(response.data);
        })
        .catch(e => {
          console.log('Enon in settings', e);
        });
    },
    savePassword() {
      let token = localStorage.getItem('default_auth_token');
      axios({
        method: 'post', //you can set what request you want to be
        url: 'http://localhost:8080/user/password',
        data: { currentPass: this.password, newPass: this.newPassword },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(response => {})
        .catch(e => {
          console.log('Enon in settings', e);
        });
    },
  },
};
</script>

<style scoped></style>
