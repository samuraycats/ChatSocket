<template>
  <div class="Home" id="Home">
    <div class="container">
      <div class="notification is-primary">
        <div class="field">
          <label class="label">Nombre del usuario</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
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
</template>

<script>
import ChatService from "../../services/ChatService";

export default {
  name: "Home",

  props: {
  },

  data() {
    return {
      user: "",
    };
  },

  methods: {
    Submit: (user, event) => {
      event.preventDefault();
      if (user.length === 0) {
        console.error("usuario vacio");
      } else {
        console.info("todo bien");

        ChatService.postUser({ user: user })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

        /*
            ChatService.get()
            .then( (response)=> {
                console.log(response)
            })
            .catch( (error)=> {
                console.log(error)
            })
            */
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
