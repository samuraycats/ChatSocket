<template>
<div>
  <Chat user="Lorenzo Rascón M" />
  <User user="pollo" />
</div>
</template>

<script>
import Chat from './components/chat/Chat.vue'
import User from './components/chat/User.vue'

export default {
  name: 'App',
  components: {
    Chat,
    User
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
