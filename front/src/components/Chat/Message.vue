<template>
  <div class="box message">
    <input
      class="input is-medium is-success"
      @keyup.enter="submitMessage()"
      type="text"
      placeholder="Escribe un mensaje y presiona Enter para enviar"
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

<style lang="scss" scoped>
.message {
  background-color: lightblue;
}
</style>
