<template>
  <div class="box scroll">
    <Dialog :message="message" v-for="message in messages" :key="message.id" />
  </div>
</template>

<script>
import Dialog from "../Chat/Dialog";
import ChatService from "./../../services/ChatService";

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
    testUserTalk() {
      return this.$store.getters.getUserTalkId;
    },
  },

  watch: {
    testMessages: {
      immediate: true,
      deep: false,
      handler(newMessages, oldMessages) {
        if (newMessages !== oldMessages) {
          let messages = JSON.parse(newMessages);
          this.messages = ChatService.filterMessages(messages, this.$store);
        }
      },
    },

    testUserTalk: {
      immediate: true,
      deep: false,
      handler(newUserTalk, oldUserTalk) {
        if (newUserTalk !== oldUserTalk) {
          let messages = JSON.parse(this.$store.getters.getMessages);
          this.messages = ChatService.filterMessages(messages, this.$store);
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
