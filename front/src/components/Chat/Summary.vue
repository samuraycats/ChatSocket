<template>
  <div class="container">
    <div class="box">
      <BarTop />
    </div>

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
import BarTop from "../Chat/BarTop";


import MessagesService from '../../services/MessagesService'
import UserService from "../../services/UserService";

export default {
  name: "Summary",

  components: { Users, Chat, Message, BarTop },

  data: function () {
    return { message: "", socket: io(process.env.VUE_APP_BACK_END_POINT) };
  },

  mounted() {
    this.socket.on("messages", (messagesNew) => {
      MessagesService.setMessages(messagesNew, JSON.parse(this.$store.getters.getMessages), this.$store);
      UserService.countMessages(JSON.parse(this.$store.getters.getMessages), this.$store);
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
          MessagesService.sendMessage(newValue, this.$store, this.socket);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
