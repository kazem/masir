<template>
    <div :class="`${countryStore.theme}-home-page`">
        <div style="height: 50px; border: 1px solid red; display: none;">
            <p>countryStore.serverStatus: {{countryStore.serverStatus}}</p>
        </div>
        <Header />
        <div style="display: flex; justify-content: center;" v-if="countryStore.serverStatus === 'PENDING'">
            <Loading />
        </div>
        <div v-else-if="countryStore.serverStatus === 'FAILED'" style="display: flex; justify-content: center; color: red;" class="font-black">
            <p>{{countryStore.errors}}</p>
        </div>
        <div v-else-if="countryStore.serverStatus === 'SUCCESS'">
            <nav style="display: flex; justify-content: space-between; margin: 24px 0px 24px 0px;">
                <SearchField style="width: 25rem" />
                <SelectRegion style="width: 12rem" :options="options"/>
            </nav>
            <div :class="`${countryStore.theme}-home-page_country-row`">                      
                <CountryCard v-for="(country, index) in countryStore.filteredCountries" :key="index" :country="country"/>           
            </div>              
        </div>              
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import CountryCard from "@/components/CountryCard.vue"
import SearchField from "@/components/SearchField.vue"
import SelectRegion from "@/components/SelectRegion.vue"
import Loading from "@/components/Loading.vue"
import {countryService} from '@/stores/index.js'
import {observer} from 'mobx-vue'
export default observer ({
    components: {Header, CountryCard, SearchField, SelectRegion, Loading},
    async beforeCreate() {
        await countryService.getAllCountries();       
    },
    data() {
        return {
            countryStore: countryService,
            options: [
                "Africa",
                "Americas",
                "Asia",
                "Europe",                                                
                "Oceania"
            ]
        }
    }
})
</script>

<style lang="less" scoped>
@import url("@/styles/variables.less");
nav {
    padding: 0px;
}
.light-home-page {        
    height: 100%;  
    padding: 70px 5% 0% 5%;
    font-size: 14px;
    background-color: @very-light-gray;
    color: @very-dark-blue2;

    @media (max-width: 376px) {
        &_country-row {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;        
            justify-content: center;        
        }
    }

    @media (min-width: 376px) {
        &_country-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;        
            justify-content: space-between;       
            column-gap: 56px;
            row-gap: 32px;
        }
    }
}

.dark-home-page {        
    height: 100%;  
    padding: 70px 5% 0% 5%;
    font-size: 14px;
    background-color: @very-dark-blue1;
    color: @white;

    @media (max-width: 376px) {
        &_country-row {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;        
            justify-content: center;        
        }
    }

    @media (min-width: 376px) {
        &_country-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;        
            justify-content: space-between;       
            column-gap: 56px;
            row-gap: 32px;
        }
    }
}
</style>