<template>
  <article class="panel is-info">
    <p class="panel-heading">Usuarios ({{ totalUser }})</p>

    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-info" type="text" placeholder="Buscar" />
        <span class="icon is-left">
          <i class="fa fa-comments-o" aria-hidden="true"></i>
        </span>
      </p>
    </div>
    <a class="panel-block is-active">
      <span class="panel-icon">
        <i class="fa fa-comments-o" aria-hidden="true"></i>
      </span>
      General
    </a>

    <a
      v-for="user in users"
      :key="user.id"
      class="panel-block"
      v-on:click="selectUser(user.id)"
    >
      <span class="panel-icon">
        <i class="fa fa-comments-o" aria-hidden="true"></i>
      </span>
      {{ user.user }}
    </a>
  </article>
</template>

<script>
import io from "socket.io-client";

export default {
  data: function() {
    return {
      users: [],
      account: {},
      login: false,
      totalUser: 0,
      socket: io(process.env.VUE_APP_BACK_END_POINT),
    };
  },

  methods: {
    selectUser(id) {
      let userTalk = this.users.find((e) => e.id === id);

      if (userTalk) {
        this.$store.state.userTalk = userTalk;
        this.$store.dispatch("selectedUserTalkAction");
      }

    },
  },

  mounted() {
    this.socket.on("users", (data) => {
      this.account = this.$store.getters.getAccount;
      this.users = data.filter(
        (e) => e.user !== this.$store.getters.getUserName
      );
      this.totalUser = this.users.length;
    });
  },
};
</script>

<style></style>
