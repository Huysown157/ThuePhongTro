import db from '../models'
const { Op } = require("sequelize");
import { v4 as uuidv4 } from 'uuid'
import generateDate from '../ultis/generateDate';

export const getPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})
export const getPostsLimitService = (page, query, { priceNumber, areaNumber }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query }
        let order = [];
        if (queries.order === 'createdAt_DESC') {
            order = [['createdAt', 'DESC']];
            delete queries.order;
        }
        if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber }
        if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber }
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            order,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const getNewPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [['createdAt', 'DESC']],
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
            ],
            attributes: ['id', 'title', 'star', 'createdAt']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const createPostService = (data) => new Promise(async (resolve, reject) => {
    try {
        // Validate đơn giản
        if (!data.title || !data.categoryCode || !data.images || !data.address) {
            return resolve({ err: 1, msg: 'Thiếu thông tin bắt buộc!' })
        }
        // Tạo id cho các bảng liên quan
        const postId = uuidv4()
        const imagesId = uuidv4()
        const attributesId = uuidv4()
        const overviewId = uuidv4()
        // Lưu ảnh
        await db.Image.create({ id: imagesId, image: JSON.stringify(data.images) })
        // Lưu thuộc tính
        await db.Attribute.create({ id: attributesId, price: data.price, acreage: data.acreage, published: data.published, hashtag: data.hashtag })
        // Lưu overview
        await db.Overview.create({
            id: overviewId,
            code: '',
            area: '',
            type: '',
            target: data.target || '',
            bonus: '',
            created: generateDate().today,
            expired: generateDate().expireDay,
        })
        // Lưu bài đăng
        await db.Post.create({
            id: postId,
            title: data.title,
            star: '0',
            labelCode: data.labelCode || '',
            address: data.address,
            attributesId,
            categoryCode: data.categoryCode,
            priceCode: data.priceCode || '',
            areaCode: data.areaCode || '',
            provinceCode: data.provinceCode || '',
            description: data.description,
            userId: data.userId || '',
            overviewId,
            imagesId,
            priceNumber: data.priceNumber,
            areaNumber: data.areaNumber
        })
        resolve({ err: 0, msg: 'Tạo bài đăng thành công!' })
    } catch (error) {
        reject(error)
    }
})

export const getPostsByUserService = (userId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            where: { userId },
            raw: true,
            nest: true,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description', 'createdAt']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Không tìm thấy tin đăng.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const updatePostService = (id, payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.update(payload, { where: { id } })
        resolve({
            err: response[0] === 1 ? 0 : 1,
            msg: response[0] === 1 ? 'Cập nhật tin thành công!' : 'Không có thay đổi hoặc tin không tồn tại.'
        })
    } catch (error) {
        reject(error)
    }
})

export const deletePostService = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.destroy({ where: { id } })
        resolve({
            err: response === 1 ? 0 : 1,
            msg: response === 1 ? 'Xóa tin thành công!' : 'Tin không tồn tại.'
        })
    } catch (error) {
        reject(error)
    }
})