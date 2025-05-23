import moment from 'moment'

const formatDate = (timeObj) => {
  let day = timeObj.getDay() === 0 ? 'Chủ nhật' : `Thứ ${timeObj.getDay() + 1}`
  let date = `${timeObj.getDate()}/${timeObj.getMonth() + 1}/${timeObj.getFullYear()}`
  let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`
  return `${day}, ${time} ${date}`
}

// Nhận vào số ngày cộng thêm (mặc định 30)
const generateDate = (plusDays = 30) => {
  let today = new Date()
  let expireDay = moment(today).add(plusDays, 'd').toDate()
  return {
    today: formatDate(today),
    expireDay: formatDate(expireDay)
  }
}

export default generateDate
