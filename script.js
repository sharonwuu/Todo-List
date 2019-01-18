$(document).ready(function () {

/* navbar control */
	function countItem(){
		let all = Number($('.row-item').length)
		let checked = Number( $('div[mark="item-checked"]').length )
		let left = Number(all-checked)
		$('nav > span').html(`${left} items left`) // left items 

		// 完全沒 item
		if( $('#show').html() === 'All' ){
			$('#noItem').html('Add some items')			
			if( all === 0 ){
				$('#noItem').show()
			}else{
				$('#noItem').hide()
			}
		}else if( $('#show').html() === 'Active' ){
			$('#noItem').html('No active items')	
			if( left === 0 ){
				$('#noItem').show()
			}else{
				$('#noItem').hide()
			}
		}
	}
	countItem();

	function showAll(){
		$('div[mark="item-checked"]').parent().fadeIn(200)
		$('.show-all').attr('id' , 'show')
		$('.show-active').removeAttr('id')	
	}
	function showAtcive(){
		$('div[mark="item-checked"]').parent().fadeOut(200)
		$('.show-active').attr('id' , 'show')
		$('.show-all').removeAttr('id')
	}
	$('nav').on('click', '.show-all', function(){ 
		showAll();
		countItem();
	});
	$('nav').on('click', '.show-active', function(){ 
		showAtcive();
		countItem();
	});

/* add item */
	$('body').on('click', '#btn-add', function(){

		let inputArea = $('.row-addItem input')
		let inputText = document.createTextNode( inputArea.val() );

		if( !inputArea.val()){
			inputArea.attr('placeholder','I need a name for the item...');
		}else{
			let prependAdd = `
				<div class="row-item" id="new">
					<div class="input-text"></div>
					<div class="btn-delete">－</div>
				</div>
			`
			$( '.listBlock' ).prepend( prependAdd );
			$('#new .input-text').append(inputText);

			$('#new').hide().fadeIn( 600,countItem() ).removeAttr('id');

			inputArea.val('')
			inputArea.attr('placeholder','What needs to be done?');
		}
	});

/* mark or not */
	$('.listBlock').on('click', '.input-text', function(e){
		let target = $(e.target)
		if( target.is('div') ){
			if( target.children().is('del') ){
				//target：div marked -> unmark
				let itemName = document.createTextNode( target.children().text() )
				target.html('').append(itemName);
				target.removeAttr('mark')					
				countItem()
			}else{
				//target：div unmark -> mark
				let itemName = document.createTextNode( target.text() )
				target.attr('mark', 'item-checked')
				target.html(`<del></del>`).children().append(itemName)
				countItem()
			}
		}else if( target.is('del') ){
			//target：del（marded div's children）-> unmark
			let itemName = document.createTextNode( target.text() )
			target.parent().removeAttr('mark')
			target.parent().html('').append(itemName)
			countItem()
		}
		if( $('#show').html() === 'Active' ){
			showAtcive()
		}
	});

/* delete item */
	$('.listBlock').on('click', '.btn-delete', function(e){
		let target = $(e.target).parent('.row-item')
		target.fadeOut(400,function(){
			target.remove('.row-item')
			countItem()
		})
	});

});
