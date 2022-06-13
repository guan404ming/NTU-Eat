<template>
  <router-link class="post" :to="'/post/'+ postId">
    <div class="post-info">
      <div class="author">
        <img :src="'http://140.112.239.6/ntu-eat/data-img/user/' + avatar" />
        <p>{{authorname}}</p>
      </div>

      <div class="locname">
        <p>{{ locname }}</p>
      </div>

      <div class="loc-info">
        <p>
          台灣菜・
          <span class="price">$$</span>
        </p>
      </div>
    </div>
    <img :src="'http://140.112.239.6/ntu-eat/data-img/post/' + src" />
  </router-link>
</template>

<script>
export default {
  name: "NePost",
  props: {
    src: String,
    authorname: String,
    locname: String,
    avatar: String,
    postId: String,
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
