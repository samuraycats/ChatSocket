<template>
  <DialogSend v-if="$store.getters.getUserName === message.user" :message="message" :mesageRead="mesageRead" />
  <DialogReceived v-else :mesageRead="mesageRead" />
</template>

<script>
import DialogSend from "../Chat/DialogSend";
import DialogReceived from "../Chat/DialogReceived";

export default {
  name: "Dialog",
  props: {message: Object },
  data(){
      return{ mesageRead: this.message }
  },

  components: {  DialogReceived, DialogSend },
};
</script>

<style scoped>
.received {
  width: 75%;
  float: left;
}

.text {
  text-align: justify;
}
</style>





