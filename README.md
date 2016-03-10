## 分页组件

### options

1. el (dom，必须， [String]) 例-> el: '.page-box'
2. maxSize (最多显示个数，默认6，[Int])
3. firstText (第一页按钮文字，默认'&laquo;'  [String])
4. lastText (最后一页按钮文字，默认'&raquo;'  [String])
5. previousText (上一页按钮文字，默认'&lsaquo;'  [String])
6. nextText (下一页按钮文字，默认'&rsaquo;'  [String])
7. totalRowsText (共n条记录文本，默认'共{{totalPages}}条记录') (注：会替换{{totalPages}})
8. currPageText (当前第n/m页，默认'当前{{currentPage}}/{{totalPages}}页')  (注：会替换{{currentPage}} 和 {{totalPages}})
9. totalPages (总页数， 默认1， [Int])
10. currentPage (当前页数，默认1， [Int])
11. onPageClick (点击页码事件函数)

### 使用

```js
<div class="page-box"></div>

new Pagination({
  el: '.page-box',
  totalRows: 84, 
  currentPage: 3,  
  totalPages: 9,
  onPageClick: function(n) {
    alert('跳转到', n, '页');
  }
})
```

### TODO