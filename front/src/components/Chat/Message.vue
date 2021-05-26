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
import io from "socket.io-client";

export default {
  name: "Home",

  data: function() {
    return { message: "", socket: io("http://localhost:3000")};
  },

  methods: {
    submitMessage() {
      let payload = { id: 0, user: "perrito", message: this.message };
      this.socket.emit("new-message", payload);
      this.message = "";
    },
  },

  mounted() {
    this.socket.on("messages", (data) => {
      console.log(data);
    });
  },
};

</script>

<style lang="scss" scoped></style>
