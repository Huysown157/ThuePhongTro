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
                { model: db.Overview, as: 'overview', attributes: ['expired'] },
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

        // Lấy thông tin Category và Province để xác định type và area
        const category = await db.Category.findOne({ where: { code: data.categoryCode } });
        const province = await db.Province.findOne({ where: { code: data.provinceCode } });

        // Tạo id cho các bảng liên quan
        const postId = uuidv4()
        const imagesId = uuidv4()
        const attributesId = uuidv4()
        const overviewId = uuidv4()

        // Tạo code tự động (ví dụ: 8 ký tự đầu của UUID)
        const generatedCode = uuidv4().slice(0, 8);

        // Xác định type và area dựa trên thông tin lấy được
        const postType = category ? category.value : '';
        const postArea = (category && province) ? `${category.value} tại ${province.value}` : (category ? category.value : ''); // Kết hợp Category và Province
        const postBonus = 'Tin thường'; // Bonus mặc định

        // Lưu ảnh
        await db.Image.create({ id: imagesId, image: JSON.stringify(data.images) })
        // Xử lý ngày bắt đầu và ngày hết hạn
        let publishedDate = new Date(); // Luôn lấy ngày hiện tại
        let expiredDate = new Date(publishedDate);
        expiredDate.setDate(expiredDate.getDate() + 30);
        // Format lại ngày cho giống formatDate trong generateDate.js
        // const formatDate = (timeObj) => {
        //     let day = timeObj.getDay() === 0 ? 'Chủ nhật' : `Thứ ${timeObj.getDay() + 1}`;
        //     let date = `${timeObj.getDate()}/${timeObj.getMonth() + 1}/${timeObj.getFullYear()}`;
        //     let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`;
        //     return `${day}, ${time} ${date}`;
        // };
        // Lưu thuộc tính
        await db.Attribute.create({ id: attributesId, price: data.price, acreage: data.acreage, published: publishedDate.toISOString(), hashtag: data.hashtag })
        // Lưu overview
        await db.Overview.create({
            id: overviewId,
            code: generatedCode, // Sử dụng code tự tạo
            area: postArea,     // Sử dụng area đã xác định
            type: postType,     // Sử dụng type đã xác định
            target: data.target || '',
            bonus: postBonus,   // Sử dụng bonus mặc định
            created: publishedDate.toISOString(),
            expired: expiredDate.toISOString(),
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
                { model: db.Overview, as: 'overview', attributes: ['expired'] },
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
        // Tìm bài post cần cập nhật
        const post = await db.Post.findOne({
            where: { id },
            include: [
                { model: db.Attribute, as: 'attributes' },
                { model: db.Overview, as: 'overview' },
                { model: db.Image, as: 'images' }
            ]
        });

        if (!post) {
            return resolve({
                err: 1,
                msg: 'Không tìm thấy tin đăng cần cập nhật.'
            });
        }

        // Cập nhật Attribute
        if (post.attributes && payload.price && payload.acreage) {
            await db.Attribute.update(
                {
                    price: payload.price,
                    acreage: payload.acreage,
                    hashtag: payload.hashtag || post.attributes.hashtag
                },
                { where: { id: post.attributes.id } }
            );
        }

        // Cập nhật Overview
        if (post.overview && payload.target) {
            await db.Overview.update(
                {
                    target: payload.target,
                    bonus: payload.bonus || post.overview.bonus,
                    area: payload.area || post.overview.area,
                    type: payload.type || post.overview.type
                },
                { where: { id: post.overview.id } }
            );
        }

        // Cập nhật Image
        if (post.images && payload.images) {
            await db.Image.update(
                { image: payload.images },
                { where: { id: post.images.id } }
            );
        }

        // Cập nhật Post
        const postUpdateData = {
            title: payload.title || post.title,
            address: payload.address || post.address,
            categoryCode: payload.categoryCode || post.categoryCode,
            priceCode: payload.priceCode || post.priceCode,
            areaCode: payload.areaCode || post.areaCode,
            provinceCode: payload.provinceCode || post.provinceCode,
            description: payload.description || post.description,
            priceNumber: payload.priceNumber || post.priceNumber,
            areaNumber: payload.areaNumber || post.areaNumber
        };

        await db.Post.update(postUpdateData, { where: { id } });

        resolve({
            err: 0,
            msg: 'Cập nhật tin thành công!'
        });
    } catch (error) {
        reject(error);
    }
});

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