<template>
  <header :class="`${countryStore.theme}-header`">        
      <div :class="`${countryStore.theme}-header_container`">
        <p class="font-black">Where is the world?</p>
        <p @click="changeTheme" style="cursor: pointer;" class="font-bold">Dark Mode</p>        
      </div>
  </header>
</template>

<script>
import {countryService} from '@/stores/index.js'
import { observer } from 'mobx-vue'
export default observer ({
    data() {
        return {
            countryStore: countryService
        }
    },
    mounted() {
        document.querySelector('body').style.backgroundColor = countryService.theme === 'light' ? 'hsl(0, 0%, 98%)' : 'hsl(207, 26%, 17%)';
    },
    methods: {
        changeTheme() {
            countryService.setTheme()
            document.querySelector('body').style.backgroundColor = countryService.theme === 'light' ? 'hsl(0, 0%, 98%)' : 'hsl(207, 26%, 17%)';
        }
    }
})
</script>

<style lang="less" scoped>
@import url("@/styles/variables.less");
.light-header {       
    position: fixed;  
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    z-index: 999;
    background-color: @white;
    color: @very-dark-blue2;   
    box-shadow: 0px 3px 5px 0px hsl(0, 0%, 95%);
    &_container {
        padding: 0% 5% 0% 5%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }
}
.dark-header {       
    position: fixed;  
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    z-index: 999;
    background-color: @dark-blue;
    color: @white;   
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.5);
    &_container {
        padding: 0% 5% 0% 5%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }
}
</style>