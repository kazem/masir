export const Theme = {
    install(Vue, options) {
        Vue.prototype.$darkMode = false
        Vue.prototype.$setDarkMode = function () {
            this.$darkMode = !this.$darkMode
            console.log('this.$darkMode: ', this.$darkMode);
        }
        Vue.prototype.$getDarkMode = function () {
            console.log('this.$darkMode: ', this.$darkMode);
            return this.$darkMode
        }
    }
};