<template>
  <div v-if="isLoaded">
    <router-link class="post" :to="'/post/'+ post.postId">
    <div class="post-info">
      <div class="author">
        <img :src="data + 'user/' + post.author.avatar[0].filename" />
        <p>{{post.author.username }}</p>
      </div>

      <div class="locname">
        <p>{{ post.location.name }}</p>
      </div>

      <div class="loc-info">
        <p>
          {{firstTag +"・"}}
          <span class="price">{{price[post.location.price]}}</span>
        </p>
      </div>
    </div>
    <img :src="data + 'post/' + post.post.images[0]" />
    </router-link>
  </div>
  
</template>

<script>
import { getData } from "@/GlobalSettings";
export default {
  name: "NePost",
  props: {
    post: Object
  },

  created() {
    if (this.post.post.tags.length > 0) {
      this.firstTag =  this.post.post.tags[0].name
    } else {
      this.firstTag =  "none"
    }
  },

  setup() {
    const data = getData();
    return {
      data,
    };
  },

  data(){
    return{
      isLoaded: true,
      price: ["$", "$", "$$", "$$$"],
      firstTag: null 
    }
  },
};
</script>


<style scoped lang="scss">
.post {
  margin: 0px 28px;
  padding: 18px 0px;
  border-bottom: 1px solid #c9c9c9;
  height: 112px;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  .post-info {
    margin-right: 30px;
    display: inline-block;
    .author {
      p {
        display: inline-block;
        margin: 0px;
        font-size: 12px;
        line-height: 14px;
        color: #707070;
      }
      img {
        display: inline-block;
        border-radius: 50%;
        height: 18px;
        width: 18px;
        vertical-align: middle;
        object-fit: fill;
      }
    }

    .locname {
      p {
        margin: 8px 0px;
        font-size: 18px;
        font-weight: 400;
        line-height: 26px;
        color: #707070;
        white-space: nowrap;
        width: 45vw;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .loc-info {
      p {
        margin: 0px;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0px;
        color: #707070;
      }
    }
  }
  img {
    object-fit: cover;
    width: 35%;
    height: 100%;
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
