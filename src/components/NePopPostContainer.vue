<template>
  <div class="posts"> 
    
    <div class="home">
      <h2>最近熱門</h2>
    </div>
    
    <ne-pop-post src="https://pse.is/47lz3c" />
    <ne-pop-post src="https://pse.is/45ggwv" />
    <ne-pop-post src="https://pse.is/45c3w3" />
    <ne-pop-post src="https://pse.is/479w95" />
    

    <!-- <button @click="getAllPost()">get</button> -->

  </div>

</template>

<script>
  import NePopPost from '@/components/NePopPost.vue'
  import { getApi, popup } from '@/GlobalSettings.js'

  export default {
    name: 'NePopPostContainer',
    components: {
      NePopPost,
    },

    setup() {
      const api = getApi()
      return{
        api, popup
      }
    },

    methods: {

      getAllPost() {
        const _this = this
        _this.axios.get(_this.api + 'post/list/?page=0&eachPage=1', {withCredentials: true})
        .then((res) => {
          if (res.data.state === 'success'){
            console.log(res)
            // _this.popup('文章已成功發布', '現在查看', 'success')
            // this.setRedirection()
          } else{
            const errorMsg = res.data.error
            console.log(errorMsg)
            // _this.checkError(errorMsg)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .posts{
    padding: 26px 16px;
    white-space: nowrap;
    overflow: scroll;
    > div {
      vertical-align: middle;
    }
    
    > a{
      vertical-align: middle;
    }
    &::-webkit-scrollbar {
        display: none;
    }
    .home{
      display: inline-block;
      height: 182px;
      width: calc(50vw - 23px);
      box-shadow: 0px 3px 6px #00000029;
      border: 1px solid #FFFFFF;
      border-radius: 10px;
      h2{
        margin: 16px;
        font-weight: bold; 
        font-size: 20px;
        color: #707070;
        border-bottom: 3px solid #F0E4D4;
        height: 30px;
        display: inline-block;
      }
    }
  }
  
</style>
