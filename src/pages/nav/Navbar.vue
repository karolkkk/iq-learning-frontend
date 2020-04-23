<template>
  <nav style="height: auto">
    <v-app-bar
            v-if="!isUserRoute"
            fixed
            app
            elevate-on-scroll
    >
      <!-- <v-app-bar-nav-icon v-on:click="drawer = !drawer"> </v-app-bar-nav-icon>-->
      <v-toolbar-title v-on:click.prevent="$router.push('/').catch(e => {})">
        <v-avatar class="profile ma-auto">
          <v-img :src="ico" alt='"Icon made by Freepik from www.flaticon.com"'></v-img>
        </v-avatar>
        IQ Learning
      </v-toolbar-title>
      <v-toolbar-items class="pl-4">
        <v-btn to="/articles" text color="primary">Articles</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/user" text color="primary" v-if="this.$auth.check()"
          >{{ $username }}
        </v-btn>
        <v-btn
          text
          color="primary"
          v-if="this.$auth.check()"
          v-on:click="logout"
        >
          <v-icon color="primary">mdi-logout-variant</v-icon>
        </v-btn>
        <v-btn
          v-else
          color="primary"
          text
          :to="link.link"
          :key="link.title"
          v-for="link in links"
        >
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-app-bar v-else color="rgb(255, 255, 255, 0)" fixed app flat>
      <v-toolbar-title>{{ this.$router.currentRoute.name }}</v-toolbar-title>
    </v-app-bar>
    <!--    <v-navigation-drawer v-model="drawer" app>
      <p>aaa</p>
    </v-navigation-drawer>-->
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: false,
      links: [
        { title: 'Login', link: '/login' },
        { title: 'Register', link: '/register' },
      ],
      ico: require('../../assets/wisdom.svg'),
    };
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
  computed: {
    isUserRoute() {
      const path = this.$route.path;
      return path.split('/')[1] === 'user';
    },
  },
};
</script>

<style>
  .v-app-bar--hide-shadow{
    background-color: transparent!important;
    border-color: transparent!important;
  }
  .v-app-bar--is-scrolled {
    background-color: #fff!important;
    border-color: #fff!important;
  }
</style>
