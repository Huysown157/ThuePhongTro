import * as inserService from '../services/insert'

export const insert = async (req, res) => {
    try {
        const response1 = await inserService.insertService()
        const response2 = await inserService.createPricesAndAreas()
        return res.status(200).json({
            err: 0,
            msg: 'Insert data successfully',
            response: {
                insert: response1,
                pricesAndAreas: response2
            }
        })
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at insert controller: ' + error
        })
    }
}