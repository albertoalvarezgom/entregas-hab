<template>
  <div class="container">
    <div class="home">
      <vue-headful title="Home" description="Página de inicio de Lastfm" />
      <menucustom></menucustom>
      <loadingcustom v-if="tags.length === 0"></loadingcustom>
      <tags :tags="tags"></tags>
    </div>
    <footercustom class="footer"></footercustom>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api/index.js";
import tags from "@/components/TagsCustom.vue";
import menucustom from "@/components/MenuCustom.vue";
import loadingcustom from "@/components/LoadingCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "Home",
  components: { menucustom, tags, loadingcustom, footercustom },
  data() {
    return {
      tags: [],
    };
  },
  created() {
    api.getTopTags().then((response) => (this.tags = response.data.tags.tag));
  },
};
</script>

<style scoped></style>
