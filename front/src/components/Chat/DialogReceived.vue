<template>
  <div class="notification is-success is-light received">
 
      <div class="columns is-desktop bar-top">
        <div class="column is-half">
          <span>{{ mesageRead.user }}</span>
        </div>
        <div class="column is-half">
          <time>{{ date }}</time>
        </div>
      </div>
    

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
  mounted: function() {
    let scroll = document.querySelector(".scroll");

    if (scroll !== null) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  },
};
</script>

<style lang="scss">
$color: black;

.received {
  width: 75%;
  float: left;
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

time {
  font-size: 0.8rem;
  color: $color;
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
