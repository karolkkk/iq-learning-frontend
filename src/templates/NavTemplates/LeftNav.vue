<template>
  <v-navigation-drawer :mini-variant.sync="isMobile" floating permanent app>
    <template v-slot:prepend>
      <v-list class="pt-10 p">
        <v-list-item to='/'>
          <v-avatar class="profile ma-auto" to="/">
            <v-img :src="ico" alt='"Icon made by Freepik from www.flaticon.com"'></v-img>
          </v-avatar>
          <v-list-item-title>IQ Learning</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
    <v-list class="pt-12">
      <v-list-item
        to="/user"
        :style="
          '/user' === $route.path
            ? 'color: #fe7676 !important; border-width: 0 !important; border-right: 0.1em solid !important; background-color: rgba(0,0,0,0) !important;'
            : 'color: rgb(0,0,0,0) !important;  border-width: 0 !important; border-right: 0.1em solid !important;'
        "
      >
        <v-list-item-icon>
          <v-icon
            :style="
              '/user' === $route.path
                ? 'color: #fe7676 !important;'
                : 'color: rgb(0,0,0, 0.4) !important;'
            "
            >mdi-view-dashboard-outline</v-icon
          >
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            :style="
              '/user' === $route.path
                ? 'color: black !important;'
                : 'color: rgb(0,0,0, 0.4) !important;'
            "
            >Dashboard</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        :prepend-icon="item.icon"
        @click
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="subLink in item.items"
          :key="subLink.title"
          :to="subLink.to"
          :style="
            subLink.to === $route.path
              ? 'color: #fe7676 !important; border-width: 0 !important; border-right: 0.1em solid !important; background-color: rgba(0,0,0,0) !important;'
              : 'color: rgb(0,0,0,0) !important;  border-width: 0 !important; border-right: 0.1em solid !important;'
          "
          link
        >
          <v-list-item-icon>
            <v-icon
              :style="
                subLink.to === $route.path
                  ? 'color: #fe7676 !important;'
                  : 'color: rgb(0,0,0, 0.4) !important;'
              "
              >{{ subLink.icon }}</v-icon
            >
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              :style="
                subLink.to === $route.path
                  ? 'color: black !important;'
                  : 'color: rgb(0,0,0, 0.4) !important;'
              "
              >{{ subLink.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <!--				<template v-slot:append>
						HELLO
				</template>-->
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'leftnav',
  data() {
    return {
      items: [
        {
          title: 'Creator',
          to: '/user/questions',
          icon: 'mdi-pencil-outline',
          items: [
            {
              title: 'Questions',
              to: '/user/questions',
              icon: 'mdi-file-edit-outline',
            },
            {
              title: 'Tests',
              to: '/user/tests/',
              icon: 'mdi-clipboard-list-outline',
            },
            {
              title: 'Articles',
              to: '/user/articles/',
              icon: 'mdi-clipboard-text-outline',
            },
          ],
        },

        /* { title: 'Chat', to: '/user/chat', icon: 'mdi-forum-outline' },*/
      ],
      ico: require('../../assets/wisdom.svg'),
    };
  },
  computed: {
    isMobile() {
      return !(
        this.$vuetify.breakpoint.name === 'lg' ||
        this.$vuetify.breakpoint.name === 'xl'
      );
    },
  },
};
</script>

<style scoped></style>
