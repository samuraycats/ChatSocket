<template>
  <div class="box">
    <input
      class="input is-medium is-success"
      @keyup.enter="submitMessage()"
      type="text"
      placeholder="Medium input"
      v-model="message"
    />
  </div>
</template>

<script>


export default {
  name: "Home",
  data: function() {
    return { message: ""};
  },

  methods: {
    submitMessage() {
      this.$store.state.message = this.message;
      this.$store.dispatch("addMessageAction");
      this.message = "";
    },
}
}
</script>

<style lang="scss" scoped></style>
