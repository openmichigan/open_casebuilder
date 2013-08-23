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

	//select all that apply highlight
	$('.sata_checkbox').live('click', function() {
		var sata_parent = $(this).parents('.sata_group');
		var inputs = sata_parent.find('input:text');
		if ($(this).is(':checked')) {
			inputs.css('background-color', '#FBFFB3');
		} else {
			inputs.css('background-color', '#FFF');
		}
	});
	// end select all that apply highlight

	$('.response_c').hide();
	$('.response_i').hide();

	//highlight and select multiple choice answer or true false; show/hide feedback
	mcSelect();
	sataSelect();
	tfSelect();

	$('input[type=submit]').click(function() {

		var q_parent = $(this).parent('span');
		var class_name = $(this).parent('span').attr('class');
		var q_num = parseInt(class_name.substring(class_name.indexOf('_') + 1));
		var q_type = class_name.substring(0, class_name.indexOf('_'));

		//Fill in the Blank
		if(q_type == 'fitb') {
			//correct
			if(q_parent.find('input[type=text]').val().toLowerCase() == correct_answers[q_num].toLowerCase() ) {
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

	});	//end submit click

});		//end document


function mcSelect() {
	$('.mc_answer').live('click', function() {
		
		$(this).css('color', '#7FA4D4');
		$(this).siblings().css('color', 'black');
		
		var fbselected = $(this).children('.feedback');
		
		//hide other siblings / feedback options
		$(this).siblings().each(function () {
			var fbchild = $(this).children('.feedback');
			fbchild.css('display', 'none');
		});
	
		fbselected.css('display', 'compact');
		
	});
}

function sataSelect() {
	$('.sata_answer').live('click', function() {

		$(this).css('color', '#7FA4D4');

		var fbselected = $(this).children('.feedback');

		//hide (incorrect) siblings' feedback options
		$(this).siblings().each(function () {
			var fbchild = $(this).children('.feedback');
			var fbstring = fbchild.html().substring(0,8);
			if (fbstring != 'Correct:') {
				fbchild.css('display', 'none');
				fbchild.parent().css('color', 'black');
			}
		});

		fbselected.css('display', 'compact');
	});
}

function tfSelect() {
	$('.tf_answer').live('click', function() {
		$(this).css('color', '#7FA4D4');
		$(this).siblings().css('color', 'black');

		var q_content_sel = $(this).html();
		
		$(this).siblings().each(function () {
			   var fbchildtf = $(this).find('.feedback');
			   fbchildtf.css('display', 'none');
          });
		  
		  $(this).find('.feedback').fadeIn();
    		
		
	});
}
