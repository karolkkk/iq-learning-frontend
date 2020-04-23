export default {
  computed: {
    $name() {
      return this.$auth.user().name;
    },
    $surname() {
      return this.$auth.user().surname;
    },
    $username() {
      return this.$auth.user().username;
    },
  },
};
