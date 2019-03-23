$(document).ready(function () {  
	let list = [
		{content:'item1',mark:0},
		{content:'<h1>item2</h1>',mark:1}
	] 
	render()

	function addTodo(todo) { 
		let inputArea = $('.row-addItem input')
		if( !inputArea.val() ){
			inputArea.attr('placeholder','I need a name for the item...');
		}else{
			list.push( {content:`${inputArea.val()}`,mark:0} )
			console.log(list)
	 		render( pageNow() )
		}
	}
	
	function removeTodo(id) {
	  list.splice(id, 1);  
	  render( pageNow() )
	}

	function pageNow(){
		if( $('.show-active').attr('class') ==='show-active show' ){
			return 'active'
		}
	}

	function render(page){ 
		$('.row-addItem input').val('').attr('placeholder','What needs to be done?')
	  $('.listBlock').empty()
		$('nav > span').html(`${list.length} items left`)
	
		list.forEach( (item,i) => {
			let itemContent = document.createTextNode( item.content )
			let area = `
					<div class="row-item" order="${i}">
						<div class="input-text"></div>
						<div class="btn-delete">－</div>
					</div>`
			$('.listBlock').append(area)
			$(`[order='${i}'] .input-text`).append(itemContent);

			if( item.mark ===1 && page === 'active'){
				//marked:display 
				$(`[order='${i}']`).css('display','none')
			}else if( item.mark ===1 &&  page !== 'active'){
				//marked:del
				$(`[order='${i}'] .input-text`).attr('mark','item-checked')
				$(`[order='${i}'] .input-text`).html(`<del></del>`)
				$(`[order='${i}'] del`).append(itemContent);
			}
		})

		// no active item
		if(page === 'active' && list.every(item => item.mark === 1) ){  
			$('.listBlock').append(`<div id="noItem"> No active item </div>`)
		}
		//no item
		if( page !== 'active' && list.length === 0 ){ 
			$('.listBlock').append(`<div id="noItem"> Add some items </div>`)
		}
	}

	/* add item */
	$('body').on('click', '#btn-add', addTodo);

	/* delete item */
	$('.listBlock').on('click', '.btn-delete', function(e){
		let order = $(e.target).parent().attr('order')		
		removeTodo(order)
	});

	/* change page */
	$('nav').on('click', 'span', function(e){ 
		if( $(e.target).attr('class') === 'show-active'){ 
			$('.show-all').attr('class' , 'show-all')
			$('.show-active').attr('class' , 'show-active show')
			render('active')

		}else if( $(e.target).attr('class') === 'show-all'){
			$('.show-all').attr('class' , 'show-all show')
			$('.show-active').attr('class' , 'show-active')
			render()
		}
	});

	/* mark item */
	$('.listBlock').on('click', '.input-text', function(e){
		let target = $(e.target)
		let index = target.parents('.row-item').attr('order')
		if( list[index].mark === 0 ){
			//未標記0 改為 已標記1
			list[index].mark = 1
		}else if( list[index].mark === 1){
			//已標記1 改為 未標記0
			list[index].mark = 0
		}
		render( pageNow() );
	});

});










