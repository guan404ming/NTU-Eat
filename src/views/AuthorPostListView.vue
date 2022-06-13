<template>
  <ne-header></ne-header>
  <div class="container">
    <h1>{{ username }}</h1>
    <ne-post
      :key="i"
      v-for="(post, i) in posts"
      :src="post.post.images[0]"
      :authorname="post.author.username"
      :locname="post.location.name"
      :avatar="post.author.avatar[0].filename"
      :postId="post.postId"
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
    this.findNewestPost();
  },

  data() {
    return {
      posts: null,
      username: null,
    };
  },

  methods: {
    getUserInfo() {
      const _this = this;
      _this.axios
        .get(_this.api + "user/info/", { withCredentials: true })
        .then((res) => {
          if (res.data.state === "success") {
            var userId = res.data.data.user.id;
            this.username = res.data.data.user.username;
            return userId;
          } else {
            const errorMsg = res.data.error;
            console.log(errorMsg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    findNewestPost() {
      const _this = this;
      const userId = this.getUserInfo();
      _this.axios
        .get(_this.api + "post/list/?orderby=CR_DATE_DESC&a=" + userId, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.state === "success") {
            this.posts = res.data.data.posts;
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

