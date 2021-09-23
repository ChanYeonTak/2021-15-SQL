/**
 * !암호화 (encrypt) 평문 -> 암호
 * !복호화 (decrypt) 암호 -> 평문
 * crypto는 단방향 암호화 : 한번 암호화 시키면 복호화를 못시킴 - 비밀번호
 * cipher는 양방향 암호화 : 암호화 <-> 복호화 - https 통신에서 사용 함
 * node는 2가지 모두 지원
 * 암호화 기법 md5, sha1, sha256, sha512 ~
 * rainbow table  
 * 
*/

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const cipher = require('crypto-js');

const salt = 'asdasdzASD1#%$#'

let pass = '123456'
let pass512 = crypto.createHash('sha512').update(pass + salt).digest('base64')

let pass2 = '123451'
let pass512re = crypto.createHash('sha512').update(pass2 + salt).digest('base64')

if (pass512 === pass512re) console.log('로그인')
else console.log('로그인 실패')

const genPass = async pass => { // 암호화
  return await bcrypt.hash(pass + salt, 5)
}

const comparePass = async (pass, hash) => { // 검증
  return await bcrypt.compare(pass + salt, hash)
}

const passVerify = async () => { 
  let pass = '123456'
  let hash = await genPass(pass)
  let compare = await comparePass('123456', hash)
  console.log(compare)
}

passVerify();

const passVerify2 = async () => { 
  let pass = '123456'
  let salt = '!09e123xc4'
  let hash = await bcrypt.hash(pass + salt, 10)
  let compare = await bcrypt.compare(pass + salt, hash)
  console.log("verify2: ", compare)
}

passVerify2()

// 암복호화 예제
const encrypt = cipher.AES.encrypt('ㅁㄴㅇㅋㅌㅊㅁㄴㅇ', salt).toString()
console.log("encrypt : ", encrypt)

const decrypt = cipher.AES.decrypt(encrypt, salt)
const text = decrypt.toString(cipher.enc.Utf8)
console.log("decrypt : ", text)
