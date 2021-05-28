<template>
  <div class="notification is-warning is-light send">
    <div class="columns is-desktop bar-top">
      <div class="column is-half">
        <span>Tu</span>
      </div>
      <div class="column is-half">
        <time>{{ date }}</time>
      </div>
    </div>

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
import moment from "moment";

export default {
  name: "DialogSend",

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

<style lang="scss">
$color: black;

.send {
  width: 75%;
  float: right;
}

.text {
  text-align: justify;
}

.bar-top div span{
text-align:left ;
color:$color;
font-weight: bold;
margin-left: -100px;
text-transform: capitalize;
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
