<template>
  <div @click="goToDetails" :class="`${countryStore.theme}-country-card`">
      <img loading="lazy" :class="`${countryStore.theme}-country-card_flag`" :src="country.flags.svg" :alt="country.flags.alt" />
      <div :class="`${countryStore.theme}-country-card_content`">
          <p :class="['font-black', `${countryStore.theme}-country-card_content_title`]" style="width: 100%;">{{country.name.official}}</p>
          <p :class="['font-black', `${countryStore.theme}-country-card_content_decription`]" style="width: 100%;">Population: <span class="font-light">{{country.population.toLocaleString()}}</span></p>
          <p :class="['font-black', `${countryStore.theme}-country-card_content_decription`]" style="width: 100%;">Region: <span class="font-light">{{country.region}}</span></p>
          <p :class="['font-black', `${countryStore.theme}-country-card_content_decription`]" style="width: 100%;">Capital: <span class="font-light">{{country.capital ? country.capital[0] : ''}}</span></p>
      </div>
  </div>
</template>

<script>
import {countryService} from '@/stores/index.js'
import { observer } from 'mobx-vue'
export default observer({
    data() {
        return {
            countryStore: countryService
        }
    },
    props: {
        country: {
            type: Object
        }
    },
    methods: {
        async goToDetails(){            
            this.$router.push({ path: '/country-detail', query: { countryName: this.country.name.common }})
        }
    }
})
</script>

<style lang="less" scoped>
@import url("@/styles/variables.less");
@media (max-width: 376px) {
    .light-country-card {
        cursor: pointer;
        width: 290px;              
        border: 4px;
        border: 4px;   
        background-color: @white;
        box-shadow: 0px 11px 25px -10px rgba(231, 231, 231, 0.98);  
        margin-bottom: 2rem;     
        &_flag {
            width: 100%;           
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }
        &_content {
            &_title {
                margin: 16px 0px 16px 0px
            }
            &_decription {
                margin-bottom: 4px;
            }
            text-align: left;
            padding: 0px 0px 36px 16px;
        }      
    }
    .dark-country-card {
        cursor: pointer;
        width: 290px;              
        border: 4px;
        border: 4px;   
        background-color: @dark-blue;
        box-shadow: 0px 11px 25px -10px rgba(231, 231, 231, 0.98);  
        margin-bottom: 2rem;     
        &_flag {
            width: 100%;           
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }
        &_content {
            &_title {
                margin: 16px 0px 16px 0px
            }
            &_decription {
                margin-bottom: 4px;
            }
            text-align: left;
            padding: 0px 0px 36px 16px;
        }      
    }
}
    .light-country-card {
        cursor: pointer;
        width: 230px;                   
        border: 4px;
        border: 4px;    
        background-color: @white;
        box-shadow: 0px 11px 25px -10px rgba(231, 231, 231, 0.98);  
        max-height: 293.333px;    
        &_flag {
            width: 100%;
            min-height: 133.33px;                     
            max-height: 153.33px; 
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }
        &_content {
            &_title {
                margin: 16px 0px 16px 0px
            }
            &_decription {
                margin-bottom: 4px;
            }
            text-align: left;
            padding: 0px 0px 36px 16px;
        }      
    }
    .dark-country-card {
        cursor: pointer;
        width: 230px;                   
        border: 4px;
        border: 4px;    
        background-color: @dark-blue;
        box-shadow: 0px 11px 25px -10px rgba(0, 0, 0, 0.5);  
        max-height: 293.333px;          
        &_flag {
            width: 100%;
            min-height: 133.33px;                     
            max-height: 153.33px; 
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }
        &_content {
            &_title {
                margin: 16px 0px 16px 0px
            }
            &_decription {
                margin-bottom: 4px;
            }
            text-align: left;
            padding: 0px 0px 36px 16px;
        }      
    }
</style>