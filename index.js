var $ = require('jquery');

function Pagination(options) {
  this.options = $.extend({}, this.defaults, options);

  $(this.options.el).html(this.render());
  this._bindEvent();
}

// 绑定 onPageClick 事件
Pagination.prototype._bindEvent = function() {
  var self = this;
  $(this.options.el).on('click', 'a', function() {
    var page = Number($(this).data('page'));
    self.options.onPageClick.call(self, page);
  })
}

// 生成dom
Pagination.prototype.render = function() {
  var self = this;
  var domArr = [];

  var prevPage = this.options.currentPage - 1;
  var maxSizeInteger = Math.round(this.options.maxSize / 2);

  domArr.push('<div class="fn-clear paginationBox fn-right">');
  // 总记录数，当前第几页
  domArr.push('<span class="pagination-total-rows fn-left">' + this.options.totalRowsText.replace('{{totalRows}}', this.options.totalRows) + '</span>');
  domArr.push('<span class="pagination-page-number fn-left">' + this.options.currPageText.replace('{{currentPage}}', this.options.currentPage).replace('{{totalPages}}', this.options.totalPages) + '</span>');

  domArr.push('<ul class="pagination fn-left">')

  // 首页，上一页
  if (this.options.currentPage === 1) {
    domArr.push('<li class="disabled"><a href="javascript:;">' + this.options.firstText + '</a></li>');
    domArr.push('<li class="disabled"><a href="javascript:;">' + this.options.previousText + '</a></li>');
  }
  else {
    domArr.push('<li><a href="javascript:;" data-page="1">' + this.options.firstText + '</a></li>');
    domArr.push('<li><a href="javascript:;" data-page="' + prevPage + '">' + this.options.previousText + '</a></li>');
  }


  var startPage, endPage, startPage2, endPage2;
  if (this.options.maxSize < this.options.totalPages) {
    var cut = this.options.currentPage - maxSizeInteger;
    startPage = cut > 1 ? cut : 1;
    endPage = startPage + this.options.maxSize - 1;
    if (endPage > this.options.totalPages) {
      endPage = this.options.totalPages;
      startPage = endPage - this.options.maxSize + 1;
    }
  }
  else {
    startPage = 1;
    endPage = this.options.totalPages;
  }

  if (startPage > 1) {
    startPage2 = startPage - 1;
    domArr.push('<li><a href="javascript:;" data-page="' + startPage2 + '">...</a></li>');
  }

  for (var i = startPage; i <= endPage; i++) {
    if (i === self.options.currentPage) {
      domArr.push('<li><a href="javascript:;" class="active">' + i + '</a></li>');
    }
    else {
      domArr.push('<li><a href="javascript:;" data-page="' + i +'" class="">' + i + '</a></li>');
    }
  }

  if (endPage < this.options.totalPages) {
    endPage2 = endPage + 1;
    domArr.push('<li><a href="javascript:;" data-page="' + endPage2 + '">...</a></li>');
  }

  // 下一页，最后一页
  if (this.options.currentPage === this.options.totalPages) {
    domArr.push('<li class="disabled"><a href="javascript:;">' + this.options.nextText + '</a></li>');
    domArr.push('<li class="disabled"><a href="javascript:;">' + this.options.lastText + '</a></li>');
  }
  else {
    domArr.push('<li><a href="javascript:;" data-page="' + this.options.currentPage + 1 + '">' + this.options.nextText + '</a></li>');
    domArr.push('<li><a href="javascript:;" data-page="' + this.options.totalPages + '">' + this.options.lastText + '</a></li>');
  }

  domArr.push('</ul></div>');

  return domArr.join('');
}

Pagination.prototype.defaults = {
  maxSize: 6, // 最多显示6个
  firstText: '&laquo;',
  lastText: '&raquo;',
  previousText: '&lsaquo;',
  nextText: '&rsaquo;',
  totalRowsText: '共{{totalRows}}条记录',
  currPageText: '当前{{currentPage}}/{{totalPages}}页',
  totalPages: 1,
  currentPage: 1,
  onPageClick: function() {}
}

module.exports = Pagination;