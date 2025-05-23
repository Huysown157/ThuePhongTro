import db from '../models'

// GET CURRENT
export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['password']
            }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get provinces.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const updateUser = (payload, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.update(payload, { where: { id } })
        resolve({
            err: response[0] === 1 ? 0 : 1,
            msg: response[0] === 1 ? 'Cập nhật thành công!' : 'Không có thay đổi hoặc user không tồn tại.'
        })
    } catch (error) {
        reject(error)
    }
})