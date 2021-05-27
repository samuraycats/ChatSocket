

<template>
  <div>
    <div v-if="login">
      <Summary />
    </div>

    <div v-else>
      <div class="container">
        <div class="box">
          <div class="notification is-info">
            <div class="field">
              <label class="label">Alias para entrar al chat</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Escriba un nombre de usuario"
                  v-model="user"
                  v-on:keyup.enter="submit()"
                />
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" v-on:click="submit()">
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatService from "../../services/ChatService";
import Summary from "../Chat/Summary";

export default {
  name: "Home",

  created() {
    console.log("Component has been created!");
  },

  components: {
    Summary,
  },

  data: function() {
    return { user: "", login: false };
  },

  methods: {
    submit() {
      if (this.user.length === 0) {
        console.error("usuario vacio");
      } else {
        ChatService.postUser({ user: this.user })
          .then((response) => {
            this.login = response.data.id !== null ? true : false;
            this.$store.state.account = response.data;
            this.$store.dispatch("saveAccountAction");
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
h3 {
  margin: 40px 0 0;
}
</style>
