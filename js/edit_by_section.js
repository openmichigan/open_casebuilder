//This file is part of Open Case Builder from University of Michigan, 
//a free open source application available at http://openmi.ch/casebuilder.

$(document).ready(function() {


	/////////EDIT AUTHOR/////////////
	$("#a_edit").live('click', function() {

		//Replace Add with Update
		$(".add_button").hide();
		$(".update_button").attr('id', 'update_author_button');
		$(".update_button").show().css('display', 'inline-block');

		//Change Tab
		$(".tab_content").hide();
			//content
			populateAuthor();
			$("#pat_content #tab_title").html('Edit Your Patient:');
			//nav bar
			$(".tab").css('color', 'white');
			$("#author").css('color', '#fdd70f');
		
		$("#author_content").show();

		//update
		var update_count = 0;
		$("#update_author_button").live('click', function() {
			if(update_count > 0) {
				return false;
			}
			update_count++;

			$('#td_author_name').text($('#author_name').val());
			$('#td_author_affiliation').text($('#author_affiliation').val());
			$('#td_author_license').text($('#creative_commons option:selected').text());

			//Replace Update with Add
			$(".update_button").hide();
			$(".add_button").show().css('display', 'inline-block');
			//Reset Tab
			$("#author_content").hide().html(author_default);
			$("#author_content").show();
		});


	}); 
	
	//end click on edit author
	
	
	/////////EDIT FILL IN THE BLANK QUESTION/////////////
	$("#fitb_edit").live('click', function(){

		question_wrapper = $(this).parent('span');
		question_num = question_wrapper.attr('id');
		question_num = question_num.substring(question_num.indexOf('_') + 1);

		//Replace Add Button with Update
		$(".add_button").hide();
		$(".update_button").attr('id', 'update_fitb_button');
		$(".update_button").show().css('display', 'inline-block');

		//Change Tab
		$(".tab_content").hide();
		$("#q_content #tab_title").html('Edit Question:');
		$(".tab").css('color', 'white');
		$("#question").css('color', '#fdd70f');


		//Update Prep
		populateFITB(question_wrapper, question_num);
		$(".content_input").css('color', 'black');

		//Bring Tab Back to View
		window.setTimeout(function(){
			$("#q_content").show();
		}, 200);

		update_count = 0;


		//Update Preview
		$("#update_fitb_button").live('click', function(){

			if(update_count > 0){
				return false;
			}
			update_count++;

			question_wrapper.find('h2').html($("#q_input").val());
			correct_answers[question_num] = $("#fill_answer").val();
			feedback_array[question_num][0] = $("#fill_feedback").val();
			feedback_array[question_num][1] = $("#fill_hint").val();

			//Replace Update Button with Add
			$(".update_button").hide();
			$(".add_button").show().css('display', 'inline-block');
			
			//Reset Tab
			$("#q_content").hide().html(q_default);
			$("#tf_input").hide();
			$("#mc_input").hide();
			$("#q_content").show()

		});

		//Reset If Tab Changed During Edit
		$(".tab").click(function(){
			$("#q_content").hide().html(q_default);
			$("#tf_input").hide();
			$("#fill_input").hide();
		});

	}); 
	
	// end click on edit question fill in the blank
	
	/////////////EDIT LEARNING OBJECTIVES////////////
	$("#lo_edit").live("click", function(){
		
		//Replace Add Button with Update
		$(".add_button").hide();
		$(".update_button").attr('id', 'update_lo_button');
		$(".update_button").show().css('display', 'inline-block');

		//Change Tab
		$(".tab_content").hide();
			$("#tab_title").html('Edit Learning Objectives:');
			$(".tab").css('color', 'white');
			$("#lo").css('color', '#fdd70f');

		populateLo();
		$("#lo_content").show();


		$("#update_lo_button").live("click", function(){
			$("#lo_list").empty();
			$(".lo_tab_input").each(function(){
				if($(this).val().indexOf('Enter Learning Objective') != 0){
					var li = $("<li class = 'lo_single'>" + $(this).val() + "</li>");
					li.appendTo($("#lo_list"));
				}
			});

			//Replace Update with Add
			$(".update_button").hide();
			$(".add_button").show().css('display', 'inline-block');

			//Restore Original Tab
			input_num = 1;
			window.setTimeout(function(){
				$("#lo_content").empty().hide().html(lo_default).show();
			}, 300);

		});
	});


	//Reset Tab If Changed During Update
	$(".tab").click(function(){
		window.setTimeout(function(){
			$("#lo_content").html(lo_default);
		}, 200);
	}); 
	
	// end click on edit learning objectives
	
	///////////EDIT MULTIPLE CHOICE QUESTION/////////
	$("#mc_edit").live('click', function(){

		question_wrapper = $(this).parent('span');
		question_num = question_wrapper.attr('id');
		question_num = question_num.substring(question_num.indexOf('_') + 1);
		//Replace Add with Update
		$(".add_button").hide();
		$(".update_button").attr('id', 'update_mc_button');
		$(".update_button").show().css('display', 'inline-block');

		//Change Tab
		$(".tab_content").hide();
		$("#q_content #tab_title").html('Edit Question:');
		$(".tab").css('color', 'white');
		$("#question").css('color', '#fdd70f');

		//Update Prep
		$('#q_input').css('color', 'black');
		populateMC(question_wrapper, question_num);
		//Bring Tab Back to View
		window.setTimeout(function(){
			$("#question_type").val('mc');
			$("#fill_input").hide();
			$("#tf_input").hide();
			$("#sata_input").hide();
			$("#mc_input").show();
			$("#q_content").show();
		}, 200);

		update_count = 0;

		//Update Preview
		$("#update_mc_button").live('click', function() {

			//prevent multiple firing
			if(update_count){
				return false;
			}
			update_count++;

			//Update the question text
			question_wrapper.find('h2').html($("#q_input").val());
			question_wrapper.find("#mc_answers").empty();

			//Update Answer and Feedback
			
			//Update stored values
			feedback_array[question_num] = [];
			var mc_answer_array = [];
			var mc_feedback_array = [];
			$(".mc_feedback").each(function() {
				feedback_array[question_num].push($(this).val());
				mc_feedback_array.push($(this).val());
			});
		
			mc_correct = $("input[name=mc_correct]:checked").val();
			correct_answers[question_num] = mc_correct;
			
			//Update display
	
			$(".q_tab_answer").each(function(index) {
				mc_answer_array.push($(this).val()) ;
				question_wrapper.find("#mc_answers").append("<li>" + $(this).val() + "</li>");

				if ((index +1) == mc_correct) {
					question_wrapper.find("#mc_answers").append("<ul>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='feedback'>" + "Correct: " +
						mc_feedback_array[index] + "</span></ul>");
				}
				else {
					question_wrapper.find("#mc_answers").append("<ul>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='feedback'>" +
						mc_feedback_array[index] + "</span></ul>");
				}
			});


			answer_array[question_num] = mc_answer_array;
			feedback_array[question_num] = mc_feedback_array;

			//Replace Update Button with Add
			$(".update_button").hide();
			$(".add_button").show().css('display', 'inline-block');
			
			//Reset Tab If Changed During Update
			$("#q_content").hide().html(q_default);
			$("#tf_input").hide();
			$("#fill_input").hide();
			$("#sata_input").hide();
			$("#q_content").show()


		});

	});	//end edit click for multiple choice Qs
	
	
	///////////EDIT SELECT ALL THAT APPLY QUESTION/////////
	$("#sata_edit").live('click', function(){

		question_wrapper = $(this).parent('span');
		question_num = question_wrapper.attr('id');
		question_num = question_num.substring(question_num.indexOf('_') + 1);
		//Replace Add with Update
		$(".add_button").hide();
		$(".update_button").attr('id', 'update_sata_button');
		$(".update_button").show().css('display', 'inline-block');

		//Change Tab
		$(".tab_content").hide();
		$("#q_content #tab_title").html('Edit Question:');
		$(".tab").css('color', 'white');
		$("#question").css('color', '#fdd70f');

		//Update Prep
		$('#q_input').css('color', 'black');
		populateSATA(question_wrapper, question_num);
		//Bring Tab Back to View
		window.setTimeout(function(){
			$("#question_type").val('sata');
			$("#fill_input").hide();
			$("#tf_input").hide();
			$("#mc_input").hide();
			$("#sata_input").show();
			$("#q_content").show();
		}, 200);

		update_count = 0;

		//Update Preview
		$("#update_sata_button").live('click', function() {

			//prevent multiple firing
			if(update_count){
				return false;
			}
			update_count++;

			// Verify at least one checkbox is still checked
			var correct_picked = false;
			var sata_correct = [];
			$(".sata_checkbox").each(function() {
				if($(this).is(':checked')) {
					var id_num = $(this).attr('id').substring(13);
					sata_correct[id_num] = true;
					correct_picked = true;
				}
			});
			if(!correct_picked) {
				alert('Please select at least one correct answer');
				update_count = 0;
				return false;
			}

			//Update the question text
			question_wrapper.find('h2').html($("#q_input").val());
			question_wrapper.find("#sata_answers").empty();

			//Update Answer and Feedback

			//Update stored values
			feedback_array[question_num] = [];
			var sata_answer_array = [];
			var sata_feedback_array = [];
			$(".sata_feedback").each(function() {
				feedback_array[question_num].push($(this).val());
				sata_feedback_array.push($(this).val());
			});

			correct_answers[question_num] = sata_correct;

			//Update display

			$(".q_tab_sata_answer").each(function(index) {
				sata_answer_array.push($(this).val()) ;
				question_wrapper.find("#sata_answers").append("<li>" + $(this).val() + "</li>");

				if (sata_correct[(index +1)]) {
					question_wrapper.find("#sata_answers").append("<ul>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='feedback'>" + "Correct: " +
						sata_feedback_array[index] + "</span></ul>");
				}
				else {
					question_wrapper.find("#sata_answers").append("<ul>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='feedback'>" +
						sata_feedback_array[index] + "</span></ul>");
				}
			});

			answer_array[question_num] = sata_answer_array;
			feedback_array[question_num] = sata_feedback_array;

			//Replace Update Button with Add
			$(".update_button").hide();
			$(".add_button").show().css('display', 'inline-block');

			//Reset Tab If Changed During Update
			$("#q_content").hide().html(q_default);
			$("#tf_input").hide();
			$("#fill_input").hide();
			$("sata_input").hide();
			$("mc_input").show();
			$("#q_content").show()
		});

	});	//end edit click for Select All That Apply Qs


	
	//////////EDIT MEDIA////////////
	$("#media_edit").live('click', function(){

		edit_video = false;
		edit_audio = false;
		media_wrapper = $(this).parent('span');

		if(media_wrapper.find('#user_video').length){
			edit_video = true;
			media_source = media_wrapper.find("#user_video source").attr('src');
		}
		
		else if(media_wrapper.find('#user_audio').length){
			edit_audio = true;
			media_source = media_wrapper.find("#user_audio source").attr('src');
		}
		else {
			media_source = media_wrapper.find('#user_image').attr('src');
		}

		$(".add_button").hide();
		$(".update_button").attr('id', 'update_media');
		$(".update_button").show().css('display', 'inline-block');

		//Change Tab
		$(".tab_content").hide();
		
		//content
		$("#media_content #tab_title").html('Edit Media:');
		//nav bar
		$(".tab").css('color', 'white');
		$("#media").css('color', '#fdd70f');

		//Change Colors
		$('#media_header').css('color', 'black');
		$('#media_caption').css('color', 'black');

		populateMedia();

		//Bring Tab Back to View
		window.setTimeout(function(){
			$("#desktop").show();
			$("#media_manger").hide();			
			$("#media_content").show();
		}, 300);


		//Update Preview
		$("#update_media").live('click', function() {

			//header
			if($("#media_header").val() != '' && $("#media_header").val() != 'Enter Header/Bold Text'){
				media_wrapper.find('h2').html($("#media_header").val());
			}
			else {
				media_wrapper.find('h2').html('');
			}

			//caption
			if($('#media_caption').val() != '' && $('#media_caption').val() != 'Add Caption' ){
				media_wrapper.find('#p_caption').html($('#media_caption').val());
			}
			else {
				media_wrapper.find("#p_caption").html('');
			}

			//media element
			
			
			if(edit_video){
				media_wrapper.find('#user_video').attr('src', $("#video_resize").attr('src'));
			}
			else if (edit_audio){
				media_wrapper.find('#user_audio').attr('src', $("#audio_resize").attr('src'));
			}
			else {
				media_wrapper.find('#user_image').attr('src', $("#image_resize").attr('src'));
				media_wrapper.find('#user_image').width($("#image_resize").width() );
				media_wrapper.find('#user_image').height($("#image_resize").height() );
			}


			//Replace Update with Add
			$(".update_button").hide();
			$(".add_button").show().css('display', 'inline-block');

			//Reset Tab
			window.setTimeout(function(){

				$("#media_content").empty().hide().html(media_default);
				$("#desktop").show();
				$("#media_manger").hide();
				$("#image_processing").hide();
				$("#video_processing").hide();
				$("#audio_processing").hide();
				$("#media_content").show();
			}, 300);

		});

		//Tab Change in Middle of Edit
		$(".tab").click(function(){
			window.setTimeout(function(){
				$("#media_content").html(media_default);
				$("#desktop").show();
				$("#media_manger").hide();
				$("#image_processing").hide();
				$("#video_processing").hide();				
				$("#audio_processing").hide();
				
			}, 200);
		});


	});
	// end edit click on media
	
	
	////////EDIT PATIENT PROFILE////////
	$("#pat_edit").live("click", function(){

		var patient_wrapper = $(this).parent('span');

		//Replace Add Button with Update
		$(".add_button").hide();
		$(".update_button").attr('id', 'update_pat_button');
		$(".update_button").show().css('display', 'inline-block');

		//Change Tab
		$(".tab_content").hide();
			populatePatientFields(patient_wrapper);
			$("#pat_content #tab_title").html('Edit This Patient:');
			$(".tab").css('color', 'white');
			$("#patient").css('color', '#fdd70f');
		
		$("#pat_content").show();

		var update_count = 0;

		$("#update_pat_button").live("click", function(){

			if(update_count > 0){
				return false;
			}
			update_count++;

			patient_wrapper.find("#li_gender").html('Gender: ' + "<span id = 'gender_wrapper'>" + $("#gender").val() + "</span>");
			patient_wrapper.find("#li_age").html('Age: ' + "<span id = 'age_wrapper'>" + $("#pat_age").val() + "</span>");
			patient_wrapper.find("#li_country").html('Region or Country: ' + "<span id = 'country_wrapper'>" + $("#pat_country").val() + "</span>");
			patient_wrapper.find("#li_pat_other").html('Other: ' + "<span id = 'country_wrapper'>" + $("#pat_other").val() + "</span>");

			//Replace Update with Add
			$(".update_button").hide();
			$(".add_button").show().css('display', 'inline-block');
			//Reset
			$("#pat_content").html(pat_default);

		});

		//Reset Tab if Changed During Update
		$(".tab").click(function(){
			window.setTimeout(function(){
				$("#pat_content").html(pat_default);
			}, 400);
		});

	});
	// end edit click on patient profile
	
	
	/////////////EDIT TEXT////////////
	$(".text_tab_edit").live('click', function(){

		//Replace Add Button with Update
		$(".add_button").hide();
		$(".update_button").attr('id', 'update_text_button');
		$(".update_button").show().css('display', 'inline-block');

		//Change Tab
		$(".tab_content").hide();
			window.setTimeout(function(){
				$("#text_content #tab_title").html('Edit Text:');
				$(".tab").css('color', 'white');
				$("#text").css('color', '#fdd70f');
		}, 300);
		
		wrapper = $(this).parent('.text_wrapper');
		
		textColorText();
		populateText(wrapper);

		//Bring Tab Back to View
		window.setTimeout(function(){
			$("#text_content").show();
		}, 200);

		orig_border = false;
		add_new_border = false;
		remove_border = false;
		if($("#add_border").prop("checked")){
			orig_border = true;
		}

		//Add or Remove Border
		$("#add_border").change(function(){
			if( $("#add_border").prop("checked") && !orig_border){
				add_new_border = true;
			}
			if(! $("#add_border").prop("checked") && orig_border){
				remove_border = true;
			}
		});

		update_count = 0;

		//Update
		$("#update_text_button").live('click', function(){

			//prevent stupid .live() multiple firing bug
			if(update_count > 0){
				return false;
			}
			update_count++;

			data = CKEDITOR.instances.editor.getData();

			//Update Preview
			var updated_header = $("#text_header").val();
			if (updated_header == 'Section Header' || updated_header == '') {
				updated_header = '';
			}
			wrapper.children('h2').html(updated_header);
			wrapper.find('.wysiwyg_text').html(data);
			if(add_new_border){
				wrapper.find('.wysiwyg_text').wrap("<div id = 'border_box' />");
			}
			if(remove_border){
				wrapper.find('.wysiwyg_text').unwrap();
			}


			//Replace Update Button with Add
			$("#update_text_button").hide();
			$(".add_button").show().css('display', 'inline-block');

			//Reset
			$("#text_header").val('Section Header').css('color', '#BBB');
			$("#add_border").attr('checked', false);
			CKEDITOR.instances.editor.setData('');

		});

		//Reset Tab if User Changes During Update
		$(".tab").click(function(){
			$("#text_header").val('Section Header').css('color', '#BBB');
			$("#add_border").attr('checked', false);
			CKEDITOR.instances.editor.setData('');
		});


	});	
	
	// end edit click on text section
	
	
	//////////// EDIT TRUE-FALSE QUESTION//////////////
	$("#tf_edit").live('click', function(){

		question_wrapper = $(this).parent('span');
		question_num = question_wrapper.attr('id');
		question_num = question_num.substring(question_num.indexOf('_') + 1);

		//Replace Add with Update
		$(".add_button").hide();
		$(".update_button").attr('id', 'update_tf_button');
		$(".update_button").show().css('display', 'inline-block');

		//Change Tab
		$(".tab_content").hide();
		$("#q_content #tab_title").html('Edit Question:');
		$(".tab").css('color', 'white');
		$("#question").css('color', '#fdd70f');

		//Update Prep
		$(".content_input").css('color', 'black');
		populateTF(question_wrapper, question_num);

		//Bring Tab Back to View
		window.setTimeout(function(){
			$("#question_type").val('tf');
			$("#fill_input").hide();
			$("#mc_input").hide();
			$("#tf_input").show();
			$("#q_content").show();
		}, 200);

	});


	$("#update_tf_button").live('click', function() {

		question_wrapper.find('h2').html($("#q_input").val());

		feedback_sel_true = "";
		feedback_sel_false = ""; 

		var q_content = question_wrapper.html();
		tf_old_fb_array = [];
		question_wrapper.find('.feedback').each(function(index) {		
			tf_old_fb_array.push($(this).text());
		});

		if($("#true").is(':checked') ){
			correct_answers[question_num] = 1;
			feedback_sel_true = "Correct: " + $("#tf_feedback").val();
			feedback_sel_false= "Incorrect. Hint: " + $("#tf_hint").val();
		}
		else {
			correct_answers[question_num] = 0;
			feedback_sel_false = "Correct: " + $("#tf_feedback").val();
			feedback_sel_true= "Incorrect. Hint: " + $("#tf_hint").val();	
		}
		
		q_content = q_content.replace(tf_old_fb_array[0], feedback_sel_true);
		q_content = q_content.replace(tf_old_fb_array[1], feedback_sel_false);
		question_wrapper.html(q_content);
		
		feedback_array[question_num][0] = $("#tf_feedback").val();
		feedback_array[question_num][1] = $("#tf_hint").val();
			
		
		//Replace Update with Add
		$(".update_button").hide();
		$(".add_button").show().css('display', 'inline-block');
		
		//Reset Tab
		$("#q_content").hide().html(q_default);
		$("#fill_input").hide();
		$("#mc_input").hide();
		$("#tf_input").show();
		$("#q_content").show();

	});

	//Reset Tab If Changed During Update
	$(".tab").click(function(){
		$("#q_content").hide().html(q_default);
		$("#tf_input").hide();
		$("#fill_input").hide();
	});

	// end edit click on true-false question
	
});	//end document ready

function populateAuthor() {
	var name = $('#td_author_name').text();
	var affiliation = $('#td_author_affiliation').text();
	var license = $('#td_author_license').text();

	$('#author_name').val(name).css('color', 'black');
	$('#author_affiliation').val(affiliation).css('color', 'black');
	$('#creative_commons option:contains(' + license + ')').attr('selected', 'selected');
}

function populateFITB(wrapper, q_num){

	//Question Header
	$("#q_input").val(wrapper.find("h2").html());

	//Answer
	$("#fill_answer").val(correct_answers[q_num]);

	//Feedback
	$("#fill_feedback").val(feedback_array[q_num][0]);
	$("#fill_hint").val(feedback_array[q_num][1]);
}

function populateLo(){

	input_num = 1;
	$(".input_and_circle").remove();

	$(".lo_single").each(function(){

		id = "lo_" + input_num.toString();

		input = $("<span class = 'input_and_circle'>" +
		"<input id = '" + id + "' class = 'lo_tab_input' value = '" + $(this).html() +
		"'/>");

		input.find('.lo_tab_input').css('color', 'black');

		$("#controls").before(input);

		input_num++;
	});
	//input_num is also increased in add.js so set it back
	input_num--;
}

function populateMC(wrapper, q_num){
	$("#q_input").val(wrapper.find('h2').html());
	$(".mc_group").remove();

	mc_num = 1;
	var index = mc_num - 1;

	wrapper.find("#mc_answers li").each(function() {

		id = "mc_" + mc_num.toString();
		
		input = 

		$("<div class = 'mc_group'><span class = 'input_and_circle'>" +
		"<input id = '" + id + "' class = 'q_tab_answer' value = '" + $(this).html() + "'/>" +
		"</span>" +
		"<span class = 'correct_radio'> Correct" + 
		"<input type = 'radio' name = 'mc_correct' class = 'mc_radio' id = 'mc_correct_" + mc_num + "' value = '" + mc_num + "'/></span>" +

		//use index since this array is populated with .push(), not question #
		"<span class = 'input_and_circle'>" +
		"<input id = 'mc_feedback' class = 'content_input mc_feedback' value = '" + feedback_array[q_num][index] + "'/>" +
		"</span></br>" +
		"</br></br></div>");

		input.find('.q_tab_answer').css('color', 'black');
		input.find('.mc_feedback').css('color', 'black');

		$("#mc_controls").before($(input).show());
		mc_num++;
		index++;

	});

	mc_num--;

	//Check correct radio
	answer = correct_answers[q_num];
	answer_id = "#mc_correct_" + answer;
	$(answer_id).attr('checked', 'checked');
	$(answer_id).parents('.mc_group').find('input:text').css('background-color', '#FBFFB3');

}

function populateSATA(wrapper, q_num){
	$("#q_input").val(wrapper.find('h2').html());
	$(".sata_group").remove();

	sata_num = 1;
	var index = sata_num - 1;

	wrapper.find("#sata_answers li").each(function() {

		id = "sata_" + sata_num.toString();

		input =

		$("<div class = 'sata_group'><span class = 'input_and_circle'>" +
		"<input id = '" + id + "' class = 'q_tab_sata_answer' value = '" + $(this).html() + "'/>" +
		"</span>" +
		"<span class = 'sata_checkboxes'> Correct" +
		"<input type = 'checkbox' name = 'sata_correct' class = 'sata_checkbox' id = 'sata_correct_" + sata_num + "' value = '" + sata_num + "'/></span>" +

		//use index since this array is populated with .push(), not question #
		"<span class = 'input_and_circle'>" +
		"<input id = 'sata_feedback' class = 'content_input sata_feedback' value = '" + feedback_array[q_num][index] + "'/>" +
		"</span></br>" +
		"</br></br></div>");

		input.find('.q_tab_sata_answer').css('color', 'black');
		input.find('.sata_feedback').css('color', 'black');

		$("#sata_controls").before($(input).show());
		sata_num++;
		index++;

	});

	sata_num--;

	//Check correct checkboxes
	for (var i = 1; i <= correct_answers[q_num].length; i++) {
		if (correct_answers[q_num][i]) {
			var answer_id = "#sata_correct_" + i;
			$(answer_id).attr('checked', 'checked');
			$(answer_id).parents('.sata_group').find('input:text').css('background-color', '#FBFFB3');
		}
	}
}

function populateMedia() {
	//header
	$("#media_header").val(media_wrapper.find('h2').html());
	if(media_wrapper.find('h2').html() == ''){
		$("#media_header").val('Enter Header/Bold Text');
		$("#media_header").css('color', '#BBB');
	}

	//caption
	$("#media_caption").val(media_wrapper.find('#p_caption').html());
	if(media_wrapper.find('#p_caption').html() == '') {
		$("#media_caption").val('Add Caption');
		$("#media_caption").css('color', '#BBB');
	}

	if(edit_video){
		$("#image_processing").hide();
		$("#audio_processing").hide();
		$("#video_resize").attr('src', media_source);
		$("#video_processing").show();
	}
	if(edit_audio){
		$("#image_processing").hide();
		$("#video_processing").hide();
		$("#audio_resize").attr('src', media_source);
		$("#audio_processing").show();
	}
	
	else {
		$("#audio_processing").hide();
		$("#video_processing").hide();

		$("#image_resize").attr('src', media_source);
		
		//image dimensions
		$("#image_resize").width(media_wrapper.find('#user_image').width());
		$("#image_resize").height(media_wrapper.find('#user_image').height());

		$(function(){
			$("#image_resize").resizable({
				handles: "n, e, s, w"
			});
		});

		$("#image_processing").show();
	}

}

//populate fields for patient profile
function populatePatientFields(wrapper){
	age = wrapper.find("#age_wrapper").html();
	gender = wrapper.find("#gender_wrapper").html();
	country = wrapper.find("#country_wrapper").html();
	pat_details = wrapper.find("#pat_other_wrapper").html();

	$("#gender").val(gender);
	$("#pat_age").val(age).css('color', 'black');
	$("#pat_country").val(country).css('color', 'black');
	$("#pat_other").val(pat_details).css('color', 'black');
}

function populateText(wrapper){

	$("#text_header").val(wrapper.children('h2').html());
	data = wrapper.find('.wysiwyg_text').html();

	if(wrapper.children('#border_box').length){
		$("#add_border").prop("checked", true);
	}

	CKEDITOR.instances.editor.setData(data);
}

function textColorText(){
	$("#text_header").css('color', 'black');
}

function populateTF(wrapper, q_num){

	$("#q_input").val(wrapper.find('h2').html());
	if(correct_answers[q_num] == 1){
		//set true
		$('#true').attr('checked', 'checked');
	}
	else{
		$("#false").attr('checked', 'checked');
	}

	$("#tf_feedback").val(feedback_array[q_num][0]);
	$("#tf_hint").val(feedback_array[q_num][1]);
}

