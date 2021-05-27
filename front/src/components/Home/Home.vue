<template>
  <div>
    <div v-if="login">
      <Summary />
    </div>

    <div v-else>
      <div class="container">
        <div class="box">
          <div class="notification is-success">
            <h1>¡Hey Chat!</h1>
          </div>
        </div>
        <div class="box">
          <div class="notification is-info">
            <div class="field">
              <label class="label"
                >Escribe un alias para Iniciar el Chat
              </label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Escriba un nombre de usuario"
                  v-model="user"
                  v-on:keyup.enter="enter()"
                />
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" v-on:click="enter()">
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
import io from "socket.io-client";
import toastr from "toastr";

import "toastr/build/toastr.min.css";

import Summary from "../Chat/Summary";

export default {
  name: "Home",

  components: {
    Summary,
  },

  data: function () {
    return {
      users: [],
      user: "",
      login: false,
      socket: io("http://localhost:3000"),
    };
  },

  methods: {
    enter() {
      let users = JSON.stringify(this.users);
      users = JSON.parse(users);
      let existUser = users.some((e) => e.user === this.user);

      if (this.user.length === 0) {
        return toastr.warning("Ingrese un nombre para su alias");
      } else if (existUser) {
        return toastr.warning("Este usuario  no esta disponible ");
      } else {
        let user = {
          user: this.user,
        };

        this.socket.emit("new-user", user);
      }
    },
  },

  mounted() {
    this.socket.on("users", (data) => {
      this.users = data;

      let userOk = data.find((e) => e.user === this.user);

      if (userOk) {
        this.$store.state.account = userOk;
        this.$store.dispatch("saveAccountAction");
        this.login = true;
      }
      
    });
  },
};
</script>

<style lang="scss">
$font-size: 2em !important;
$color: black !important;
$bold: bold;

h1 {
  font-size: $font-size;
  color: $color;
  font-weight: $bold;
}
</style>
