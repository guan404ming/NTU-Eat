<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@600;700&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url("https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
  
  *{
    box-sizing: border-box;
    font-family: Montserrat, Noto Serif TC;
  }
  
  body{
    margin: 0px;
  }
  
  #app {
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  .popup{
    border: 2px solid #707070 !important;
    border-radius: 20px !important;
    box-shadow: 0px 8px 10px #00000029;
    width: 60vw !important;
    max-width: 500px !important;
  }
  .popup-icon{
    font-weight: 900;
    border: solid !important;
    color: #EBDECE !important;
  }

  .popup-button{
    color: #707070 !important;
    box-shadow: 0px 3px 6px #00000029 !important;
    border-radius: 20px !important;
    background-color: #EBDECE !important;
  }
  
  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 600,
      'GRAD' 0,
      'opsz' 48
  }

</style>