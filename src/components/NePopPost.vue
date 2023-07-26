<template>
  <router-link class="post" :to="'/post/'+ post.postId">
    <img :src="'http://localhost/ntu-eat/data-img/post/' + post.post.images[0]" />
    <p class="authorname">{{ post.author.username }}</p>
    <p class="locname">{{ post.location.name }}</p>
  </router-link>
</template>

<script>
export default {
  name: "NePopPost",
  props: {
    post: Object,
  },
};
</script>

<style scoped lang="scss">
.post {
  display: inline-block;
  height: 182px;
  width: calc(50vw - 23px);
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #ffffff;
  border-radius: 10px;
  margin-left: 12px;
  text-decoration: none;
  img {
    object-fit: cover;
    width: 100%;
    height: 50%;
    border-radius: 10px 10px 0px 0px;
  }
  .authorname {
    font-size: 14px;
    font-weight: 400;
    color: #707070;
    margin: 13px 0px 0px 15px;
  }
  .locname {
    font-size: 18px;
    font-weight: 700;
    color: #707070;
    margin: 5px 10px 20px 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
