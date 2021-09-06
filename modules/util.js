const createError = require('http-errors')
const path = require('path')

const error = (code, msg) => {
  let message = '서버 에러입니다. 관리자에게 문의해주세요.'
  switch (code) {
    case 404: 
    message = '경로를 찾을 수 없습니다.'      
    break;

    case 400: 
    message = '잘못된 요청입니다.'      
    break;

    case 401:
    message = '사용자 인증이 처리되지 않았습니다.'      
    break;

    case 403:
    message = '허가되지 않은 접근입니다.'
    break;

    case 500:
    message = '서번 내부 에러입니다. 잠시 후 다시 시도해 주세요.'
    break;

    default:
    break;
  }
  return createError(code || 500, msg + '^^' + message);
}

const cutTail = (str, len=12) => str.length > len ? str.substr(0, len)+' ...' : str

const location = src => path.join(__dirname, '../', src)

const chgStatus = status => { 
  switch (status) {
    case '0': return '절판'
    case '1': return '판매중'
    case '2': return '발행예정'
    defalut : return '기타'
  }
}
module.exports = { error, location, cutTail, chgStatus }
