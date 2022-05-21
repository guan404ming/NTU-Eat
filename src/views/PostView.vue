<template>
  <div>
    <ne-header></ne-header>
    <div class='container'>
      <h1>駱記小炒</h1>
      
      <div class="icon">
        <button><span class="material-symbols-outlined">edit</span></button>
        <button @click="deletePost()"><span class="material-symbols-outlined">delete</span></button>
      </div>
      
      <a>台北市大安區通化街39巷27號</a>
      <img src="https://axwwgrkdco.cloudimg.io/v7/mitp-p-001-delivery.sitecorecontenthub.cloud/api/public/content/38b407bc29ba466186aec78252b9571d?" alt="">
      <p>
        世界地球日自1970年4月22日被發起後已超過半個世紀，2022年世界地球日即以「投資我們的星球」為主題，我們在日常生活裡除了投資更節能的家電、低碳通勤外，也可以透過選擇在地蔬果作為日常飲食，因為植物性食物碳排放皆比動物性食物低10-15倍，多吃菜其實能減緩氣候變遷，為地球降溫。因此簡天才師傅特地發起「無肉菜單」計畫，串聯旗下品牌包含 THOMAS CHIEN Restaurant 法式餐廳、LAONE Kitchen 歐陸廚房、LAONE Café 咖啡輕食、LAONE Pizza披薩、LAONE Bakery 烘焙坊，共同推出蔬食料理「無肉菜單」，除了部分菜色期間供應外，未來也將成為常態菜單，提供消費者做為選擇。
      </p>
      <div class='tags'> 
        <button>
          <router-link to='#'>台灣菜</router-link>
        </button>
        <button>
          <router-link to='#'>平價</router-link>
        </button>
      </div>
    </div>
    
    <div class='author'>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg/440px-Elon_Musk_Royal_Society_%28crop1%29.jpg" alt="">
      <div>
        <p class=''>作者簡介</p>
        <p class='name'>Wesley Chiu</p>
        <p class="intro">今年讀台大中文一年級，平常最愛到處亂吃，但台北物價真滴貴餒，我的錢包在哭</p>
      </div>
    </div>
  </div>  
</template>


<style scoped lang="scss">
  .container{
    margin: 18px;
    border-bottom: 1px solid #C9C9C9;
    h1{
      margin-bottom: 10px;
      font-size: 28px;
      display: inline-block;
    }
    .icon{
      margin-left: calc(100vw - 208px);
      display: inline-flex;
      justify-content: flex-end;
      button{
        margin: 0px;
        padding: 0px;
        border: none;
        background-color: #fff;
        color: #707070;
        &:nth-child(1){
          margin-right: 12px;
        }
        span{
          vertical-align: middle;
          height: 38px;  
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
    a{
      color: #707070;
      font-size: 12px;
      margin: 0px;
      margin: 0px auto 24px auto;
      color: #707070;
      display: block;
    }
    img{
      object-fit: cover;
      height: 35vh;
      width: 100%;
      display: inline-block;
    }
    p{
      color: #707070;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .tags{
      margin-bottom: 24px;
      button{
        border: 1px solid #707070;
        border-radius: 5px;
        margin-right: 8px;
        background-color: #fff;
        a{
          font-size: 14px;
          height: 3%;
          color: #707070;
          text-decoration: none;
          margin: 0;
        }
      }
    }
  }
  .author{
    margin: 26px;
    display: flex;
    div{
      margin-left: 16px;
      display: inline-block;
      font-size: 12px;
      line-height:14px;
      color: #707070;
      p{
        margin: 10px;
      }
      .name{
        font-size: 18px;
        color: #000;
      }
      .intro{
        line-height: 17px;
      }
    }
    img{
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

  import NeHeader from '@/components/NeHeader.vue'
  import { getApi, popup } from '@/GlobalSettings'
  
  export default {
    name: 'PostView',
    components: {
      NeHeader,
    },

    setup(){
      const api = getApi()
      return{
        api, popup
      }
    },

    data(){
      return{
        postId: '89'
      }
    },

    methods:{
      deletePost() { 
        const _this = this
        const postformdata = new FormData()
        postformdata.append('postId', this.postId)
        
        _this.axios.get(_this.api + 'post/remove/', postformdata, {withCredentials: true})
        .then((res) => {
          if (res.data.state === 'success'){
            console.log(res)
          } else{
            const errorMsg = res.data.error
            console.log(errorMsg)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      }
    }
  }

</script>

