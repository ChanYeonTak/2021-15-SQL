module.exports = _lang => {
  lang = _lang.toUpperCase()
  switch (lang) {
    case 'KO' :
    return { 
      ERROR: {
        NOT_FOUND    : '존재하지 않는 데이터 입니다.',
      }, 
      GLOBAL : {
        TAB_TITLE    : '도서 관리 게시판',
        LOGO         : '도서 관리 시스템',
        NAVI         : [ '도서 등록', '도서 리스트', '로그인', '로그아웃', '회원가입' ],
        MSG: {
          DELETE     : '정말로 삭제하시겠습니까?'
        }
      },
      LIST: {
        TITLE        : '도서 목록',
        DESC         : '등록된 도서들의 리스트 입니다.',
      
      }, 
      VIEW: {
        TITLE        : '도서 상세 정보',
        DESC         : '선택 도서 상세 정보 페이지',
      },
      CREATE: {
        TITLE        : '도서 등록',
        DESC         : '등록할 도서를 아래에서 입력하세요.',
      },
      UPDATE: {
        TITLE        : '도서 수정',
        DESC         : '수정 내용 입력'
      },
      FIELD: {
        NO : '번호',
				TITLE : '제목',
				WRITER : '저자',
				CONTENT : '요약설명',
				COVER : '표지',
			  DATE : '등록일',
				STATUS : '상태',
        UPFILE : '첨부파일'
      },
      BT: {
        UPDATE : '수정',
        DELETE : '삭제',
        CREATE : '등록',
        LIST : '리스트',
        RESET : '재작성'
      },
      MSG: {
        DELETE     : '정말로 삭제하시겠습니까?'
      }
    }
    case 'EN' : 
    return { 
         ERROR: {
            NOT_FOUND    : 'Data Not Found',
          }, 
          GLOBAL : {
            TAB_TITLE    : 'BOOK BOARD',
            LOGO         : 'BOOK MANAGEMENT SYSTEM',
            NAVI         : [ 'BOOK REG', 'BOOK LIST', 'LOGIN', 'LOGOUT', 'JOIN US' ]
          },
          LIST: {
            TITLE        : 'BOOK LIST',
            DESC         : 'A list of registered books',
          
          }, 
          VIEW: {
            TITLE        : 'BOOK INFORMATION',
            DESC         : 'Information of the selected book',
          },
          CREATE: {
            TITLE        : 'BOOK Registe',
            DESC         : 'Please enter the book you wish to register below',
          },
          UPDATE: {
            TITLE        : 'BOOK Update',
            DESC         : 'Change the contents of the book to be edited below'
          },
          FIELD: {
            NO : 'No',
            TITLE : 'Title',
            WRITER : 'Writer',
            CONTENT : 'Content',
            COVER : 'Cover',
            DATE : 'Date',
            STATUS : 'Status',
            UPFILE : 'Attachment'
          },
          BT: {
            UPDATE : 'UPDATE',
            DELETE : 'DELETE',
            CREATE : 'CREATE',
            LIST : 'LIST',
            RESET : 'RESET'
          },
          MSG: {
            DELETE     : 'Are you sure you want to delete it?'
          }
        }
      }
  }