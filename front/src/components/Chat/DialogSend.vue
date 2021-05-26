<template>
  <div class="notification is-warning is-light send">
    <article class="media">
      <div>
        <div class="text">
            Lorem ipsum dolor
        </div>
      </div>
    </article>
  </div>
</template>

<script>

export default {
  name: "DialogSend",

  props: ['float'],


};
</script>

<style scoped>
.send{
    width: 75%;
    float:right
}

.text{
    text-align: justify;
}
</style>
