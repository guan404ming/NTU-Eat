<template>
    <div class="post">
      <div class="post-info">
        <div class="author">
          <img src="https://imgs.gvm.com.tw/upload/gallery/20200309/71488_01.jpg" alt="">
          <p>Wesley Chiu</p>
        </div>

        <div class="name">
          <p>茶是一種菜湯嗎</p>
        </div>

        <div class="store-info">
          <p>
            台灣菜・
            <span class="price">$$</span>
          </p>
        </div>
      </div>
      <img :src="src">
    </div>
</template>

<script>
  export default {
    name: 'NePost',
    props: {
      src: String,
    },
  }
  
</script>


<style scoped lang="scss">
  .post{
    margin: 0px 28px;
    padding: 18px 0px;
    border-bottom: 1px solid #C9C9C9;
    height: 112px;
    display: flex;
    justify-content: space-between;
    .post-info{
      margin-right: 30px;
      display: inline-block;
      .author{
        p{
          display: inline-block;
          margin: 0px;
          font-size: 12px;
          line-height:14px;
          color: #707070;
        }
        img{
          display: inline-block;
          border-radius: 50%;
          height: 18px;
          width: 18px;
          vertical-align: middle;
          object-fit: fill;
        }
      }

      .name{
        p{
          margin: 8px 0px;
          font-size: 18px;
          font-weight: 400;
          line-height: 26px;
          color: #707070;
          white-space: nowrap;
        }
      }

      .store-info{
        p{
          margin: 0px;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0px;
          color: #707070;
        }  
      }
    }
    img{
      object-fit: cover;
      width: 35%;
      height: 100%;
      display: inline-block;
      margin-right: 10px;
    }
  }
</style>
