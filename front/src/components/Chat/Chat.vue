<template>
  <div class="box scroll">
    <DialogSend float="type-l" />
    <DialogReceived float="type-r" />
  </div>
</template>

<script>
import ChatService from "../../services/ChatService";
import DialogSend from "../Chat/DialogSend";
import DialogReceived from "../Chat/DialogReceived";

export default {
  name: "Chat",

  components: {
    DialogSend,
    DialogReceived,
  },

  props: {},

  data: function () {
    return {
      user: "",
      login: false,
    };
  },

  methods: {
    Submit(user, event) {
      event.preventDefault();
      console.log(this.user);

      if (user.length === 0) {
        console.error("usuario vacio");
      } else {
        ChatService.postUser({ user: user })
          .then((response) => {
            console.log(response);
            this.login = response.data.id !== null ? true : false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
