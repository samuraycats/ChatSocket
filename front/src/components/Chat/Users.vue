<template>
  <article class="panel is-info">
    <p class="panel-heading">Usuarios ({{ totalUser }})</p>

    <a class="panel-block is-active" v-on:click="selectUser(0)" >
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <div class="tags has-addons">
            <span class="tag is-dark is-medium">General</span>
          </div>
        </div>  
      </div>
    </a>

    <a v-for="user in users" :key="user.id" class="panel-block" v-on:click="selectUser(user.id)" >
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <div class="tags has-addons">
            <span class="tag is-dark is-medium">{{ user.user }}</span>
            <span class="tag is-info is-medium" v-if="user.id !== this.$store.getters.getUserId && user.messages !== 0  " >
              {{ user.messages }} mensaje(s)
              </span>
          </div>
        </div>  
      </div>    
    </a>
  </article>
</template>

<script>
import io from "socket.io-client";
import UserService from '../../services/UserService';
import { USER_GENERAL } from '../../constants/models';
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
      let userTalk = id === 0 ? USER_GENERAL : this.users.find((e) => e.id === id);

      if (userTalk) {
        this.$store.state.userTalk = userTalk;
        this.$store.dispatch("selectedUserTalkAction");
        UserService.cleanMessage(userTalk, this.$store);
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

      UserService.saveUsers(data, this.$store);
    });
  },

  computed: {
    testUsers() {
      return this.$store.getters.getUsers ;
    },
  },

  watch: {
    testUsers: {
      immediate: true,
      deep: false,

      handler(newValue) {
        this.users = newValue.filter( e => (e.id !== this.$store.getters.getUserId && e.status !== false ) )
      },
    },
  },
};
</script>

<style></style>
