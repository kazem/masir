import { observable, makeObservable, runInAction, computed, action } from "mobx";
import { getAllCountries, getCountryByName } from '@/http-api/index'

class CountryStore {
    countries = []
    countryDetails = null
    errors = null
    serverStatus = "IDLE"
    theme = "light"
    filterValue = null
    region = null
    constructor() {
        makeObservable(this, {
            countries: observable,
            countryDetails: observable,
            errors: observable,
            serverStatus: observable,
            theme: observable,
            filterValue: observable,
            region: observable,
            setTheme: action,
            initTheme: action,
            setFilterValue: action,
            serRegion: action,
            getLanguagesCountry: computed,
            getCurrenciesCountry: computed,
            getBordersCountry: computed,
            filteredCountries: computed
        });
    }

    serRegion(value) {
        this.region = value;
    }

    isMatchFilterValue(countryName) {
        let countryNameSep = countryName.split("")
        let filterValueSep = this.filterValue.split("")
        var flag = true;
        filterValueSep.forEach(fvs => {
            let isCharMatch = countryNameSep.some(cns => cns === fvs)
            if (!isCharMatch)
                flag = false;
        })
        return flag
    }

    get filteredCountries() {
        let result = this.countries;
        if (this.filterValue) {
            result = this.countries.filter(c => {
                if (this.filterValue && c.name.official.toLowerCase().includes(this.filterValue)) {
                    return true;
                }

                else {
                    return this.isMatchFilterValue(c.name.official.toLowerCase())
                }
            })
        }
        if (this.region) {
            result = result.filter(c => c.region === this.region)
        }
        return result
    }

    setFilterValue(value) {
        this.filterValue = value;
    }

    setTheme() {
        let theme = localStorage.getItem('theme');
        this.theme = theme === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', this.theme);
    }

    initTheme() {
        let theme = localStorage.getItem('theme');
        if (!theme) {
            localStorage.setItem('theme', 'light')
            this.theme = localStorage.getItem('theme');
        }
        else
            this.theme = localStorage.getItem('theme');
    }



    get getLanguagesCountry() {
        let result = '';
        for (const lang in this.countryDetails.languages) {
            result += this.countryDetails.languages[lang] + ', '
        }

        return result.slice(0, -2);
    }

    get getCurrenciesCountry() {
        let result = '';
        for (const currency in this.countryDetails.currencies) {
            result += this.countryDetails.currencies[currency].name + ', '
        }
        return result.slice(0, -2);
    }

    get getBordersCountry() {
        let borderContries = []
        this.countryDetails?.borders?.forEach(border => {
            let borderCountry = this.countries.find(country => country.fifa === border)
            if (borderCountry)
                borderContries.push(borderCountry)
        });
        return borderContries
    }

    async getAllCountries() {
        runInAction(() => {
            this.serverStatus = "PENDING"
        })
        await getAllCountries().then((res) => {
            runInAction(() => {
                if (!res.err) {
                    this.serverStatus = "SUCCESS"
                    this.countries = res;
                }

                else {
                    this.serverStatus = "FAILED"
                    this.errors = res.err;
                }
            })
        }).catch((e) => {
            runInAction(() => {
                this.serverStatus = "FAILED"
                this.errors = e;
            })
        });

    }

    async getCountry(countryName) {
        runInAction(() => {
            this.serverStatus = "PENDING"
        })
        await getCountryByName(countryName).then((res) => {
            console.log('res: ', res);
            runInAction(() => {
                if (!res.err) {
                    this.serverStatus = "SUCCESS"
                    this.countryDetails = res;
                }

                else {
                    this.serverStatus = "FAILED"
                    this.errors = res.err;
                }
            })
        }).catch((e) => {
            runInAction(() => {
                this.serverStatus = "FAILED"
                this.errors = e;
            })
        });
    }
}


export const countryService = new CountryStore();