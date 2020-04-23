<template>
  <v-container fluid class="fill-height pa-0 ma-0" >
    <v-img
            alt='This cover has been designed using resources from Freepik.com'
            :src="background"
    ></v-img>
  </v-container>
</template>

<script>
import BrowseArticles from './BrowseArticles';

export default {
  name: 'Home',
  components: { BrowseArticles },
  data() {
    return {
      background: require('../assets/main-background.jpg')
    }
  },
};
</script>

<style scoped></style>
