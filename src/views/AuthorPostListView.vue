<template>
  <ne-header></ne-header>
  <div class="container" v-if="isDone">
    <h1>{{ posts[0].author.username }}</h1>
    <ne-post
      :key="i"
      v-for="(post, i) in posts"
      :post="post"
    ></ne-post>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 0px 8px;
  h1 {
    text-align: center;
    margin: 38px auto 44px auto;
  }
  a {
    text-decoration: none;
  }
}
</style>

<script>
import NeHeader from "@/components/NeHeader.vue";
import NeInputbar from "@/components/NeInputbar.vue";
import NeGoButton from "@/components/NeGoButton.vue";
import NePost from "@/components/NePost.vue";
import { getApi, popup } from "@/GlobalSettings.js";

export default {
  name: "AuthorPostListView",
  components: {
    NeHeader,
    NeInputbar,
    NeGoButton,
    NePost,
  },

  setup() {
    const api = getApi();
    return {
      api,
      popup,
    };
  },

  created() {
    this.getAuthorPost();
  },

  data() {
    return {
      posts: null,
      isDone: false,
    };
  },

  methods: {
    getAuthorPost() {
      const _this = this;
      const userId = this.$route.params.userId;
      _this.axios
        .get(
          _this.api + "post/list/by-author/?orderby=CR_DATE_DESC&a=" + userId,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.state === "success") {
            this.posts = res.data.data.posts;
            this.isDone = true;
          } else {
            const errorMsg = res.data.error;
            console.log(errorMsg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

