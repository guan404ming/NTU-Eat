<template>
  <router-link class="post" to="/post">
      <img :src="src">
      <p class="username">Wesley Chiu</p>
      <p class="storename">咖啡是一種豆漿</p>  
  </router-link>
</template>

<script>
  export default {
    name: 'NePopPost',
    props: {
      src: String,
    },
  }
</script>

<style scoped lang="scss">
  .post{
    display: inline-block;
    height: 182px;
    width: calc(50vw - 23px);
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #FFFFFF;
    border-radius: 10px;
    margin-left: 12px;
    text-decoration: none;
    img{
      object-fit: cover;
      width: 100%;
      height: 50%;
      border-radius: 10px 10px 0px 0px;
    }
    .username{
      font-size: 14px;
      font-weight: 400;
      color: #707070;
      margin: 13px 0px 0px 15px;
    }
    .storename{
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
