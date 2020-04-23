<template>
  <v-app v-if="$auth.ready()">
    <!--    <v-navigation-drawer app>
      &lt;!&ndash; &ndash;&gt;
    </v-navigation-drawer>-->
    <Navbar />
    <!-- Sizes your content based upon application pages -->
    <v-content
      style="background: rgba(229,237,251,0.8)"
      class="pt-0"
    >
      <router-view />
    </v-content>

    <!--    <v-footer app>
      &lt;!&ndash; &ndash;&gt;
    </v-footer>-->
  </v-app>
</template>

<script>
import Navbar from './pages/nav/Navbar';
import { restApi } from './api/restApi';
import store from './store/store';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  created() {
    let token = localStorage.getItem('default_auth_token');
    if (token) {
      restApi.createAxiosProxy(token);
      restApi.interceptor();
      store.dispatch('loadSubjects');
      store.dispatch('loadUserQuestions');
      store.dispatch('loadPublicQuestions');
    } else restApi.createAxiosProxy(null);
  },
  data() {
    return {};
  },
};
</script>
