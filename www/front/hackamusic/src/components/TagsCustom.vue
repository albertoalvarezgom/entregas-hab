<template>
  <div>
    <ul class="list">
      <li v-for="tag in tags" :key="tag.id">
        <a :href="tag.url"
          ><h2>{{ tag.name }}</h2></a
        >
        <p>{{ tag.reach }} oyentes</p>
        <p>{{ tag.taggings }} etiquetados</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TagsCustom",
  props: {
    tags: Array,
  },
};
</script>

<style></style>
