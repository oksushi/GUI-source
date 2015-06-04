/*![Module-Version]*/
/***************************************************************************************************************************************************************
 *
 * modals
 *
 * Description of module
 *
 **************************************************************************************************************************************************************/


(function(GUI) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// public API function: open / close a modal
	//
	// _isOpen  [boolean]        Whether to open or close the modal
	// $modal   [jquery object]  The modal element
	// target   [string]         Selector string to id the modal for opening only
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.toggelModal = function toggelModal(_isOpen, $modal, target) {
		GUI.debugging( 'modals: ' + ( _isOpen ? 'Closing' : 'Opening' ) + ' modal', 'report' );

		if( _isOpen ) {
			$modal
				.removeClass('is-open')
				.attr('aria-hidden', 'true');

			$('.modal-backdrop').remove();
		}
		else {
			$modal
				.addClass('is-open')
				.attr('aria-hidden', 'false')
				.focus();

			$modal.after('<div class="modal-backdrop js-modalclose" data-modal="' + target + '"></div>')
		}

	}

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function modalsInit() {
		GUI.debugging( 'modals: Initiating', 'report' );


		if( $('.js-modal').length ) {
			GUI.debugging( 'modals: Found instances', 'report' );

			//open button click
			$('.js-modal').on('click', function openModal() {
				GUI.debugging( 'modals: open button clicked', 'interaction' );

				var $this = $(this);
				var target = $this.attr('data-modal');
				var $modal = $( target );
				var _isOpen = $modal.hasClass('is-open');

				GUI.modals.toggelModal(_isOpen, $modal, target);
			});


			//close button click
			$(document).on('click', '.js-modalclose', function openModal() {
				GUI.debugging( 'modals: close button / backdrop clicked', 'interaction' );

				var $this = $(this);
				var $modal = $('.modal');

				GUI.modals.toggelModal(true, $modal, '');
			});


			//ESC button listener
			$(document).keyup(function escapeKey(e) {
				if(e.keyCode == 27) {
					GUI.debugging( 'modals: Esc button clicked', 'interaction' );

					var $modal = $('.modal');

					GUI.modals.toggelModal(true, $modal, '');
				}
			});

		}
	};


	GUI.modals = module;


	// run module
	GUI.modals.init();

}(GUI));