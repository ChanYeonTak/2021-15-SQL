	/* 
		1. 위의 쿼리가 INSERT라면 rs = { insertID : 15, affectedRows : 1... }
		2. 위의 쿼리가 UPDATE라면 rs = { affectedRows : 1... }
		3. files Query는 아래와 같음
		가. 새로 추가하는 경우
		INSERT INTO files SET oriname=?, savename=?, mimetype=?, size=?, fieldname=?, fidx=?
		fidx 어디서 ? -> rs.insderId

		나. 업데이트라면 일단 k.substr(0,1).toUpperCase() ? 'C' : 'U" 분기, 기존 레코드 여부 체크 후에 있으면 기존 레코드 status = '0', 파일도 옮김
		그리고 가)의 인서트를 실행
		UPDATE files SET oriname=?, savename=?, mimetype=?, size=?, fieldname=? WHERE idx=?
		idx 어디서 ? -> SELECT * FROM files WHERE fidx = idx
		*/
	
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-book-mw')


router.post('/', uploader.fields([{name: 'cover'}, {name: 'upfile'}]), 
async (req, res, next) => {
	let sql, values
	try {
		const { title, writer, content, _method, idx } = req.body
		const isUpdate = (_method === 'PUT' && idx) 
		sql = isUpdate ? "UPDATE books" : "INSERT INTO books "
		sql += " SET title=?, writer=?, content=? "
		sql += isUpdate ? " WHERE idx="+ idx : ""
		values = [title, writer, content]
		const [rs] = await pool.execute(sql, values)
	
		if(req.files) {
			let filedname;
		 	for(let [k, [v]] of Object.entries(req.files)) {
				filedname = k.substr(0, 1).toUpperCase()
				if(isUpdate) {
					sql = "SELECT idx, savename FROM files WHERE fidx = ? AND filedname = ? AND status = '1'"
					values = [idx, filedname] 
					let [[rsf]] = await pool.execute(sql, values)
					if (rsf.length > 0) {
						sql = "UPDATE files SET status = '0' WHERE idx="+rsf[0].idx
						await pool.execute(sql)
						await moveFile(rsf[0].savename)
					}
				}
				sql = " INSERT INTO files SET oriname=?, savename=?, mimetype=?, size=?, fieldname=? fidx=?"
				values = [v.originalname, v.filename, v.mimetype, v.size, v.filedname, (isUpdate ? idx : rs.insertId)]
				await pool.execute(sql, values)
			}
			res.redirect(`/${req.lang}/book`)
		}
	} 
	catch(err) {
		next(error(500, err))
	}
})

router.put('/', (req, res, next) => {
	res.send('받음')
})

module.exports = router