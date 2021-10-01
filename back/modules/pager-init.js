module.exports = (_page, _totalRecord, _listCnt = 5, _pagerCnt = 3) => {
	const page = Number(_page)
	const totalRecord = Number(_totalRecord)
	const listCnt = Number(_listCnt)
	const pagerCnt = Number(_pagerCnt)
	const totalPage = Math.ceil(totalRecord / listCnt)
	const startIdx = (page - 1) * listCnt // 제일 중요함 listCnt -> 몇개씩 가져올 것인가
	const startPage = Math.floor((page - 1) / pagerCnt) * pagerCnt + 1
	const endPage = startPage + pagerCnt - 1 > totalPage ? totalPage : startPage + pagerCnt - 1
	const prevPage = page === 1 ? 1 : page - 1;
	const nextPage = page === totalPage ? totalPage : page + 1;
	const prevPager = startPage === 1 ? 1 : startPage - 1;
	const nextPager = endPage === totalPage ? totalPage : endPage + 1;
	return { page, totalPage, listCnt, pagerCnt, totalPage, startIdx, startPage, endPage, prevPage, nextPage, prevPager, nextPager }
}

// SQL에서 SELECT * FROM books; 로 전체 로딩 
// INSERT INTO books SET title='', writer='', content=''; 
// SELECT * FROM books WHERE content LIKE '%나비%'; AND title LIKE '%추가%'  // 조건절 
// SELECT * FROM books WHERE idx >= 8;

// SELECT * FROM books ORDER BY idx DESC; 가장 최신순(인덱스 숫자 내림차순)
// SELECT * FROM books ORDER BY title ASC, content DEDC title 순으로 오름차, dedc 순으로 내림차


// DELETE FROM books WHERE title LIKE '%심청%';
// DELETE, UPDATE 구문에서는 WHERE 조건절이 필수

// INSERT 
// UPDATE : WHERE 
// DELETE : WHERE 
// SELECT : WHERE, ORDER, LIMIT
// INSERT INTO books SET 필드명=값, 필드명2=값 ... 
// INSERT INTO books (필드명, 필드명2, 필드명3...) VALUES (값, 값2, 값3 ...) 개수는 맞춰야함

// UPDATE books SET 필드명=값, 필드명2=값.. [필수] WHERE
// DELETE FROM 테이블명 [필수] whether

// SELECT 필드명1, 필드명2 FROM 테이블명;
// SELECT * FROM 테이블명;
// SELECT COUNT(idx) FROM 테이블명 [선택 : WHERE] (ORDER는 에러남)
// SELECT * FROM 테이블명 WHERE idx=1;
// SELECT * FROM 테이블명 WHERE idx >= 5 AND IDX <= 9;
// SELECT * FROM 테이블명 WHERE title LIKE '%나비%';
// SELECT * FROM 테이블명 WHERE ... ORDER BY idx DESC;
// SELECT * FROM 테이블명 WHERE ... ORDER BY idx ASC;
// SELECT * FROM 테이블명 WHERE... ORDER... LIMIT 시작idx, 갯수;






