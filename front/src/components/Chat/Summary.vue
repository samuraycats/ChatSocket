<template>
  <div class="container">
    <div class="box">
      <div class="columns">
        <div class="column is-4">
          <Users />
        </div>

        <div class="column is-8">
          <Chat />
          <Message />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

import Users from "../Chat/Users";
import Chat from "../Chat/Chat";
import Message from "../Chat/Message";

export default {
  name: "Summary",

  components: { Users, Chat, Message },

  data: function() {
    return { message: "", socket: io("http://localhost:3000") };
  },

  mounted() {
    this.socket.on("messages", (data) => {
      let messagesOld = JSON.parse(this.$store.getters.getMessages);
      let messagesNew = data;

      if (messagesOld.length !== messagesNew.length) {
        this.$store.state.messages = data;
        this.$store.dispatch("addMessagesAction");
      }

    });
  },

  computed: {
    testMessage() {
      return this.$store.getters.getMessage;
    },
  },

  watch: {
    testMessage: {
      immediate: true,
      deep: false,

      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          let payload = {
            id: this.$store.getters.getUserId,
            user: this.$store.getters.getUserName,
            message: newValue,
          };

          this.socket.emit("new-message", payload);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
