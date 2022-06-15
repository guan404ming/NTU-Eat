<template>
  <div>
    <ne-header></ne-header>
    <h1>搜尋結果</h1>
    <div class="posts">
      <ne-pop-post
        :key="i"
        v-for="(post, i) in posts"
        :src="post.post.images[0]"
        :authorname="post.author.username"
        :locname="post.location.name"
        :postId="post.postId"
      ></ne-pop-post>
      <ne-pop-post
        v-if="posts.length % 2 !== 0 && posts.length !== 0"
        style="visibility: hidden"
        :src="posts[0].post.images[0]"
      ></ne-pop-post>
    </div>
  </div>
</template>

<script>
import NeHeader from "@/components/NeHeader.vue";
import NeSearchbar from "@/components/NeSearchbar.vue";
import NePopPost from "@/components/NePopPost.vue";
import NePopPostContainer from "@/components/NePopPostContainer.vue";
import { getApi } from "@/GlobalSettings.js";

export default {
  name: "SearchResultView",
  components: {
    NeHeader,
    NeSearchbar,
    NePopPost,
    NePopPostContainer,
  },

  setup() {
    const api = getApi();
    return {
      api,
    };
  },

  data() {
    return {
      posts: [],
    };
  },

  created() {
    this.getGoogleApi();
  },

  methods: {
    getPostByPlaceId(placeId) {
      const _this = this;
      _this.axios
        .get(_this.api + `post/list/by-place/?p=${placeId}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.state === "success") {
            if (res.data.data.posts.length > 0) {
              res.data.data.posts.forEach((element) => {
                this.posts.push(element);
              });
            }
          } else {
            const errorMsg = res.data.error;
            console.log(errorMsg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getGoogleApi() {
      const apiKey = "&key=AIzaSyBv1bZpr-pLSgw6cnTkpexgcFgY40F3j0w";
      var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${apiKey}&${this.$route.params.parameters}`;
      this.axios
        .get(url)
        .then((res) => {
          if (res.data.results) {
            res.data.results.forEach((element) => {
              this.getPostByPlaceId(element.place_id);
            });
          } else {
            console.log(res);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  text-align: center;
  h1 {
    padding: 12px;
    margin: 24px;
    border-bottom: solid;
    border-bottom-color: rgb(201, 201, 201);
    border-bottom-width: 1px;
  }
  .posts {
    margin-right: 12px;
    a {
      vertical-align: middle;
      margin-bottom: 12px;
      :deep .authorname,
      :deep .locname {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
}
</style>
