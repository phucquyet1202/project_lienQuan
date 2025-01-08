import axios from 'axios';
import * as md5 from 'md5';
import { customException, customResponse } from 'src/helper/response.helper';

// Bộ nhớ trong để lưu trữ trạng thái người dùng tạm thời
const userAttempts = {}; // { userId: { failedAttempts, lockUntil } }

export const checkCard = async (data) => {
  const sign = md5(
    data.card.data.partnerKey +
      data.createCardDto.pin +
      data.createCardDto.seri,
  );
  const requestId = `${data.createCardDto.seri}`;
  const chargingUrl = `${data.card.data.urlApi}?sign=${sign}&telco=${data.createCardDto.type}&code=${data.createCardDto.pin}&serial=${data.createCardDto.seri}&amount=${data.createCardDto.amount}&request_id=${requestId}&partner_id=${data.card.data.partnerId}&command=charging`;

  const resp = await axios.get(chargingUrl);

  // Kiểm tra trạng thái thẻ
  const checkStatus = async () => {
    const checkUrl = `${data.card.data.urlApi}?sign=${sign}&telco=${data.createCardDto.type}&code=${data.createCardDto.pin}&serial=${data.createCardDto.seri}&amount=${data.createCardDto.amount}&request_id=${requestId}&partner_id=${data.card.data.partnerId}&command=check`;
    const response = await axios.get(checkUrl);
    return response?.data;
  };

  let statusData;
  let attempts = 0;
  const maxAttempts = 5; // Giới hạn số lần thử
  const delay = 3000; // 3 giây giữa các lần thử
  const userId = data.createCardDto.infoUserId;

  // Kiểm tra xem người dùng có bị khóa nạp thẻ không
  if (userAttempts[userId] && userAttempts[userId].lockUntil > Date.now()) {
    return customException(
      403,
      'Bạn đã thử quá nhiều lần. Hãy thử lại sau 5 phút',
    );
  }

  // Nếu không bị khóa, tiếp tục thực hiện quy trình
  while (attempts < maxAttempts) {
    statusData = await checkStatus();
    if (statusData?.status !== 99) {
      break;
    }
    attempts += 1;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // Nếu nạp thẻ thành công
  if (statusData?.status === 1) {
    // Reset số lần thử sai nếu thành công
    resetFailedAttempts(userId);
    return customResponse(200, 'Thẻ nạp thành công');
  }

  // Nếu nạp thẻ không thành công
  if (statusData?.status === 3) {
    // Tăng số lần thử và khóa nếu vượt quá 5 lần
    incrementFailedAttempts(userId);
    return customException(400, 'Thẻ cào không hợp lệ');
  } else if (statusData?.status === 2) {
    incrementFailedAttempts(userId);
    return customException(400, 'Sai mệnh giá thẻ cào');
  } else if (
    statusData?.message === 'CARD_NOT_EXISTED' &&
    statusData.status === 101
  ) {
    incrementFailedAttempts(userId);
    return customException(404, 'Thẻ cào không tồn tại');
  } else if (
    resp?.data?.message === 'REQUEST_ID_EXISTED' &&
    resp.status === 102
  ) {
    incrementFailedAttempts(userId);
    return customException(404, 'Thẻ cào đã tồn tại');
  } else {
    incrementFailedAttempts(userId);
    return customException(400, 'Thẻ nạp thất bại');
  }
};

// Hàm tăng số lần thử sai
const incrementFailedAttempts = (userId) => {
  if (!userAttempts[userId]) {
    userAttempts[userId] = { failedAttempts: 0, lockUntil: null };
  }

  let failedAttempts = userAttempts[userId].failedAttempts;

  if (failedAttempts >= 5) {
    // Cấm người dùng nạp thẻ trong 5 phút
    lockUser(userId);
  } else {
    // Tăng số lần thử
    userAttempts[userId].failedAttempts = failedAttempts + 1;
  }
};

// Hàm khóa người dùng
const lockUser = (userId) => {
  // Cấm nạp thẻ trong 5 phút
  userAttempts[userId].lockUntil = Date.now() + 5 * 60 * 1000;
};

// Hàm reset số lần thử
const resetFailedAttempts = (userId) => {
  // Reset số lần thử và thời gian khóa
  if (userAttempts[userId]) {
    userAttempts[userId].failedAttempts = 0;
    userAttempts[userId].lockUntil = null;
  }
};
