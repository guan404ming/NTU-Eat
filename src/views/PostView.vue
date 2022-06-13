<template>
  <div>
    <ne-header></ne-header>
    <div class="container">
      <h1>{{ post.location.name }}</h1>

      <div class="icon">
        <button><span class="material-symbols-outlined">edit</span></button>
        <button @click="deletePost()">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>

      <a>{{ post.location.address }}</a>
      <img
        :src="
          'http://140.112.239.6/ntu-eat/data-img/post/' + post.post.images[0]
        "
      />
      <p>{{ post.post.content }}</p>
      <div class="tags">
        <button>
          <router-link to="#">台灣菜</router-link>
        </button>
        <button>
          <router-link to="#">平價</router-link>
        </button>
      </div>
    </div>

    <div class="author">
      <img
        :src="
          'http://140.112.239.6/ntu-eat/data-img/user/' +
          post.author.avatar[0].filename
        "
      />
      <div>
        <p class="">作者簡介</p>
        <p class="name">{{ post.author.username }}</p>
        <p class="intro">{{ post.author.description }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.container {
  margin: 18px;
  border-bottom: 1px solid #c9c9c9;
  h1 {
    width: calc(100% - 60px);
    margin-bottom: 10px;
    font-size: 28px;
    text-overflow: ellipsis;
    display: inline-block;
  }
  .icon {
    display: inline-flex;
    justify-content: flex-end;
    button {
      margin: 0px;
      padding: 0px;
      border: none;
      background-color: #fff;
      color: #707070;
      &:nth-child(1) {
        margin-right: 12px;
      }
      span {
        vertical-align: middle;
        height: 38px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  a {
    color: #707070;
    text-overflow: ellipsis;
    font-size: 12px;
    text-decoration: none;
    margin: 0px;
    margin: 0px auto 24px auto;
    color: #707070;
    display: block;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  img {
    object-fit: cover;
    height: 35vh;
    width: 100%;
    display: inline-block;
  }
  p {
    color: #707070;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .tags {
    margin-bottom: 24px;
    button {
      border: 1px solid #707070;
      border-radius: 5px;
      margin-right: 8px;
      background-color: #fff;
      a {
        font-size: 14px;
        height: 3%;
        color: #707070;
        text-decoration: none;
        margin: 0;
      }
    }
  }
}
.author {
  margin: 26px;
  display: flex;
  div {
    margin-left: 16px;
    display: inline-block;
    font-size: 12px;
    line-height: 14px;
    color: #707070;
    p {
      margin: 10px;
    }
    .name {
      font-size: 18px;
      color: #000;
    }
    .intro {
      line-height: 17px;
    }
  }
  img {
    display: inline-block;
    object-fit: cover;
    border-radius: 50%;
    height: 54px;
    width: 54px;
    flex-shrink: 0;
    margin-top: 12px;
  }
}
</style>


<script>
import NeHeader from "@/components/NeHeader.vue";
import { getApi, popup } from "@/GlobalSettings";

export default {
  name: "PostView",
  components: {
    NeHeader,
  },

  created() {
    const _this = this;
    this.postId = this.$route.params.postId;
    _this.axios
      .get(_this.api + "post/list/by-id/?p=" + _this.postId, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.state === "success") {
          this.post = res.data.data.post;
        } else {
          const errorMsg = res.data.error;
          console.log(errorMsg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  setup() {
    const api = getApi();
    return {
      api,
      popup,
    };
  },

  data() {
    return {
      postId: null,
      post: null,
    };
  },

  methods: {
    deletePost() {
      const _this = this;
      const postformdata = new FormData();
      postformdata.append("postId", this.postId);

      _this.axios
        .get(_this.api + "post/remove/", postformdata, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.state === "success") {
            console.log(res);
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

