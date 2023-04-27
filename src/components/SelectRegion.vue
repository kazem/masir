<template>
  <div :class="[`${countryStore.theme}-custom-select`, 'font-light']" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          changeRegion();
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import {countryService} from '@/stores/index.js'
import { observer } from 'mobx-vue'
export default observer ({
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  mounted() {
      const urlParams = new URLSearchParams(window.location.search);
        const region = urlParams.get('region');
        let isCorrect = this.options.some(o => o === region)
        if(isCorrect){
            countryService.serRegion(region);
            this.selected = region
        }        
  },
  methods: {
      changeRegion() {
          console.log('selected region: ', this.selected);
          countryService.serRegion(this.selected)
          this.$router.push({ path: '/home-page', query: { region: this.selected }})
      }
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? "Filter by Region"
        : null,
      open: false,
      countryStore: countryService
    };
  },
});

</script>

<style lang="less" scoped>
@import url("@/styles/variables.less");
.light-custom-select {
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    height: 47px;
    line-height: 47px;   
    
    .selected {
        background-color: @white;
        border-radius: 4px;
        box-shadow: 0px 11px 25px -10px rgba(231, 231, 231, 0.98); 
        color: @very-dark-blue2;
        padding-left: 1em;
        cursor: pointer;
        user-select: none;
        height: 40px;
        padding: 8px 36px 8px 36px;
        display: flex;
        align-items: center;
    }

    .selected.open {
        border-radius: 6px 6px 0px 0px;
    }

    .selected:after {
        position: absolute;
        content: "";
        top: 26px;
        right: 1em;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-color: @very-dark-blue2 transparent transparent transparent;
    }

    .items {
        margin-top: 10px;
        box-shadow: 0px 11px 25px -10px rgba(231, 231, 231, 0.98);
        color: @very-dark-blue2;
        border-radius: 4px;
        overflow: hidden;
        position: absolute;
        background-color: @white;
        left: 0;
        right: 0;
        z-index: 1;

        div {    
            color: @very-dark-blue2;
            padding-left: 1em;
            cursor: pointer;
            user-select: none;
        }

        div:hover {
            background-color: @dark-blue;
            color: @white;
        }
    }
}

.dark-custom-select {
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    height: 47px;
    line-height: 47px;   
    
    .selected {
        background-color: @dark-blue;
        border-radius: 4px;
        box-shadow: 0px 11px 25px -10px rgba(0, 0, 0, 0.5); 
        color: @white;
        padding-left: 1em;
        cursor: pointer;
        user-select: none;
        height: 40px;
        padding: 8px 36px 8px 36px;
        display: flex;
        align-items: center;
    }

    .selected.open {
        border-radius: 6px 6px 0px 0px;
    }

    .selected:after {
        position: absolute;
        content: "";
        top: 26px;
        right: 1em;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-color: @white transparent transparent transparent;
    }

    .items {
        margin-top: 10px;
        box-shadow: 0px 11px 25px -10px rgba(0, 0, 0, 0.5);
        color: @white;
        border-radius: 4px;
        overflow: hidden;
        position: absolute;
        background-color: @dark-blue;
        left: 0;
        right: 0;
        z-index: 1;

        div {    
            color: @white;
            padding-left: 1em;
            cursor: pointer;
            user-select: none;
        }

        div:hover {
            background-color: @white;
            color: @very-dark-blue2;
        }
    }
}


.selectHide {
    display: none;
}
</style>