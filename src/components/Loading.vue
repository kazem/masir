<template>
  <div :class="`${countryStore.theme}-loader`"></div>
</template>

<script>
import { observer } from "mobx-vue";
import {countryService} from '@/stores/index.js'
export default observer ({
    data() {
        return {
            countryStore: countryService
        }
    }
})
</script>

<style lang="less" scoped>
@import url("@/styles/variables.less");
.light-loader {
  border: 16px solid @dark-gray;
  border-top: 16px solid @white; 
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 1.5s linear infinite;
}

.dark-loader {
  border: 16px solid @white;
  border-top: 16px solid @dark-gray;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>