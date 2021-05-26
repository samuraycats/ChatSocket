<template>
  <div>
    <div v-if="login">
      <Summary />
    </div>

    <div v-else class="Home" id="Home">
      <div class="container">
        <div class="notification is-info">
          <div class="field">
            <label class="label">Nombre del usuario</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Escriba un nombre de usuario"
                v-model="user"
              />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" v-on:click="Submit(user, $event)">
                Entrar
              </button>
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

  props: {},

  data: function() {
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
h3 {
  margin: 40px 0 0;
}
</style>
