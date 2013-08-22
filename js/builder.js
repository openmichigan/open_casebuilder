//This file is part of Open Case Builder from University of Michigan, 
//a free open source application available at http://openmi.ch/casebuilder.

//Number of Inputs
var input_num = 1;
var mc_num = 1;

//Media Globals
var is_video;
var is_audio;
var is_supported;
var file_type;

// defaults for text fields for Add elements

var defaults = new Array(
	'Enter Learning Objective', 'Enter Age', 'Enter Region or Country', 'Enter Other Details', 'Enter Header/Bold Text', 'Type Question', 'Type Answer', 'Type Feedback if Correct',
	'Type Hint if Incorrect', 'Enter Option', 'Type Feedback', 'Add Caption', 'Enter Name', 'Enter Affiliations',
	'Section Header'
);

//GLOBAL DEFAULTS FOR ADDING CASE ELEMENTS
var lo_default;
var pat_default;
var text_default;
var q_default;
var media_default;
var lo_clicks = 0;
var correct_answers = [];
var answer_array = [];
var feedback_array = [];
var author_array = [];
var is_video;
var num_q = 1;
var num_pat = 1;

$(document).ready(function() {

        //
        //Give warnings that "contents will be lost" before going away
        //
        //This is for page reload or other navigation events (The CLear Contents check is done within rearrange.js)
        $(window).bind('beforeunload',function(event){
                return "All your current work will be lost!";
        });

        //Highlight focused tab
        tabHighlight();
        
        //Text Editor
        createEditor();
        
        //set default tab as learning objective
        $('.tab_content').hide();
        $("#lo_content").fadeIn();
        $('#lo').css('color', '#fdd70f');

        //change add box content on nav click
        changeTab();

        //Add/Remove Learning Objectives
        addLearningObj();
        removeLearningObj();

        //Add/Remove Multiple Choice options
        addMcAnswer();
        removeMcAnswer();

        //View Preview
        $('#view_preview').click(function() {

                var preview_content = [];
                $('.preview_element').each(function() {
                        var element = $("<div />").append($(this).clone()).html();
                        preview_content.push(element);
                });

                window.localStorage.clear();
				
				var quota_err = "QUOTA_EXCEEDED_ERR: DOM Exception 22"
				
				try {
					window.localStorage.setItem('builder_preview', JSON.stringify(preview_content));
					window.localStorage.setItem('case_name', $('#case_name').val());
					window.localStorage.setItem('correct_answers', JSON.stringify(correct_answers));
					window.localStorage.setItem('answers', JSON.stringify(answer_array));
					window.localStorage.setItem('feedback', JSON.stringify(feedback_array));
					window.localStorage.setItem('loaded', 0);
					var w = window.open('../html/view.html', false);

				} catch ( e ) {
					if (e.message==quota_err) {
							alert('Quota exceeded! The full case must be under 4 MB total. ' + 
								'You may need to remove or compress some of the videos or images. Clear your cache too.');	
						}
				   
				}
                
        });
        
        ////////ADD CASE ELEMENTS////////////
        
        $("#submit_name").click(function(){
			$("#preview").append()
		});

		//Learning Objective List
		var l_list;
	
		//Patient
		pat_clicks = 0;
		var p_list;
		
		//Default Tab Content
		lo_default = $("#lo_content").html();
		pat_default = $("#pat_content").html();
		text_default = $("#text_content").html();
		q_default =  $("#q_content").html();
		media_default = $("#media_content").html();
		author_default = $("#author_content").html();
	
		//Move Add Contents to Preview
		$(".add_button").live("click", function(){
			
			//Add Click Animation
			$(this).animate({fontSize: '16px'}, 40).animate({fontSize: '18px'}, 40);
	
			//Learning Objective///////////////////////////
			if($(this).attr('id') == 'add_lo'){
				
				num_lo = 0
				var lo_empty = 'Enter Learning Objective';
				$(".lo_tab_input").each(function(){		//check that lo's are not null
					if($(this).val().indexOf(lo_empty) !=0){
						num_lo+=1;
					}
				});
				if(num_lo > 0)
				{
					lo_valid = true;
				}
				else
				{
					lo_valid = false;
				}
				
				
				if(lo_clicks == 0){
					if(lo_valid){
						$("#preview").append("<span class = 'preview_element lo_wrapper' id = 'lo_wrapper'>"
						+ "<span class = 'arrow_box'><span class = 'arrow_wrapper'><div class = 'up'></div></span>"
						+ "<span class = 'arrow_wrapper'><div class = 'down'></div></span></span>"
						+ "<h2>Learning Objectives</h2>"
						+ "<p id = 'lo_edit' class = 'edit'>Edit</p><p id = 'lo_remove' class = 'remove'>Remove</p>"
						+ "<ol id = 'lo_list'></ol></br>");
						lo_clicks++;
					}
				}
				if(lo_valid){	//check that lo is not null
					$(".lo_tab_input").each(function(){				
						if($(this).val().indexOf(lo_empty) != 0){
							var li = $("<li class = 'lo_single'>" + $(this).val() + "</li>");
							li.appendTo($("#lo_list"));
						}
					});
				}
				else{
					alert('No Learning Objectives Entered');
				}
	
				$("#lo_content").empty().hide().append(lo_default).fadeIn();
				input_num = 1;
			}
	
			//Patient///////////////////////////
			if($(this).attr('id') == 'add_pat'){
	
				//Check that patient info is not null
				pat_valid = true;
				if($("#pat_age").val() == 'Enter Age' || $("#pat_country").val() == 'Enter Region or Country' || $("#gender").val() == '0'){
					alert('Missing patient information.');
					return false;
				}

				var pat_list_id = 'pat_list_' + num_pat;

				p_list = $("<span class = 'preview_element pat_wrapper' id = 'patient_" + num_pat + "'>"
				+ "<span class = 'arrow_box'><span class = 'arrow_wrapper'><div class = 'up'></div></span><span class = 'arrow_wrapper'><div class = 'down'></div></span></span>"
				+ "<h2>Patient Profile</h2>"
				+ "<p id = 'pat_edit' class = 'edit'>Edit</p> <p id = 'pat_remove' class = 'remove'>Remove</p>"
				+ "<ul id = '" + pat_list_id + "'></ul></span>");
	
				p_list.appendTo($("#preview"));
	
				$(".pat_drop").each(function(){
					switch($(this).attr('id')){
	
						case 'gender':
							var li = $("<li id = 'li_gender'>Gender: <span id = 'gender_wrapper'>" + $(this).val() + "</span></li>");
							li.appendTo('#' + pat_list_id);
							break;
	
					}
				});
	
				
				$(".content_input").each(function(){
					switch($(this).attr('id')){
	
						case 'pat_age':
							var li = $("<li id = 'li_age'>Age: <span id = 'age_wrapper'>" + $(this).val() + "</span></li>");
							li.appendTo('#' + pat_list_id);
							break;
	
						case 'pat_country':
							var li = $("<li id = 'li_country'>Region or Country: <span id = 'country_wrapper'>" + $(this).val() + "</span></li>");
							li.appendTo('#' + pat_list_id);
							break;
	
						case 'pat_other':
							var other_details;
							if ($(this).val()=='Enter Other Details'){
								other_details="";
							}
							else {
								other_details = $(this).val();
							}
							var li = $("<li id = 'li_pat_other'>Other: <span id = 'pat_other_wrapper'>" + other_details + "</span></li>");
							li.appendTo('#' + pat_list_id);
							break;
	
					}
				});
	
				$("#pat_wrapper").append("</br>");
				num_pat++;

				$("#pat_content").empty().hide().append(pat_default).fadeIn();
				$("#age").val(0);
				$("#gender").val(0);
				$("#country").val(0);
			}
	
			//Text///////////////////////////
			if($(this).attr('id') == 'add_text'){
				var data = CKEDITOR.instances.editor.getData();
				;
				static_data = data;
				if($("#add_border").is(':checked')){
					data = "<div id = 'border_box'>" + "<div class = 'wysiwyg_text'>" + data + "</div>" + "</div>";
				}
				else{
					data = "<div class = 'wysiwyg_text'>" + data + "</div>";
				}
	
				var header_text = $('#text_header').val();
				if(header_text == 'Section Header') {
					header_text = ''
				}
				if(header_text == '' && static_data == ''){
					alert('Please add text content first.');
					return false;
				}
				
				header = "<h2>" + header_text + "</h2>" + "<p class = 'edit text_tab_edit'>Edit</p>" +
				"<p id = 'text_remove' class = 'remove'>Remove</p>";
	
				all_text = "<div class = 'text_wrapper preview_element'>" +
				"<span class = 'arrow_box'><span class = 'arrow_wrapper'><div class = 'up'></div></span><span class = 'arrow_wrapper'><div class = 'down'></div></span></span>"
				 + header + data + "</br></div>";

				//Add to Preview
				$("#preview").append(all_text);
				//Reset Text Tab
				$("#text_header").val('Section Header').css('color', '#BBB');
				$("#add_border").attr('checked', false);
				CKEDITOR.instances.editor.setData('');
				
			}
	
			//Question///////////////////////////
			if($(this).attr('id') == 'add_q'){
	
				if($("#q_input").val() == 'Type Question') {
					alert("Please enter a question.");
					return false;
				}
	
				//Fill in the Blank
				if($("#question_type").val() == 'fill'){
	
					if($("#fill_answer").val() == 'Type Answer') {
						alert('Please enter an answer.');
						return false;
					}
	
					question = "<span class = 'arrow_box'><span class = 'arrow_wrapper'><div class = 'up'></div></span>"
					+ "<span class = 'arrow_wrapper'><div class = 'down'></div></span></span>"
					+ "<h2>" + $("#q_input").val() + "</h2>" + "<p id = 'fitb_edit' class = 'edit'>Edit</p>" +
					"<p id = 'q_remove' class = 'remove'>Remove</p></br>";
	
					input_id = 'fb_' + num_q.toString(); 
					var user_answer_input = question + "<input style = 'margin-top: 5px;'class = 'content_input' id = '" + input_id + "' value = 'Enter Answer'/>" 
					+ "</br><div class = 'submit_answer'>Submit</div></br></br>";
	
					user_answer_input = "<span class = 'fitb_wrapper question_wrapper preview_element' id = 'question_" + num_q + "'>"  
					+ user_answer_input + "</span>";
	
					fb_feedback_array = [];
					fb_feedback_array.push($("#fill_feedback").val());
					fb_feedback_array.push($("#fill_hint").val());
	
					correct_answers[num_q] = $("#fill_answer").val();
					feedback_array[num_q] = fb_feedback_array;
	
					$("#preview").append(user_answer_input);
					num_q++;

					//Reset Tab
					
				} //end add fill in the blank question
	
				//True / False
				if($("#question_type").val() == 'tf'){
	
					if(! $('#true').is(':checked') &&  ! $('#false').is(':checked')) {
						alert('Please select true or false');
						return false;
					}
	
					question = "<span class = 'arrow_box'><span class = 'arrow_wrapper'><div class = 'up'></div></span>"
					+ "<span class = 'arrow_wrapper'><div class = 'down'></div></span></span>"
					+ "<h2>" + $("#q_input").val() + "</h2>" + "<p id = 'tf_edit' class = 'edit'>Edit</p>" +
					"<p id = 'q_remove' class = 'remove'>Remove</p></br>";
					
					input_id = 'tf_' + num_q.toString(); 
					
					tf_correct = $('input:radio[name=tf]:checked').val();
					
					feedback_sel_true = "";
					feedback_sel_false = ""; 
					
					if(tf_correct==1) {
						feedback_sel_true = "Correct: " + $("#tf_feedback").val();
						feedback_sel_false= "Incorrect. Hint: " + $("#tf_hint").val();
					}
					else {
						feedback_sel_false = "Correct: " + $("#tf_feedback").val();
						feedback_sel_true= "Incorrect. Hint: " + $("#tf_hint").val();
					}

					var user_answer_input = question + 
					"<table id = 'tf_prev_table'><tr><td><input type = 'radio' name = '" + input_id + "' value = '1'/></td><td>True"	
					+ "<br/><span class='feedback'>" + feedback_sel_true + "</span>" + 
					"</td></tr>" +
					"<tr><td><input type = 'radio' name = '" + input_id + "' value = '0'/></td><td>False"+ 
					"<br/><span class='feedback'>" + feedback_sel_false + "</span>" + 
					"</td></tr></table>"; 

					user_answer_input = "<span class = 'tf_wrapper question_wrapper preview_element' id = 'question_" + num_q + "'>"  
					+ user_answer_input + "</br></span>";
	
					tf_feedback_array = [];
					tf_feedback_array.push($("#tf_feedback").val());
					tf_feedback_array.push($("#tf_hint").val());
	
					correct_answers[num_q] = $('input:radio[name=tf]:checked').val();
					feedback_array[num_q] = tf_feedback_array;
	
					$("#preview").append(user_answer_input);
					num_q++;
			
				} // end add true-false question
	
				//Multiple Choice
				if($("#question_type").val() == 'mc'){
	
					var correct_picked = false;
					$('.mc_radio').each(function() {
						if($(this).is(':checked')) {
							correct_picked = true;
							return;
						}
					});
					if(!correct_picked) {
						alert('Please select correct answer');
						return false;
					}
	
					question = "<span class = 'arrow_box'><span class = 'arrow_wrapper'><div class = 'up'></div></span>"
					+ "<span class = 'arrow_wrapper'><div class = 'down'></div></span></span>" 
					+ "<h2>" + $("#q_input").val() + "</h2>" + "<p id = 'mc_edit' class = 'edit'>Edit</p>" +
					"<p id = 'q_remove' class = 'remove'>Remove</p></br>";
	
					input_id = 'mc_' + num_q.toString();
					var choices = $("<ul id = 'mc_answers'></ul>");
					
					mc_feedback_array = [];
					$(".mc_feedback").each(function() {
						mc_feedback_array.push($(this).val());
					});
					
					mc_correct = $("input[name=mc_correct]:checked").val();
					

					var mc_answer_array = [];
					$(".q_tab_answer").each(function(index){
						choices.append("<li>" + $(this).val() + "</li>");						
						if ( (index +1) == mc_correct) {
							choices.append("<ul>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='feedback'>" + "Correct: " + 
								mc_feedback_array[index] + "</span></ul>");
						}
						else {						
							choices.append("<ul>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='feedback'>" + mc_feedback_array[index] + 
							"</span></ul>");
						}
						mc_answer_array.push($(this).val());
					});
				
					choices = "<span class = 'mc_wrapper question_wrapper preview_element' id = 'question_" + num_q + "'>" + question 
					+ "<ol id = 'mc_answers'>" + choices.html() + "</ol><br /><br /></span>"; 
					$("#preview").append(choices);

					answer_array[num_q] = mc_answer_array;
					feedback_array[num_q] = mc_feedback_array;
					correct_answers[num_q] = $("input[name=mc_correct]:checked").val();
	
					num_q++;
					
					mc_num = 1;	
					
				} // End add Multiple choice question
				
				//Reset Tab, back to default question type
				$("#q_content").empty().hide().append(q_default).fadeIn();
				$("#fill_input").hide();
				$("#tf_input").hide();	
				$("#mc_input").show();	

					
			} //end Question tab
			//Media///////////////////////////
			if($(this).attr('id') == 'add_media'){
				img_location = $("#image_resize").attr('src');
				video_location = $("#video_resize").attr('src');
				audio_location = $("#audio_resize").attr('src');
				
				if(is_video){
					source = "<video id = 'user_video' width='320' height='240' controls='controls'>" +
							   "<source src = '" + video_location + "' type ='video/" + file_type + "' />" +
							   "</video></br>";
					
					
				}
				else if (is_audio) {
					source = "<audio id = 'user_audio' controls='controls'>" +
							   "<source src = '" + audio_location + "' />" +
							   "</audio></br>";
				}
				else{
					source = "<img id = 'user_image' src = '" + img_location + "' height = '" + $("#image_resize").height() + 
					"' width = '" + $("#image_resize").width() + "' /></br>";
				}
	
				header_text = $('#media_header').val();
				if(header_text == 'Section Header') {
					header_text = '';
				}
	
				header = "<span class = 'arrow_box'><span class = 'arrow_wrapper'><div class = 'up'></div></span>"
				+ "<span class = 'arrow_wrapper'><div class = 'down'></div></span></span><h2>"
				+ header_text + "</h2><p id = 'media_edit' class = 'edit'>Edit</p>" +
				"<p id = 'media_remove' class = 'remove'>Remove</p></br>";
				
				caption = $("#media_caption").val();
				
				if(caption == 'Add Caption') {
					caption = '';
				}
				caption = "<p id = 'p_caption'>" + caption + "</p></br></br>";
				
				$("#upload_file").live("change", function(){
					
					//Process Media Locally
					readURL(this);
	
					name_str = $("#upload_file").val();
					file_type = name_str.substr( (name_str.lastIndexOf('.') +1) );
					
					is_supported = isSupportedFileType (file_type);
					
					if (!is_supported) {
					
						alert ('Unsupported file type: ' + file_type); 
					}
					else {
				
						is_video = isVideo(file_type);
						is_audio = isAudio(file_type);
						
		
						if(is_video){	
							$("#video_processing").fadeIn('slow');
						}
						
						else if(is_audio){
							$("#audio_processing").fadeIn('slow');
						}
						
						else{
							$("#image_processing").fadeIn('slow');
						}
						
						$("#image_resize").resizable({ 
							disabled: false, 
							maxWidth: 450, 
							maxHeight: 275,
						});
		
						$("#video_wrapper").resizable({ 
							disabled: false, 
							maxWidth: 450, 
							maxHeight: 275
						});
					}
				});
	
				//Reset Tab
				$("#media_content").empty().hide('fast', function(){
					$("#image_processing").hide();
					$("#image_resize").attr('src', '');
	
					$("#video_processing").hide();
					$("#video_resize").attr('src', '');
					
					
					$("#audio_processing").hide();
					$("#audio_resize").attr('src', '');
					
				}).append(media_default).fadeIn();
	
				if(file_type != null){
	
					content = "<span class = 'media_wrapper preview_element'>" + header + source + caption + "</span>";
	
					$("#preview").append(content);
					file_type = null;
				}
				else{
					alert('No File Attached');
				}
	
			}	//end media
	
			//Author/////////////////////////////////
			if($(this).attr('id') == 'add_author') {
	
				if($('#author_name').val() == 'Enter Name') {
					alert("Please enter author's name.");
					return false;
				}
	
				if($('#author_affiliation').val() == 'Enter Affiliations') {
					alert("Please enter author's affiliations.");
					return false;
				}
	
				var license_URL = "http://www.creativecommons.org/licenses/";
				
				var license_choice = $('#creative_commons option:selected').val();
				
				switch(license_choice){
					case 'cc_by':
						license_URL += "by/3.0/";
						break;
					case 'cc_by_nc':
						license_URL += "by-nc/3.0/";
						break;
					case 'cc_by_sa':
						license_URL += "by-sa/3.0/";
						break;
					case 'cc_by_nd':
						license_URL += "by-nd/3.0/";
						break;
					case 'cc_by_nc_sa':
						license_URL += "by-nc-sa/3.0/";
						break;
					case 'cc_by_nc_nd':
						license_URL += "by-nc-nd/3.0/";
						break;
				}
				
				var license_html = "";
				if (license_choice=='none') {
					license_html = $('#creative_commons option:selected').text();
				}
				else {
					license_html = "<a target='_blank' href='" + license_URL + "'>"
						+ $('#creative_commons option:selected').text() + "</a>";
				}
				
				var author_element = $("<span class = 'preview_element author_wrapper'></span>");
				var author_table = $("<p id = 'a_edit' class = 'edit'>Edit</p><p id = 'a_remove' class = 'remove'>Remove</p>"
					+ "<table id = 'author_table'><tr><td>Author: </td><td id = 'td_author_name'>" + $('#author_name').val() 
					+ "</td></tr><tr><td>Affiliation: </td><td id = 'td_author_affiliation'>" + $('#author_affiliation').val()
					+ "</td></tr><tr><td>License: </td><td id = 'td_author_license'>" + license_html 
					+ "</td></tr></table></br>");
				author_element.append(author_table);
	
				$("#preview").prepend(author_element);
	
				//reset tab
				$("#author_content").empty().hide().append(author_default).fadeIn();
			}
	
	
	
		});

        
        ///////END ADD CASE ELEMENTS//////////    
        
        
        
        ///// CLEAR TEXT FIELDS FOR ADD ELEMENTS///////
        
        $('input').live('focus', function() {
			//check for default value
			for(i = 0; i < defaults.length; i++) {
				if($(this).val().indexOf(defaults[i]) != -1 ) {
					$(this).val('').css('color', 'black');
				}
			}
		});
	
		$('input').live('blur', function() {
	
			//check for all input id's
	
			//Learning Objective Input
			if($(this).attr('id').indexOf('lo_') != -1 && $(this).val() == ''){
				$(this).css('color', '#BBB').val('Enter Learning Objective ' + input_num);
			}
	
			//Text Header Input
			if($(this).attr('id') == 'text_header' && $(this).val() == '') {
				$(this).css('color', '#BBB').val('Section Header');
			}
	
			//Patient text fields
			if($(this).attr('id') == 'pat_age' && $(this).val() == '') {
				$(this).css('color', '#BBB').val('Enter Age');
			}
			
			if($(this).attr('id') == 'pat_country' && $(this).val() == '') {
				$(this).css('color', '#BBB').val('Enter Region or Country');
			}
			
			if($(this).attr('id') == 'pat_other' && $(this).val() == '') {
				$(this).css('color', '#BBB').val('Enter Other Details');
			}
			
			//Question Header
			if($(this).attr('id') == 'q_input' && $(this).val() == '') {
				$(this).css('color', '#BBB').val('Type Question');
			}
	
			//Fill in the Blank Answer
			if($(this).attr('id') == 'fill_answer' && $(this).val() == '') {
				$(this).css('color', '#BBB').val('Type Answer');
			}
	
			//Fill in the Blank Positive Feedback
			if($(this).attr('id') == 'fill_feedback' && $(this).val() == '') {
				$(this).css('color', '#BBB').val('Type Feedback if Correct');
			}
	
			//Fill in the Blank Negative Feedback
			if($(this).attr('id') == 'fill_hint' && $(this).val() == '') {
				$(this).css('color', '#BBB').val('Type Hint if Incorrect');
			}
	
			//True / False Positive Feedback
			if($(this).attr('id') == 'tf_feedback' && $(this).val() == '') {
				$(this).css('color', '#BBB').val('Type Feedback if Correct');
			}
	
			//True / False Negative Feedback
			if($(this).attr('id') == 'tf_hint' && $(this).val() == '') {
				$(this).css('color', '#BBB').val('Type Hint if Incorrect');
			}
	
			//Multiple Choice Answers
			if($(this).attr('class') == 'q_tab_answer' && $(this).val() == ''){
				mc_answer_number = $(this).attr('id').substring(3);
				$(this).css('color', '#BBB').val('Enter Option ' + mc_answer_number);
			}
	
			//Multiple Choice Feedback
			if($(this).attr('id') == 'mc_feedback' && $(this).val() == ''){
				$(this).css('color', '#BBB').val('Type Feedback');
			}
	
			//Media Header
			if($(this).attr('id') == 'media_header' && $(this).val() == ''){
				$(this).css('color', '#BBB').val('Section Header');
			}
	
			//Media Caption
			if($(this).attr('id') == 'media_caption' && $(this).val() == ''){
				$(this).css('color', '#BBB').val('Add Caption');
			}
	
			//Author Name
			if($(this).attr('id') == 'author_name' && $(this).val() == ''){
				$(this).css('color', '#BBB').val('Enter Name');
			}
	
			//Author Affiliations
			if($(this).attr('id') == 'author_affiliation' && $(this).val() == ''){
				$(this).css('color', '#BBB').val('Enter Affiliations');
			}
		});
 
		///// END CLEAR TEXT FIELDS FOR ADD ELEMENTS///////

});

function addLearningObj(){

        $("#add_input").live("click", function(){

                id = "lo_" + input_num.toString();
                input_num++;
                
                input = $("<span class = 'input_and_circle'>" +
                "<input id = '" + id + "' class = 'lo_tab_input' value = 'Enter Learning Objective " + input_num + 
                "'/></span>");

                $("#controls").before(input);

        });

}

function removeLearningObj(){

        $("#remove_input").live("click", function(){

                if(input_num == 1){
                        return;
                }

                $(".input_and_circle:last").fadeOut('fast', function(){
                        $(this).remove();
                });
                input_num--;

        });
}

function addMcAnswer(){

        $("#add_answer").live("click", function(){

                mc_num++;
                id = "mc_" + mc_num.toString();
                

                input = 

                "<div class = 'mc_group'><span class = 'input_and_circle'>" +
                "<input type = 'text' id = '" + id + "' class = 'q_tab_answer' value = 'Enter Option " + mc_num + "'/>" +
                "<span class = 'correct_radio'> Correct" + 
                "<input type = 'radio' name = 'mc_correct' class = 'mc_radio' id = 'mc_correct_" + mc_num + "' value = '" + mc_num + "'/></span>" +
                "</span>" +

                "<span class = 'input_and_circle'>" +
                "<input type = 'text' id = 'mc_feedback' class = 'content_input mc_feedback' value = 'Type Feedback" + "'/>" +
                "</span></br>" +
                "</br></br></div>";

                $("#mc_controls").before($(input).fadeIn());

        });

}

function removeMcAnswer(){

        $("#remove_answer").live("click", function(){
                
                if(mc_num == 1){
                        return;
                }

                $(".mc_group:last").fadeOut('fast', function(){
                        $(this).remove();
                });
                mc_num--;

        });
}

function createEditor(){
        CKEDITOR.replace('editor', {
                toolbar : 'my_toolbar',
                height: '200',
                width: '475',
                maxWidth: '475'
        });
}

function readURL(input, isVideo, file_type) {
	if (input.files && input.files[0]) {
	    var reader = new FileReader();

	    reader.onload = function (e) {
	    name_str = $("#upload_file").val();
	    file_type = name_str.substr( (name_str.lastIndexOf('.') +1) ).toLowerCase();

	    	//Determine which preview to show (image || video)
	    	switch(file_type){

	    		case 'jpg':
	    			$('#image_resize').attr('src', e.target.result);
					break;
	    		
	    		case 'jpeg':
	    			$('#image_resize').attr('src', e.target.result);
					break;

	    		case 'png':
	    			$('#image_resize').attr('src', e.target.result);
					break;

	    		case 'gif':
	    			$('#image_resize').attr('src', e.target.result);
					break;

	    		case 'mp4':
	    			$('#video_resize').attr('src', e.target.result);
	    			break;
					
	    		case 'ogg':
	    			$('#video_resize').attr('src', e.target.result);
					break;
	    		
	    		case 'mp3':
	    			$('#audio_resize').attr('src', e.target.result);
					break;


	    	}
	    }
	    reader.readAsDataURL(input.files[0]);
	}
}

function isVideo(extension){
	switch(extension){

		case 'mp4':
			return true;

		case 'ogg':
			return true;
			
		default:
			return false;

	}
}

function isSupportedFileType(extension){
	
	switch(extension){
		
		case 'jpg':
			return true;
		
		case 'jpeg':
			return true;

		case 'png':
			return true;

		case 'gif':
			return true;

		case 'mp4':
			return true;

		case 'ogg':
			return true;
			
		case 'mp3':
			return true;
			
		default:
			return false;
	}
}


function isAudio(extension){
	switch(extension){
		
		case 'mp3':
			return true;
			
		default:
			return false;
	}
}


function changeTab(){

	$(".tab").click(function(){

			$("#add_content").fadeOut(200);	//clear content window

			//Learning Objective
			if($(this).attr('id') == "lo"){
				$(".add_button").attr('id', 'add_lo');
				window.setTimeout(function(){
					$(".tab_content").hide();
					$("#fill_input").hide();
					$("#tf_input").hide();
					$("#lo_content").show();
				}, 200);


			}

			//Patient
			if($(this).attr('id') == "patient"){
				$(".add_button").attr('id', 'add_pat');
				window.setTimeout(function(){
					$(".tab_content").hide();
					$("#pat_content").show();
				}, 200);

			}

			//Text
			if($(this).attr('id') == "text"){
				$(".add_button").attr('id', 'add_text');
				window.setTimeout(function(){
					$(".tab_content").hide();
					$("#text_content").show();
				}, 200);

 
			}

			//Question
			if($(this).attr('id') == "question"){
				$(".add_button").attr('id', 'add_q');
				$("#question_type").val('mc');

				window.setTimeout(function(){
					$(".tab_content").hide();
					$("#q_content").show();
				}, 200);

				$("#question_type").live("change", function(){
					$("#question_type option:selected").each(function(){
						
						if($(this).val() == "fill"){
							$("#tf_input").fadeOut(100, function(){
								$("#mc_input").fadeOut(100, function(){
									$("#fill_input").fadeIn(600);
								});
							});
						}
						if($(this).val() == "tf"){
							$("#fill_input").fadeOut(100, function(){
								$("#mc_input").fadeOut(100, function(){
									$("#tf_input").fadeIn(600);
								});
							});
						}
						if($(this).val() == "mc"){

							$("#fill_input").fadeOut(100, function(){
								$("#tf_input").fadeOut(100, function(){
									$("#mc_input").fadeIn(600);
								});
							});

						}
					});
				});
			}

			//Media
			if($(this).attr('id') == "media"){
				$(".add_button").attr('id', 'add_media');
				$("#file_location").val('File from Desktop');
				$("#desktop").show();
				$("#media_manger").hide();
				$("#image_processing").hide();
				$("#video_processing").hide();
				
				
				$("#audio_processing").hide();
				
				window.setTimeout(function(){
					$(".tab_content").hide();
					$("#media_content").show();
				}, 200);
			
				$("#file_location").change(function(){
					$("#file_location option:selected").each(function(){
						
						if($(this).val() == "desktop"){
							$("#media_m").fadeOut(150, function(){
								$("#d_top").fadeIn(600);
							});
						}

						if($(this).val() == "media_manager"){
							$("#d_top").fadeOut(150, function(){
								$("#media_m").fadeIn(600);
							});
						}
					});
				});

				//resizable image
				$(function(){
					$("#image_resize").resizable({  
						maxWidth: 450, 
						maxHeight: 275
					});
				});

				//Show resize UI after file selection
				$("#upload_file").live("change", function(){
					readURL(this, isVideo, file_type);

					name_str = $("#upload_file").val();
					file_type = name_str.substr( (name_str.lastIndexOf('.') +1) );
					
					
					is_supported = isSupportedFileType (file_type);
					
					if (!is_supported) {
					
						alert ('Unsupported file type: ' + file_type); 
					}
					else {

						is_video = isVideo(file_type);
						is_audio = isAudio(file_type);
						
						if(is_video){	
							$("#video_processing").fadeIn('slow');
						}
						
						else if(is_audio){
							$("#audio_processing").fadeIn('slow');
						}
						
						else{
							$("#image_processing").fadeIn('slow');
						}
					}

				});
			}

			//Author
			if($(this).attr('id') == "author"){
				$(".add_button").attr('id', 'add_author');
				window.setTimeout(function(){
					$(".tab_content").hide();
					$("#author_content").show();
				}, 200);
			}


			//Reset Add Button in the Event Editing is Occuring
			$(".update_button").fadeOut(200, function(){
				$(".add_button").fadeIn(300).css('display', 'inline-block');
			});

			$("#add_content").fadeIn(100);

	});
}

function tabHighlight(){
	$(".tab").click(function(){

		if($(this).attr('id') == 'lo'){
			$(this).animate({fontSize: '14px'}, 40).animate({fontSize: '16px'}, 40);
		}
		else{
			$(this).animate({fontSize: '18px'}, 40).animate({fontSize: '20px'}, 40);
		}
		$(this).css('color', '#fdd70f');
		$(this).siblings().css('color', '#FFF');

	});
}
