<template>
  <ne-header></ne-header>
  <div class=container>
    
    <h1>{{username}}</h1>
    <router-link v-for="n in 4" :key="n" to="/post">
      <ne-post src="https://pse.is/46c9dc"/>
      <ne-post src="https://pse.is/46fklc"/>
    </router-link>

  </div>
  
</template>

<style scoped lang="scss">
  .container{
    margin: 0px 8px;
    h1{
      text-align: center;
      margin: 38px auto 44px auto;
    }
    a{
      text-decoration: none;
    }
  }
</style>

<script>

import NeHeader from '@/components/NeHeader.vue'
import NeInputbar from '@/components/NeInputbar.vue'
import NeGoButton from '@/components/NeGoButton.vue'
import NePost from '@/components/NePost.vue'
import { getApi, popup } from '@/GlobalSettings.js'

export default {
  name: 'AuthorPostListView',
  components: {
    NeHeader,
    NeInputbar,
    NeGoButton,
    NePost
  },

  setup() {
    const api = getApi();
    return{
      api, popup
    }
  },

  created(){
    this.getUsername()
  },

  data() {
    return{
      username: '',
    } 
  },

  methods: {

    getUsername() {
      const _this = this
      _this.axios.get(_this.api + 'user/info/', {withCredentials: true})
      .then((res) => {
        if (res.data.state === 'success'){
          _this.username = res.data.data.user.username
        } else{
          const errorMsg = res.data.error
          console.log(errorMsg)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    },

    setRedirection() {
      var checkbutton = this.$swal.getConfirmButton()
      checkbutton.addEventListener('click', () => { this.$router.push('/') })
    },
  
    handleSignout() {
      const _this = this
      _this.axios.get(_this.api + 'user/logout/', {withCredentials: true})
      .then((res) => {
        if (res.data.state === 'success'){
          console.log(res.data)
          _this.popup('成功登出', '返回首頁', 'success')
          _this.setRedirection()
        } else{
          const errorMsg = res.data.error
          console.log(errorMsg)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    },
  }
}
</script>

