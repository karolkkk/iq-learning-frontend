<template>
  <v-container fluid class="pt-12">
    <left-nav></left-nav>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <right-nav></right-nav>
  </v-container>
</template>

<script>
import RightNav from '../../templates/NavTemplates/RightNav';
import LeftNav from '../../templates/NavTemplates/LeftNav';

export default {
  name: 'User',
  components: {
    LeftNav,
    RightNav,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.theme--light.v-list-item--active:hover::before,
.theme--light.v-list-item--active::before {
  opacity: 0 !important;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
