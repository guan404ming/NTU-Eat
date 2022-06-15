<template>
  <div class="posts">
    <div class="home">
      <h2>最近熱門</h2>
    </div>

    <ne-pop-post
      :key="i"
      v-for="(post, i) in posts"
      :post="post"
    ></ne-pop-post>

  </div>
</template>

<script>
import NePopPost from "@/components/NePopPost.vue";
import { getApi, popup } from "@/GlobalSettings.js";

export default {
  name: "NePopPostContainer",
  components: {
    NePopPost,
  },
  
  data() {
    return {
      posts: null,
    };
  },

  setup() {
    const api = getApi();
    return {
      api,
      popup,
    };
  },

  created() {
    this.getAllPost();
  },

  methods: {
    getAllPost() {
      const _this = this;
      _this.axios
        .get(_this.api + "post/list/?page=0&eachPageNum=5&orderby=CR_DATE_DESC", {
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

<style scoped lang="scss">
.posts {
  padding: 26px 16px;
  white-space: nowrap;
  overflow: scroll;
  > div {
    vertical-align: middle;
  }

  > a {
    vertical-align: middle;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  .home {
    display: inline-block;
    height: 182px;
    width: calc(50vw - 23px);
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #ffffff;
    border-radius: 10px;
    h2 {
      margin: 16px;
      font-weight: bold;
      font-size: 20px;
      color: #707070;
      border-bottom: 3px solid #f0e4d4;
      height: 30px;
      display: inline-block;
    }
  }
}
</style>
