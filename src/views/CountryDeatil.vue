<template>
  <div :class="`${countryStore.theme}-country-detail`">
        <div style="height: 50px; border: 1px solid red; display: none;">
            <p>countryStore.serverStatus: {{countryStore.countryDetails}}</p>
        </div>
        <Header />
        <Button @click.native="goBack" style="margin: 36px 0px 36px 0px" />
        <div v-if="countryStore.serverStatus === 'PENDING'" style="display: flex; justify-content: center;">
            <Loading />
        </div>

        <div v-else-if="countryStore.serverStatus === 'FAILED'" style="display: flex; justify-content: center; color: red;" class="font-black">
            <p>{{countryStore.errors}}</p>
        </div>

        <div v-else-if="countryStore.serverStatus === 'SUCCESS'" :class="`${countryStore.theme}-country-detail_container`">
            <img :class="`${countryStore.theme}-country-detail_container_image`" :src="countryStore.countryDetails.flags.svg" :alt="countryStore.countryDetails.flags.alt" />
            <div :class="`${countryStore.theme}-country-detail_container_details`">
                <p :class="[`font-black`, `${countryStore.theme}-country-detail_container_details_title`]">{{countryStore.countryDetails.name.common}}</p>
                <div :class="`${countryStore.theme}-country-detail_container_details_sub-details`">
                    <div style="text-align: left;">
                        <p :class="['font-bold', `${countryStore.theme}-country-detail_container_details_sub-details_text`]" style="width: 100%;">Native Name: <span class="font-light">{{countryStore.countryDetails.name.common}}</span></p>
                        <p :class="['font-bold', `${countryStore.theme}-country-detail_container_details_sub-details_text`]" style="width: 100%;">Population: <span class="font-light">{{countryStore.countryDetails.population.toLocaleString()}}</span></p>
                        <p :class="['font-bold', `${countryStore.theme}-country-detail_container_details_sub-details_text`]" style="width: 100%;">Region: <span class="font-light">{{countryStore.countryDetails.region}}</span></p>
                        <p :class="['font-bold', `${countryStore.theme}-country-detail_container_details_sub-details_text`]" style="width: 100%;">Sub Region: <span class="font-light">{{countryStore.countryDetails.subregion}}</span></p>
                        <p class="font-bold" style="width: 100%;">Capital: <span class="font-light">{{countryStore.countryDetails.capital ? countryStore.countryDetails.capital[0] : ''}}</span></p>
                    </div>
                    <div style="text-align: left;">
                        <p :class="['font-bold', `${countryStore.theme}-country-detail_container_details_sub-details_text`]" style="width: 100%;">Top Level Domain: <span class="font-light">{{countryStore.countryDetails.tld ? countryStore.countryDetails.tld[0] : ''}}</span></p>                                
                        <p :class="['font-bold', `${countryStore.theme}-country-detail_container_details_sub-details_text`]" style="width: 100%;">Currencies: <span class="font-light">{{countryStore.getCurrenciesCountry}}</span></p>
                        <p class="font-bold" style="width: 100%;">Languages: <span class="font-light">{{countryStore.getLanguagesCountry}}</span></p>
                    </div>
                </div>
                <div :class="`${countryStore.theme}-country-detail_container_details_border`">
                    <p :class="[`font-bold`, `${countryStore.theme}-country-detail_container_details_border_title`]">Border Contries: </p>                    
                    <div :class="`${countryStore.theme}-country-detail_container_details_border_countries`">
                        <Button 
                            v-for="(border, index) in countryStore.getBordersCountry"
                            :key="index"
                            @click.native="goToDetails(border.name.common)"
                            :title="border.name.common" 
                            style="margin: 0px 4px 0px 4px;" 
                        /> 
                    </div>                  
                </div>
            </div>
        </div>      
    
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Button from '@/components/Button.vue'
import Loading from "@/components/Loading.vue"
import {countryService} from '@/stores/index.js'
import { observer } from 'mobx-vue'
import Vue from 'vue'

export default observer ({
    components: {Header, Button, Loading},
    props: ["countryName"],
    data() {
        return {
            countryStore: countryService,
            vue: Vue,             
        }
    },
    async created(){        
        await countryService.getCountry(this.countryName)        
    },
    async beforeCreate() {
        await countryService.getAllCountries();              
    }, 
    methods: {
        async goToDetails(name){  
            console.log('goToDetails: ', name);   
            window.location.href = `/country-detail?countryName=${name}`   
            //this.$router.push({ path: '/country-detail', query: { countryName: name }})
        },
        goBack() {
            this.$router.go(-1)
        }
    }
})
</script>

<style lang="less" scoped>
@import url("@/styles/variables.less");
@media (max-width: 690px) {
.light-country-detail {
    height: 100%;  
    padding: 70px 5% 0% 5%;
    font-size: 16px;
    background-color: @very-light-gray;
    color: @very-dark-blue2;
    // height: 100vh;
    // overflow: hidden;

    &_container {
        display: flex; 
        flex-direction: column;    
        align-items: center; 
        width: 100%;    
         
        &_image {
            width: 100%;
        }        

        &_details {         
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;  
            gap: 1rem;     
            width: 100%;  

            &_title {
                width: 100%; 
                text-align: left; 
                font-size: 16px;
                margin: 32px 0px 0px 0px;
            }      

            &_sub-details {
                display: flex;  
                flex-direction: column;               
                align-items: flex-start;
                justify-content: space-between;
                margin-top: 16px;
                margin-bottom: 36px;
                width: 100%;
                gap: 2.5rem;

                &_text {
                    margin-bottom: 16px;
                }
            }

            &_border {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                width: 100%;    
                padding-bottom: 1rem; 
                gap: 1rem;
                &_title {
                    width: 100%;
                    text-align: left;
                } 
                &_countries {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }                
            }
        }
    }
}
.dark-country-detail {
    height: 100%;  
    padding: 70px 5% 0% 5%;
    font-size: 16px;
    background-color: @very-dark-blue1;
    color: @white;
    // height: 100vh;
    // overflow: hidden;

    &_container {
        display: flex; 
        flex-direction: column;    
        align-items: center; 
        width: 100%;    
         
        &_image {
            width: 100%;
        }        

        &_details {         
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;  
            gap: 1rem;     
            width: 100%;  

            &_title {
                width: 100%; 
                text-align: left; 
                font-size: 16px;
                margin: 32px 0px 0px 0px;
            }      

            &_sub-details {
                display: flex;  
                flex-direction: column;               
                align-items: flex-start;
                justify-content: space-between;
                margin-top: 16px;
                margin-bottom: 36px;
                width: 100%;
                gap: 2.5rem;

                &_text {
                    margin-bottom: 16px;
                }
            }

            &_border {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                width: 100%;    
                padding-bottom: 1rem; 
                gap: 1rem;
                &_title {
                    width: 100%;
                    text-align: left;
                } 
                &_countries {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }                
            }
        }
    }
}
}
@media (min-width: 690px) {
    .light-country-detail {
    height: 100%;  
    padding: 70px 5% 0% 5%;
    font-size: 16px;
    background-color: @very-light-gray;
    height: 100vh;
    overflow: hidden;
    color: @very-dark-blue2;

    &_container {
        display: flex;        
        justify-content: space-between;
        width: 100%;    
         
        &_image {
            width: 40%;
        }

        &_details {         
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;  
            gap: 2.5rem;     
            width: 60%;
            padding: 3rem 0rem 3rem 3rem;  
            &_title {
                width: 100%; 
                text-align: left; 
                font-size: 24px;
            }  
            &_sub-details {
                display: flex;                
                align-items: flex-start;
                justify-content: space-between;
                margin-top: 16px;
                margin-bottom: 36px;
                width: 100%;

                &_text {
                    margin-bottom: 4px;
                }
            }

            &_border {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
                /* flex-wrap: wrap; */
                gap: 0.5rem;
                &_title {                  
                    margin-right: 4px; 
                    text-align: left; 
                    width: 20%;
                } 
                &_countries {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                } 
                                     
            }
        }
    }
}
.dark-country-detail {
    height: 100%;  
    padding: 70px 5% 0% 5%;
    font-size: 16px;
    background-color: @very-dark-blue1;
    height: 100vh;
    overflow: hidden;
    color: @white;

    &_container {
        display: flex;        
        justify-content: space-between;
        width: 100%;    
         
        &_image {
            width: 40%;
        }

        &_details {         
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;  
            gap: 2.5rem;     
            width: 60%;
            padding: 3rem 0rem 3rem 3rem;  
            &_title {
                width: 100%; 
                text-align: left; 
                font-size: 24px;
            }  
            &_sub-details {
                display: flex;                
                align-items: flex-start;
                justify-content: space-between;
                margin-top: 16px;
                margin-bottom: 36px;
                width: 100%;

                &_text {
                    margin-bottom: 4px;
                }
            }

            &_border {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
                /* flex-wrap: wrap; */
                gap: 0.5rem;
                &_title {                  
                    margin-right: 4px; 
                    text-align: left; 
                    width: 20%;
                } 
                &_countries {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                } 
                                     
            }
        }
    }
}
}
</style>>

