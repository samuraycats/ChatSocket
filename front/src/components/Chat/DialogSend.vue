<template>
  <div class="notification is-warning is-light send">
    <article class="media">
      <div>
        <div class="text">
          {{ mesageRead.message }}
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "DialogSend",

  props: { mesageRead: Object },

  mounted: function () {
    let scroll = document.querySelector(".scroll");
    if (scroll !== null) {
      console.log(scroll);
      scroll.scrollTop = scroll.scrollHeight;
    }
  },
};
</script>

<style scoped>
.send {
  width: 75%;
  float: right;
}

.text {
  text-align: justify;
}
</style>
