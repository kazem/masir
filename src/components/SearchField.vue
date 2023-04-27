<template>
  <div :class="`${countryStore.theme}-search`">
    <img style="width: 20px;" src="@/assets/search-icon.svg" alt="search icon"/>
    <input 
        :style="[{'background-color': countryStore.theme === 'light' ? 'white' : 'hsl(209, 23%, 22%)'},
        {'color': countryStore.theme === 'light' ? 'hsl(200, 15%, 8%)' : 'white'}
        ]"
        @input="chabgeSearchInput" :value="value" 
        class="font-light" 
        placeholder="Search for a country..." 
        type="text"/>
  </div>
</template>

<script>
import {countryService} from '@/stores/index.js'
import { observer } from 'mobx-vue';
export default observer ({
    data() {
        return {
            value: '',
            countryStore: countryService
        }
    },
    methods: {
        chabgeSearchInput(e) {         
            this.value = e.target.value;
            countryService.setFilterValue(this.value)
        }
    }
})
</script>

<style lang="less" scoped>
@import url("@/styles/variables.less");
.light-search {
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 40px;
    border-radius: 4px;
    background-color: @white;
    color: @very-dark-blue2;
    padding: 8px 36px 8px 36px;
    box-shadow: 0px 11px 25px -10px rgba(231, 231, 231, 0.98);    
}

.dark-search {
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 40px;
    border-radius: 4px;
    color: @white;
    background-color: @dark-blue;
    padding: 8px 36px 8px 36px;
    box-shadow: 0px 11px 25px -10px rgba(0, 0, 0, 0.5);    
}
input {    
    height: 40px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 18px;
}
</style>