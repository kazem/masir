import axios from 'axios'

export async function getAllCountries() {
    return await axios.get('https://restcountries.com/v3.1/all').then(res => {
        if (res.data) {
            return res.data;
        }
        else {
            return {
                err: 'Error in receiving information'
            }
        }
    }).catch((e) => {
        return {
            err: 'Please check your internet connection'
        }
    })
}

export async function getCountryByName(name) {
    return await axios.get(`https://restcountries.com/v3.1/name/${name}`).then(res => {
        if (res.data) {
            return res.data[0];
        }
        else {
            return {
                err: 'Error in receiving information'
            }
        }
    }).catch((e) => {
        return {
            err: 'Please check your internet connection'
        }
    })
}