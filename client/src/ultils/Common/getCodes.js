import { getNumbersArea, getNumbersPrice } from "./getNumbers"


export const getCodePrice = (totals,min,max) => {
    let arr = []
    return totals?.map(item => {
        let arrMaxMin = getNumbersPrice(item.value)
        if (arrMaxMin.length === 1) arr.push(arrMaxMin[0])
        let sortedArr = arr.sort()
        return ({
            ...item,
            min: sortedArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
            max: sortedArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortedArr.indexOf(arrMaxMin[0]) === 1 ? 9999999 : arrMaxMin[1]
        })
    })
}
export const getCodeArea = (totals,min,max) => {
    let arr = []
    return totals?.map(item => {
        let arrMaxMin = getNumbersArea(item.value)
        if (arrMaxMin.length === 1) arr.push(arrMaxMin[0])
        let sortedArr = arr.sort()
        return ({
            ...item,
            min: sortedArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
            max: sortedArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortedArr.indexOf(arrMaxMin[0]) === 1 ? 9999999 : arrMaxMin[1]
        })
    })
}

export const getCodesPrice = (arrMinMax, prices,min,max) => {
    const pricesWithMinMax = getCodePrice(prices,min,max)
    return pricesWithMinMax.filter(item => (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1]))
}
export const getCodesArea = (arrMinMax, areas,min,max) => {
    const areasWithMinMax = getCodeArea(areas)
    return areasWithMinMax.filter(item => (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1]))
}