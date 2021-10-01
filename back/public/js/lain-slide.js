function Slide(_parent, _opt) {
  var opt = _opt || {};
  this.interval; 
  this.last;
  this.idx=0;
  this.depth=1;
  this.wrapper = $(_parent);
	this.wrap = this.wrapper.find('.slide-wrap');
	this.slide = this.wrap.find('.slide');
	this.effect = opt.effect || 'horizontal';
	this.speed = Number(opt.speed) || 500;
	this.autoPlay = opt.autoPlay === false ? false : true;
	this.autoPlaySpeed = Number(opt.autoPlaySpeed) || 3000;
  this.useNavigation = opt.navigation && opt.navigation.prev && opt.navigation.next ? true : false;
  this.usePagination = opt.pagination && opt.pagination.el ? true : false;
  


    /******** 변수 확인자 *********/
  
  if (this.effect.toLowerCase() !== 'horizontal' && 
    this.effect.toLowerCase() !== 'vertical' &&
    this.effect.toLowerCase() !== 'fade') 
    {
    this.effect = 'horizontal';
    }
  
    this.effect += 'Type';
    this.wrap.addClass(this.effect);

    /******** horiInit *********/
    var horiInit = function () {
      this.last = this.slide.length - 1;

      this.wrapper.mouseenter(onEnter).mouseleave(onLeave);
      if (this.autoPlay) this.interval = setInterval(this.onNext.bind(this), this.autoPlaySpeed);
    }.bind(this);

    /******** fadeInit *********/
    var fadeInit = function  () {
      this.last = this.slide.length - 1;
      
      this.wrapper.mouseenter(onEnter).mouseleave(onLeave);
      if (this.autoPlay) this.interval = setInterval(this.onNext.bind(this), this.autoPlaySpeed);
    }.bind(this);

    /******** vertInit *********/
    var vertInit = function () {
      this.last = this.slide.length - 1;
      
      this.wrapper.mouseenter(onEnter).mouseleave(onLeave);
      if (this.autoPlay) this.interval = setInterval(this.onNext.bind(this), this.autoPlaySpeed);
    }.bind(this);

    /*********** onEnter ***************/
    var onEnter = function () {
      if (this.autoPlay) clearInterval(this.interval); 
    }.bind(this);
 
    /*********** onLeave ***************/
    var onLeave = function () {
      if (this.autoPlay) this.interval = setInterval(this.onNext.bind(this), this.autoPlaySpeed);
    }.bind(this);


    if(this.effect === 'fadeType') {
      this.slide.eq(0).clone().appendTo(this.wrap).removeClass('slide'); // 더미 생성 = 높이 생성
      fadeInit();
    }
  
    if(this.effect === 'horizontalType') {
      this.slide.eq(0).clone().appendTo(this.wrap);
      this.slide = this.wrap.find('.slide');
      this.wrap.css('width', this.slide.length * 100 + '%');
      this.slide.css('width', 100/this.slide.length.toFixed(4) + '%');
      horiInit();
    }
  
    if(this.effect === 'verticalType') {
      this.slide.eq(0).clone().appendTo(this.wrapper).removeClass('slide');
      this.slide.eq(0).clone().appendTo(this.wrap);
      this.slide = this.wrap.find('.slide');
      vertInit();
    }  

    /******** navigation *********/
    if(this.useNavigation) {
      this.prev = this.wrapper.find(opt.navigation.prev);
      this.next = this.wrapper.find(opt.navigation.next);
      this.prev.click(this.onPrev.bind(this));
      this.next.click(this.onNext.bind(this));
    }

    /******** pagination *********/
    if(this.usePagination) {
      this.pagers = this.wrapper.find(opt.pagination.el);
      var cnt = (this.effect === 'fadeType') ? this.slide.length : this.slide.length - 1;
      for(var i=0; i<cnt; i++) {
        $('<div>●</div>').appendTo(this.pagers).click(this.onPager.bind(this));
      }
    }
}


  /*********** ani ***************/
  Slide.prototype.ani = function () {
    switch(this.effect) {
      case 'horizontalType':
        if(this.usePagination) {
          this.pagers.children('div').removeClass('active');
          this.pagers.children('div').eq(this.idx === this.last ? 0 : this.idx).addClass('active');  
        }
        this.wrap.stop().animate({ 'left': -this.idx * 100 + '%' }, this.speed);
      break;
      
      case 'verticalType':
        if(this.usePagination) {
          this.pagers.children('div').removeClass('active');
          this.pagers.children('div').eq(this.idx === this.last ? 0 : this.idx).addClass('active');  
        }
        this.wrap.stop().animate({ 'top': -this.idx * 100 + '%' }, this.speed);

        break;
      
      case 'fadeType':
        this.slide.eq(this.idx).css({ 'z-index': ++this.depth, 'opacity': 0 });
        this.slide.eq(this.idx).stop().animate({'opacity': 1}, this.speed);
        if(this.usePagination) {
        this.pagers.children('div').removeClass('active');
        this.pagers.children('div').eq(this.idx).addClass('active');
        }
        break;
    }
  }

Slide.prototype.onNext = function() {
	if(this.effect === 'fadeType') {
		this.idx = this.idx === this.last ? 0 : this.idx + 1;
	}
	else {
		if(this.idx === this.last) {
      $(this.wrap).css(this.effect === 'horizontalType' ? 'left' : 'top', 0);
			this.idx = 0;
		}
		this.idx++;
	}
  this.ani();
}

Slide.prototype.onPrev = function() {
	if(this.effect === 'fadeType') {
		this.idx = this.idx === 0 ? this.last : this.idx - 1;
	}
	else {
    if(this.idx === 0) {
      $(this.wrap).css(this.effect === 'horizontalType' ? 'left' : 'top', (-last * 100) +'%');
      this.idx = this.last;
  }
    this.idx--;
  }
  this.ani();  
}

Slide.prototype.onPager = function(e) {
  this.idx = $(e.target).index();
  this.ani();
}
// 디자인 영역 
// 외부에서 쓸 수 있는 것은 prototype으로 만들지만 그 외에는 내부에서만 사용할 수 있게 하는 것이 좋다

// 실행 영역

/*
{
  effect: 'horizontal', 'vertical', 'fade',
  speed: 500,
  autoPlay : ture,
  autoPlaySpeed: 3000
}
*/