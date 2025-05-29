import db from "../models";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import chothuephongtro from "../../data/chothuephongtro.json";
import chothuecanho from "../../data/chothuecanho.json";
import nhachothue from "../../data/nhachothue.json";
import chothuematbang from "../../data/chothuematbang.json";
import generateCode from "../utils/generateCode";
import { dataPrice, dataArea } from "../utils/data";
import { getNumberFromString } from "../utils/common";

require("dotenv").config();

const dataBody = [
  { body: chothuephongtro.body, categoryId: 2 },
  { body: chothuematbang.body, categoryId: 4 },
  { body: chothuecanho.body, categoryId: 3 },
  { body: nhachothue.body, categoryId: 5 },
];

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = async () => {
  try {
    for (const cate of dataBody) {
      for (const item of cate.body) {
        // 1. Tạo user nếu chưa có
        const contactName = item?.contact?.content?.find(i => i.name === "Liên hệ:")?.content || "Người dùng";
        const phone = item?.contact?.content?.find(i => i.name === "Điện thoại:")?.content || "0000000000";
        const zalo = item?.contact?.content?.find(i => i.name === "Zalo")?.content || phone;
        let user = await db.User.findOne({ where: { phone } });
        if (!user) {
          user = await db.User.create({
            fullName: contactName,
            password: hashPassword("123456"),
            phone,
            email: null,
            role: "user",
            zalo,
            avatar: null,
            fileNameAvatar: null,
          });
        }

        // 2. Lấy các trường cho post
        const address = item?.header?.address || "";
        const title = item?.header?.title || "";
        const description = item?.mainContent?.content?.join("\n") || "";
        // Lấy giá trị price, nhân thêm 1.000.000 (thêm 6 số 0)
        let priceRaw = item?.header?.attributes?.price || "0";
        let price = parseFloat(priceRaw.replace(/[^\d.]/g, "")) || 0;
        price = Math.round(price * 1000000); // Thêm 6 số 0
        const area = parseInt(item?.header?.attributes?.acreage?.replace(/\D/g, "")) || 0;
        const createdAt = new Date();
        const updatedAt = new Date();

        // 3. Lấy id priceRange, areaRange phù hợp
        const priceRange = await db.PriceRange.findOne({
          where: { from: { [db.Sequelize.Op.lte]: price }, to: { [db.Sequelize.Op.gte]: price } },
        });
        const areaRange = await db.AreaRange.findOne({
          where: { from: { [db.Sequelize.Op.lte]: area }, to: { [db.Sequelize.Op.gte]: area } },
        });

        // 4. Tạo post
        const post = await db.Post.create({
          title,
          description,
          price,
          area,
          address,
          categoryId: cate.categoryId,
          province: address.split(",").pop().trim(),
          userId: user.id,
          priceRangeId: priceRange ? priceRange.id : 1,
          areaRangeId: areaRange ? areaRange.id : 1,
          status: "SHOW",
          target: "ALL",
          createdAt,
          updatedAt,
        });

        // 5. Tạo images
        const images = item?.images || [];
        for (const url of images) {
          await db.Image.create({
            url,
            fileName: null,
            postId: post.id,
            createdAt,
            updatedAt,
          });
        }
      }
    }
    return "done";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPricesAndAreas = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrice.forEach(async (item, index) => {
        await db.Price.create({
          code: item.code,
          order: index + 1,
          value: item.value,
        });
      });
      dataArea.forEach(async (item, index) => {
        await db.Area.create({
          code: item.code,
          order: index + 1,
          value: item.value,
        });
      });
      resolve("ok");
    } catch (error) {
      reject(error);
    }
  });
