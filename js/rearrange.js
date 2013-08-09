//This file is part of Open Case Builder from University of Michigan, 
//a free open source application available at http://openmi.ch/casebuilder.

$(document).ready(function() {

		////////CLEAR CASE BUTTON////////////
		$("#delete_preview").click(function() {
			// Verify they really want to remove everything!
			var confirmed = confirm("All your current work will be lost!\nAre you sure you want to clear everything and start over?");
			if (confirmed === false) { return; }

			$("#preview").empty();
			question_answers = new Array();
			feedback_array = new Array();
			num_q = 1;
		})
		
		////////END CLEAR CASE BUTTON////////////
		
		
		////REARRANGE CASE ELEMENTS ARROWS////////
		$('.up').live('click', function() {
			var parent = $(this).parents('.preview_element');
			parent.insertBefore(parent.prev('.preview_element'));
		});

		$('.down').live('click', function() {
			var parent = $(this).parents('.preview_element');
			parent.insertAfter(parent.next('.preview_element'));
		});

		////END REARRANGE CASE ELEMENTS ARROWS////////
		
		////REMOVE CASE ELEMENT ACTION//////
		
		//LEARNING OBJECTIVE
		$('#lo_remove').live('click', function() {
			$('#lo_wrapper').remove();
		});
	
		//PATIENT
		$("#pat_remove").live('click', function() {
			$('#pat_wrapper').remove();
		});
	
		//TEXT BOX
		$("#text_remove").live('click', function() {
			$(this).parent('.text_wrapper').remove();
		});
	
		//QUESTION
		$('#q_remove').live('click', function() {
			
			var q_wrapper = $(this).parent('.question_wrapper');
			remove_num = q_wrapper.attr('id').substring(9);
			q_wrapper.remove();
			
			//fix arrays
			feedback_array.splice(remove_num, 1);
			question_answers.splice(remove_num, 1);
			num_q--;
		});
	
		//MEDIA
		$('#media_remove').live('click', function() {
			var wrapper = $(this).parent('.media_wrapper');
			wrapper.remove();
		});
	
		//AUTHOR
		$('#a_remove').live('click', function() {
			var wrapper = $(this).parent('.author_wrapper');
			wrapper.remove();
		});
	
		////END REMOVE CASE ELEMENT ACTION//////
		
});
