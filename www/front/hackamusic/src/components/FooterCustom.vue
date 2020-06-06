<template>
  <div>
    <p>{{ copyright }}</p>
  </div>
</template>

<script>
export default {
  name: "FooterCustom",
  data() {
    return {
      copyright: "© 2020~2021",
    };
  },
};
</script>

<style scoped>
* {
  background-color: #42b983;
  padding: 1rem 0;
}

p {
  font-size: 0.8rem;
  color: white;
}
</style>
