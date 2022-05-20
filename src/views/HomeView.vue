<template>
  <div>
    <ne-header></ne-header>
    <ne-searchbar></ne-searchbar>
    <ne-pop-post-container></ne-pop-post-container>
    <h2>發現更多</h2>
    <ne-post src="https://pse.is/46c9dc"/>
    <ne-post src="https://pse.is/46fklc"/>
    <ne-post src="https://pse.is/475zrw"/>
  </div>
</template>

<script>
import NeHeader from '@/components/NeHeader.vue'
import NeSearchbar from '@/components/NeSearchbar.vue'
import NePopPostContainer from '@/components/NePopPostContainer.vue'
import NePost from '@/components/NePost.vue'

export default {
  name: 'HomeView',
  components: {
    NeHeader,
    NeSearchbar,
    NePopPostContainer,
    NePost,
  },
}

</script>

<style lang="scss" scoped>   
  h2{
    display: inline-block;
    margin: 12px 0px 0px 26px;
    border-bottom: 3px solid #F0E4D4;
    font-weight: 700;
    font-size: 21px;
    color: #707070;
    height: 30px;
  }
  .post{
    margin-top: 2px;
  }
</style>
