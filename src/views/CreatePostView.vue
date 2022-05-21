<template>
  <div>
    <ne-header></ne-header> 
    <div class='container'>
      
      <h1>撰寫貼文</h1>
      
      <div class="inputsection">
        <h2>地點</h2>
        <input :placeholder= "place.name" disabled>  
      </div>

      <div class="inputsection">
        <h2>內文</h2>
        <textarea placeholder="請輸入內文" v-model="content"></textarea>
      </div>
      
      <div class="inputsection">
        <h2>添加照片</h2>
        
        <div :class="{'uploaded': isUploaded}" class="uploadarea">
          <span class="material-symbols-outlined">add_photo_alternate</span>
          <input type="file" accept=".png, .jpeg, .gif, .jpg" @change="handleUploadPicture($event)" multiple class="image-picker">
        </div>

        <div :class="{'uploaded': isUploaded}" class="preview">
          <img v-for="src in link" :key="src.id" :src="src">
        </div>

        <div :class="{'uploaded': isUploaded}" class="controlbar">
          <button>
            <span class="material-symbols-outlined">add_photo_alternate</span>
          </button>
          <button>
              <span class="material-symbols-outlined" @click="deletePicture">delete</span>
          </button>
        </div>
      </div>
      <ne-go-button @click="handleCreatePost()" :class="{'uploaded': isUploaded}"></ne-go-button>
    </div>
  
  </div>  
</template>

<style scoped lang="scss">
  .container{
    margin: 20px;
    border: 1px solid #707070;
    border-radius: 20px;
    text-align: center;
    h1{
      text-align: center;
      margin-top: 38px auto 28px auto;
    }
    h2{
      margin: 0px auto 6px 11vw;
      text-align: left;
      font-size: 16px;
      line-height: 19px;
      color: #707070;
    }
    .inputsection{
      display: block;
      input, textarea{
        margin: 0 auto 16px auto;
        padding: 0 18px;
        height: 48px;
        width: 76vw;
        border: none;
        border-radius: 24px;
        background-color: #F4F4F4;  
        font-size: 14px;
        position: relative;
      }
      textarea{
        height: 32vh;
        padding-top: 12px;
        &::placeholder{
          line-height: 20px;
          letter-spacing: 0px;
          color: #707070;
        }
      }
      .uploadarea{
        &.uploaded{
          display: none;
        }
        display: flex;
        span{
          display: inline;
          margin: auto 0px;
          transform: translateX(calc((100vw - 52px) * 0.38 + 50%));
          position: relative;
          z-index: -1;
          font-size: 12vw;
          color: #000;
        }
        input{
          height: 32vh;
          width: 76vw;
          transform: translateX(-6vw);
          position: relative;
          color: transparent;
          opacity: 0.9;
          cursor: pointer;
          &::-webkit-file-upload-button{
            visibility: hidden;
          }
        }
      }
      .preview{
        display: none;
        margin: 0 auto 16px auto;
        white-space: nowrap;
        overflow: scroll;
        justify-content: stretch;
        align-content: center;
        height: 32vh;
        width: 76vw;
        border-radius: 24px;
        &::-webkit-scrollbar {
          display: none;
        }
        &.uploaded{
          display: flex;
        }
        img{
          display: inline;
          border-radius: 24px;
          object-fit: cover;
          width: 77vw;
        }
      }
      .controlbar{
        display: none;
        margin-left: calc(76% - 64px);
        transform: translateY(-64px);
        &.uploaded{
          display: inline-block;
        }
        button{
          border: 1px solid #707070;
          padding: 0px;
          text-decoration: none;
          border-radius: 50%;
          background-color: #000;
          margin-right: 8px;
          height: 32px;
          width: 32px;
          &:hover{
            opacity: 0.7;
            cursor: pointer;
          }
          span{
            margin: 0 auto;
            text-align: center;
            vertical-align: middle;
            font-size: 16px;
            color: #F4F4F4;
          }
        } 
      }
    }
    button{
      &.uploaded{
        transform: translateY(-32px);
        margin-bottom: -8px;
      }
    }
  }
</style>

<script>

import NeHeader from '@/components/NeHeader.vue'
import NeGoButton from '@/components/NeGoButton.vue'
import { getApi, popup } from '@/GlobalSettings.js'

export default {
  name: 'CreatePost',
  components: {
    NeHeader,
    NeGoButton
  },
  
  setup(){
    const api = getApi()
    return{
      api, popup
    }
  },

  created(){
    this.place = this.$route.params
  },

  data() {
    
    return{
      place: null,
      content: '',
      photo: [],
      link: [],
      isUploaded: false,
    }
  },

  methods: {

    handleUploadPicture(event) {
      const filelist = event.target.files
      for (var i = 0; i < filelist.length; i++){
        this.photo.push(filelist[i])
        if (this.photo[i]) {
          this.link.push(URL.createObjectURL(this.photo[i]))
        }
      }
      event.target.value = ''
      this.isUploaded = true
    },

    handleCreatePost() {
      const _this = this
      const postformdata = new FormData()
      postformdata.append('placeId', _this.place.placeId)
      postformdata.append('content', _this.content)
      // postformdata.append('tags', 'pa')
      postformdata.append('isPublic', true)
      for (var i=0; i < _this.photo.length; i++){
        postformdata.append('photo[]', this.photo[i])
      }
      
      _this.axios.post(_this.api + 'post/create/', postformdata, {withCredentials: true})
      .then((res) => {
        if (res.data.state === 'success'){
          console.log(res)
          _this.popup('文章已成功發布', '現在查看', 'success')
          this.setRedirection()
        } else{
          const errorMsg = res.data.error
          console.log(errorMsg)
          _this.checkError(errorMsg)
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    },

    checkError(errorMsg) {
      
      // check placeId error
      if (errorMsg.placeId === 'notFound' || errorMsg.placeId === 'zeroResult'){
        this.popup('無此地點', '重新選擇', 'question')
      }
      if (errorMsg.placeId === 'tooFar'){
        this.popup('此餐廳離學校太遠了', '重新選擇', 'warning')
      }
      if (errorMsg.placeId === 'other'){
        this.popup('伺服器問題', '請洽客服', 'warning')
      }

      // check if input 
      if (errorMsg.placeId === 'noInput'){
        this.popup('請回上一頁選取地點', '確認', 'question')
        var checkbutton = this.$swal.getConfirmButton()
        checkbutton.addEventListener('click', () => { this.$router.push('/getplaceid') })
      }

      if (errorMsg.content === 'noInput'){
        this.popup('請輸入內文', '確認', 'question')
      }
      if (errorMsg.photo === 'noInput'){
        this.popup('請上傳圖片', '確認', 'question')
      }
      
      // check general error
      if (errorMsg.general === 'unauthorised'){
        this.popup('請先登入小編帳號', '確認', 'warning')
      }
      if (errorMsg.general === 'ServerError'){
        this.popup('伺服器問題', '請洽客服', 'warning')
      }
    },

    setRedirection() {
      var checkbutton = this.$swal.getConfirmButton()
      checkbutton.addEventListener('click', () => { this.$router.push('/') })
    },

    deletePicture() {
      this.photo = []
      this.link = []
      this.isUploaded = false
    }
  },

  watch:{
    'photo': function() {
      for (var i = 0; i < this.photo.length; i++){
        this.photo.push(this.photo[i])
        if (this.photo[i]) {
          this.link.push(URL.createObjectURL(this.photo[i]))
        }
      }
    }
  }
}
</script>

