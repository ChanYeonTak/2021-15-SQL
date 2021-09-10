module.exports = _lang => {
  lang = _lang.toUpperCase()
  switch (lang) {
    case 'KO' :
    return { 
      ERR_NOT_FOUND    : '존재하지 않는 데이터 입니다.',
      TITLE_LIST       : '도서 목록',
      TITLE_VIEW       : '도서 상세 정보',
      TITLE_CREATE     : '도서 등록',
      TITLE_UPDATE     : '도서 수정',
      DESC_LIST        : '등록된 도서들의 리스트 입니다.',
      DESC_VIEW        : '선택 도서 상세 정보 페이지',
      DESC_CREATE      : '등록할 도서를 아래에서 입력하세요.',
      DESC_UPDATE      : '수정 내용 입력'
    }
    case 'EN' : 
    return { 
      ERR_NOT_FOUND    : 'Data Not Found.',
      TITLE_LIST       : 'BOOK LIST',
      TITLE_VIEW       : 'BOOK INFORMATION',
      TITLE_CREATE     : 'BOOK Register',
      TITLE_UPDATE     : 'BOOK Update',
      DESC_LIST        : 'A list of registered books.',
      DESC_VIEW        : 'Information of the selected book.',
      DESC_CREATE      : 'Please enter the book you wish to register below.',
      DESC_UPDATE      : 'Change the contents of the book to be edited below.'
   }
  }
}