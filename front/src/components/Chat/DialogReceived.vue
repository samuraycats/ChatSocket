<template>
  <div class="notification is-success is-light received">
    <article class="media">
      <div class="media-left">
        <figure class="image is-32x32">
          <i class="fa fa-comment-o" style="font-size:20px;#257942"></i>
        </figure>
      </div>
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
  name: "DialogReceived",
  props: { mesageRead: Object },

  mounted: function() {
    let scroll = document.querySelector(".scroll");
    if (scroll !== null) {
      console.log(scroll);
      scroll.scrollTop = scroll.scrollHeight;
    }
  },
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
