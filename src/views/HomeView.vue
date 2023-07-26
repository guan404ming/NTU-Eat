<template>
  <div>
    <ne-header></ne-header>
    <ne-searchbar></ne-searchbar>
    <ne-pop-post-container></ne-pop-post-container>
    <h2>發現更多</h2>
    <ne-post
    :key="i"
    v-for="(post, i) in posts"
    :post="post"
    ></ne-post>
  </div>
</template>

<script>
import NeHeader from '@/components/NeHeader.vue'
import NeSearchbar from '@/components/NeSearchbar.vue'
import NePopPostContainer from '@/components/NePopPostContainer.vue'
import NePost from '@/components/NePost.vue'
import { getApi} from "@/GlobalSettings.js";

export default {
  name: 'HomeView',
  components: {
    NeHeader,
    NeSearchbar,
    NePopPostContainer,
    NePost,
  },

  setup() {
    const api = getApi();
    return {
      api,
    };
  },

  data() {
    return {
      posts: null,
    };
  },

  created() {
    this.getAllPost();
  },

  methods: {
    getAllPost() {
      let loader = this.$loading.show()
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
          loader.hide()
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
}

</script>

<style lang="scss" scoped>   
  h2{
    display: inline-block;
    margin: 12px 0px 0px 26px;
    border-bottom: 3px solid #F0E4D4;
    font-weight: 700;
    font-size: 21px;
    color: #707070;
    height: 30px;
  }
  .post{
    margin-top: 2px;
  }
</style>
