<template>
  <div class="notification is-success is-light received">
    <div class="time">
      <time>{{ date }}</time>
    </div>
    <br />
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
import moment from "moment";

export default {
  name: "DialogReceived",
  props: { mesageRead: Object },

  data() {
    return { date: moment(this.mesageRead.date).format(`DD/MM/YYYY HH:mm:ss`) };
  },
  mounted: function () {
    let scroll = document.querySelector(".scroll");

    if (scroll !== null) {
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

.time {
  width: 100%;
}

time {
  font-size: 0.8rem;
  color: rgb(7, 7, 7);
  margin-top: 3px;
  float: right;
  cursor: default;
}
time:before {
  content: "\f017";
  color: rgb(24, 26, 23);
  font-family: FontAwesome;
}
</style>
