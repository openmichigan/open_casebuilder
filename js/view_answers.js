//This file is part of Open Case Builder from University of Michigan, 
//a free open source application available at http://openmi.ch/casebuilder.

var user_mc_answer;

$(document).ready(function() {

	//multiple choice highlight
	$('.correct_radio').live('click', function() {
		var mc_parent = $(this).parents('.mc_group');
		var inputs = mc_parent.find('input:text');
		$('input:text').css('background-color', '#FFF');
		inputs.css('background-color', '#FBFFB3');
	});
	// end multiple choice highlight

	$('.response_c').hide();
	$('.response_i').hide();

	//highlight and select multiple choice answer
	mcSelect();

	$('input[type=submit]').click(function() {

		var q_parent = $(this).parent('span');
		var class_name = $(this).parent('span').attr('class');
		var q_num = parseInt(class_name.substring(class_name.indexOf('_') + 1));
		var q_type = class_name.substring(0, class_name.indexOf('_'));

		//Fill in the Blank
		if(q_type == 'fitb') {
			//correct
			if(q_parent.find('input[type=text]').val().toLowerCase() == answers[q_num].toLowerCase() ) {
				q_parent.find('.response_i').hide();
				q_parent.find('.response_c').attr('src', $('#preloaded_right').attr('src'));
				q_parent.find('.response_c').show();
				q_parent.find('.feedback').html(feedback[q_num][0]);
			}
			//incorrect
			else {
				q_parent.find('.response_c').hide();
				q_parent.find('.response_i').attr('src', $('#preloaded_wrong').attr('src'));
				q_parent.find('.response_i').show();
				q_parent.find('.feedback').html(feedback[q_num][1]);
			}
		}

		//TF
		if(q_type == 'tf') {
			 var checked = q_parent.find('input:checked');
			 //correct
			 if(parseInt(checked.val()) == parseInt(answers[q_num]) ) {
			 	q_parent.find('.response_i').hide();
			 	q_parent.find('.response_c').attr('src', $('#preloaded_right').attr('src'));
				q_parent.find('.response_c').show();
			 	q_parent.find('.feedback').html(feedback[q_num][0]);
			 }
			 //incorrect
			 else {
			 	q_parent.find('.response_c').hide();
			 	q_parent.find('.response_i').attr('src', $('#preloaded_wrong').attr('src'));
				q_parent.find('.response_i').show();
			 	q_parent.find('.feedback').html(feedback[q_num][1]);
			 }
		}

		//MC
		if(q_type == 'mc') {


			//correct
			if(user_mc_answer == answers[q_num]) {
				q_parent.find('.response_i').hide();
				q_parent.find('.response_c').attr('src', $('#preloaded_right').attr('src'));
				q_parent.find('.response_c').show();
				q_parent.find('.feedback').html(feedback[q_num][user_mc_answer - 1]);
			}
			//incorrect
			else {
				q_parent.find('.response_c').hide();
				q_parent.find('.response_i').attr('src', $('#preloaded_wrong').attr('src'));
				q_parent.find('.response_i').show();
				q_parent.find('.feedback').html(feedback[q_num][user_mc_answer - 1]);
			}
			
		}
		
	});	//end submit click

});		//end document


function mcSelect() {
	$('.mc_answer').live('click', function() {
		$(this).css('color', '#7FA4D4');
		$(this).siblings().css('color', 'black');

		var answer = $(this).attr('id');
		user_mc_answer = answer;
	});
}
