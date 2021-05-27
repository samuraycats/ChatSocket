<template>
  <div class="box scroll">
    <Dialog
      :message="message"
      v-for="(message, index) in messages"
      :key="index"
    />
  </div>
</template>

<script>
import Dialog from "../Chat/Dialog";

export default {
  name: "Chat",

  components: { Dialog },

  data: function () {
    return {
      messages: [],
    };
  },

  computed: {
    testMessages() {
      return this.$store.getters.getMessages;
    },
  },

  watch: {
    testMessages: {
      immediate: true,
      deep: false,

      handler(newMessages, oldMessages) {
        if (newMessages !== oldMessages) {
          this.messages = JSON.parse(newMessages);
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
.scroll {
  background-color: lightblue;
  height: 400px;
  width: 100%;
  overflow-y: auto;
}
</style>
