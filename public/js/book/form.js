document.saveForm.addEventListener('submit', onSubmit);
function onSubmit(e) {
	e.preventDefault();
	var title = this.title.value.trim();
	var writer = this.writer.value.trim();
	var content = this.content.value.trim();
	if(!title) {
		alert('도서명을 입력하세요.');
		this.title.focus();ㄴ
		return false;
	}
	this.submit();
}

document.querySelector('#btRemoveCover').addEventListener('click', onRemoveFile)
document.querySelector('#btRemoveFile').addEventListener('click', onRemoveFile)

function onRemoveFile(e) {
	var idx = this.dataset['idx'];
	var lang = this.dataset['lang'];
	var parent = this.parentNode;
	axios.delete('/'+lang+'/book/api/file', { params : { idx: idx } }).then(onSuccess).catch(onError);
	
	function onSuccess(r) {

	}
	
	function onError(err) {
		
	}
}

