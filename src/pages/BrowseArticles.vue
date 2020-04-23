<template>
  <v-container fluid class="fill-height">
    <v-layout row wrap align-center>
      <div v-for="article in articles" :key="article.title">
        <v-container class="text-center" fluid>
          <v-row>
            <v-col>
              <v-card class="mx-auto" max-width="400">
                <v-img
                  class="white--text align-end"
                  height="200px"
                  v-bind:src="article.imgSrc"
                >
                  <v-card-title> {{ article.title }}! </v-card-title>
                </v-img>
                <v-card-text>
                  {{ article.description }}
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    small
                    replace
                    color="info"
                    v-bind:href="article.url"
                    target="_blank"
                    >Read More</v-btn
                  >
                  <v-btn icon><v-icon>mdi-thumb-up</v-icon></v-btn>
                  <p>{{ article.upvotes }}</p>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        {
          title: 'mondry artykuu',
          description: 'tak, tak ty teszz',
          imgSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          upvotes: 15,
        },
        {
          title:
            'mondry artykuu 2',
          description: 'tak, tak ty teszz',
          imgSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          upvotes: 15,
        },
        {
          title: 'mondry artykuu 3',
          description: 'tak, tak ty teszz',
          imgSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          upvotes: 15,
        },

        {
          title: 'mondry artykuu 4',
          description: 'tak, tak ty teszz',
          imgSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          upvotes: 15,
        },
        {
          title: 'mondry artykuu 5',
          description: 'tak, tak ty teszz',
          imgSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          upvotes: 15,
        },
      ],
    };
  },
};
</script>
