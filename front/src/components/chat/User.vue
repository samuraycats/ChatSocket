<template>
  <div class="User">
    <h1>{{ user }}</h1>
    </div>
</template>

<script>


export default {
  name: 'User',
  props: {
    user: String,
  }
}
</script>


<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>