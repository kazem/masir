<template>
  <div :class="`${countryStore.theme}-btn`">
      <p>{{title}}</p>
  </div>
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
  props: {
    title: {
      type: String,
      default: 'Back'
    }
  }
})
</script>

<style lang="less" scoped>
@import url("@/styles/variables.less");
.light-btn {
    cursor: pointer;
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 8px 8px 8px;
    border-radius: 4px;
    background-color: @white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.dark-btn {
    cursor: pointer;
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 8px 8px 8px;
    border-radius: 4px;
    background-color: @dark-blue;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 12px;
}
</style>