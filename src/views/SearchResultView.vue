<template>
  <div>
    <ne-header></ne-header>
    <h1>搜尋結果</h1>
    <div class="posts">
      <ne-pop-post
        :key="i"
        v-for="(post, i) in posts"
        :post="post"
      ></ne-pop-post>
      <ne-pop-post
        v-if="posts.length % 2 !== 0 && posts.length !== 0"
        style="visibility: hidden"
        :post="posts[0]"
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
          this.checklimitation(res)
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    checklimitation(res) {
      if (res.data.state === "success" && res.data.data.posts.length > 0) {
        res.data.data.posts.forEach((element) => {
          var hasTag = false
          element.post.tags.forEach((el) => {
          if (el.name === this.$route.params.tag){
            hasTag = true;
          }
          })
          if (this.$route.params.tag==='null' || hasTag){
            this.posts.push(element);
          }
        });
      }
    },

    getGoogleApi() {
      const apiKey = "key=AIzaSyBv1bZpr-pLSgw6cnTkpexgcFgY40F3j0w";
      var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${apiKey}&${this.$route.params.parameters}`;
      // console.log(url)
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
          if (this.posts.length == 0) {
            console.log(this.posts)
            this.getAllPost()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getAllPost() {
      const _this = this;
      _this.axios
        .get(_this.api + "post/list/?page=0&eachPageNum=8&", {
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
        margin-left: 12px;
        margin-right: 12px;
      }
    }
  }
}
</style>
