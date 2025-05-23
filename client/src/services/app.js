import axios from '../axiosConfig'
import axiosDefault from 'axios'

export const apiGetPrices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/price/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetAreas = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/area/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/province/all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: 'https://provinces.open-api.vn/api/'
        })
        const formattedData = response.data.map(item => ({
            ...item,
            name: item.name,
            code: item.code
        }))
        resolve({
            data: formattedData,
            status: response.status
        })
    } catch (error) {
        reject(error)
    }
})
export const apiGetPublicDistrict = (provinceId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `https://provinces.open-api.vn/api/p/${provinceId}/?depth=2`
        })
        const formattedData = {
            ...response.data,
            districts: response.data.districts.map(item => ({
                ...item,
                name: item.name,
                code: item.code
            }))
        }
        resolve({
            data: formattedData,
            status: response.status
        })
    } catch (error) {
        reject(error)
    }
})