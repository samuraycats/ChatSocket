<template>
<div class="container">
  <div class="box" >
  <div class="columns">
    <div class="column is-4">
      <Users/>
    </div>

    <div class="column is-8">
      <Chat/>
      <Message/>
    </div>
  </div>
</div>
</div>
</template>

<script>
import Users from '../Chat/Users';
import Chat from '../Chat/Chat';
import Message from '../Chat/Message';

export default {
  name: "Summary",

    components: {
    Users,
    Chat,
    Message,
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
</style>
