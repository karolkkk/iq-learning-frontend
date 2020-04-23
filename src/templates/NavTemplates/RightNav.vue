<template>
  <v-navigation-drawer
    v-if="!isMobile"
    width="35vh"
    right
    floating
    permanent
    app
  >
    <template v-slot:prepend>
      <v-list class="pt-10 p">
        <v-list-item class="flex justify-space-between" v-on:click="logout">
          <v-list-item-title style="color: grey">Logout</v-list-item-title>
          <v-icon color="primary">mdi-logout-variant</v-icon>
        </v-list-item>
      </v-list>
    </template>
    <v-list class="d-flex flex-wrap">
      <v-avatar color="primary" size="120" class="ma-auto">
        <v-btn dark small absolute bottom right fab to="/user/settings">
          <v-icon>settings</v-icon>
        </v-btn>
        <span class="white--text headline">
          {{ initials }}
        </span>
      </v-avatar>
      <v-list-item two-line align="center" class="mt-3 flex flex-wrap">
        <v-list-item-title class="title">
          {{ this.getName }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ $auth.user().email }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'RightNav',
  methods: {
    logout() {
      this.$auth.logout();
    },
    checkInitials() {
      if (this.$name && this.$surname) {
        return this.getInitials(this.$name, this.$surname, false);
      } else if (this.$name) {
        return this.getInitials(this.$name, this.$name);
      } else if (this.$surname) {
        return this.getInitials(this.$surname, this.$surname);
      } else return this.getInitials(this.$username, this.$username);
    },
    getInitials(firstString, secondString, isSameString = true) {
      isSameString
        ? (this.initials = firstString[0] + secondString[1])
        : (this.initials = firstString[0] + secondString[0]);
    },
  },
  data() {
    return {
      initials: '',
    };
  },
  created() {
    this.checkInitials();
  },
  computed: {
    isMobile() {
      return !(
        this.$vuetify.breakpoint.name === 'lg' ||
        this.$vuetify.breakpoint.name === 'xl'
      );
    },
    getName() {
      if (this.$auth.user().name && this.$auth.user().surname) {
        return this.$auth.user().name + ' ' + this.$auth.user().surname;
      } else return this.$auth.user().username;
    },
  },
};
</script>

<style scoped></style>
