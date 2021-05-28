<template>
  <div class="container">
    <div class="box">
      <article class="panel is-success">
        <div class="columns">
          <div class="column is-6">
            <p class="panel-heading">
              Conectado como {{ this.$store.getters.getUserName }}
            </p>
          </div>
          <div class="column is-6">
            <p class="panel-heading">
              Conversando con {{ this.$store.getters.getUserTalkUserName }}
            </p>
          </div>
        </div>
      </article>
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

import ChatService from "./../../services/ChatService";

export default {
  name: "Summary",

  components: { Users, Chat, Message },

  data: function() {
    return { message: "", socket: io(process.env.VUE_APP_BACK_END_POINT) };
  },

  mounted() {
    this.socket.on("messages", (data) => {
      ChatService.getMessages(data, this.$store);
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
          ChatService.sendMessage(newValue, this.$store,  this.socket);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
