<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-avatar
          class="pt-0"
          style="position: absolute !important; right: 10vh; z-index: 1"
          width="10vh"
          height="10vh"
        >
          <v-img
            src="https://picsum.photos/id/11/500/300"
          >
          </v-img>
        </v-avatar>

        <v-card flat class="mt-12" color="primary--text" height="35vh" shaped>
          <v-card-title> Welcome back {{ $auth.user().name }}! </v-card-title>
          <v-card-text>Checkout your latest trending tests!</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card flat color="primary--text" height="30vh" shaped>
          <v-card-title> </v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-card flat color="primary" height="30vh" shaped> </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card dark flat color="primary3" height="10vh" shaped> </v-card>
      </v-col>
      <v-col>
        <v-card dark flat color="primary2" height="10vh" shaped> </v-card>
      </v-col>
      <v-col>
        <v-card dark flat color="secondary" height="10vh" shaped> </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'Dashboard',
};
</script>

<style scoped></style>
