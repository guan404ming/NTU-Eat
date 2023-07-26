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
    this.getPosts();
  },

  methods: {
    getPosts() {
      let loader = this.$loading.show()
      var url =  this.api + 'post/list/match/?' + `${this.$route.params.parameters}`;
      if (this.$route.params.parameters === "&") {
        this.getAllPost()
        loader.hide()
      } else {
        this.axios
        .get(url)
        .then((res) => {
          if (res.data) {
            this.posts = res.data.data.posts
            if (this.posts.length == 0){
              this.getAllPost()
              console.log(this.posts)
            }
          } else {
            console.log(res);
          }
          loader.hide()
        })
        .catch(function (error) {
          console.log(error);
        });
      }
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
  h1 {
    text-align: center;
    padding: 12px;
    margin: 24px;
    border-bottom: solid;
    border-bottom-color: rgb(201, 201, 201);
    border-bottom-width: 1px;
  }
  .posts {
    margin-right: 6px;
    margin-left: 6px;
    a {
      text-align: center;
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
