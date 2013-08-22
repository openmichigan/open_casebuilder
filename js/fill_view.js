//This file is part of Open Case Builder from University of Michigan, 
//a free open source application available at http://openmi.ch/casebuilder.

var display_num = 1;    //numbered order of question
                        //this may differ from actual creation number

var correct_answers = JSON.parse(localStorage.correct_answers);
var feedback = JSON.parse(localStorage.feedback);

$(document).ready(function() {


        var preview = JSON.parse(localStorage.builder_preview);
        var case_name = localStorage.case_name;
        try {
		saveData(correct_answers, feedback);
    	}
    	catch(e) {
		getData(correct_answers, feedback);
    	}

        $('#center_content').empty();

        //Title
        $('title').html(case_name);
        $('#center_content').append('<h1>' + case_name + "</h1></br></br>");


        for(i = 0; i < preview.length; i++){
                
                
                var element = $(preview[i]);

                if(element.hasClass('author_wrapper')) {
                        processAuthor(element);
                }


                if(element.hasClass('lo_wrapper')) {
                        processLO(element);
                }
                                
                if(element.hasClass('pat_wrapper')) {
                        processPat(element);
                }


                if(element.hasClass('text_wrapper')) {
                        processText(element);
                }


                if(element.hasClass('question_wrapper')) {
                        processQ(element);
                }


                if(element.hasClass('media_wrapper')) {
                        processMedia(element);
                }
        }
});


//FUNCTIONS

function processAuthor(element) {
        element.find('.remove').remove();
        element.find('.edit').remove();
        $('h1').after(element);
}

function processLO(element) {
        var lo_header = element.find('h2').text();
        $('#center_content').append("<h2>" + lo_header + "</h2><div id = 'break'></div>");
        var lo_list = $("<ul id = 'objectives'></ul>");
        $('#center_content').append(lo_list);

        element.find('.lo_single').each(function() {
                var li_element = $("<li>" + $(this).text() + "</li>");
                li_element.appendTo($("#objectives"));
        });
        $('#center_content').append('</br>');
}

function processPat(element) {
        var num = element.attr('id');
        num = num.substring(num.indexOf('_') + 1);
        var list_id = 'pat_list_' + num;
        $('#center_content').append("<h2>" + element.find('h2').text() + "</h2><div id = 'break'></div>");
        var pat_list = element.find('#' + list_id).clone();
        $('#center_content').append(pat_list);
        $('#center_content').append('</br>');
}

function processText(element) {
        $('#center_content').append("<h2>" + element.find('h2').text() + "</h2><div id = 'break'></div>");
		//var text = element.find('.wysiwyg_text').find('p').clone();
		var text = element.find('.wysiwyg_text').clone();
        
        if(element.find('#border_box').html()){
                text.attr('id', 'bordered');
        }

        text.attr('class', 'text');

        $('#center_content').append(text);
        $('#center_content').append('</br>');
}

function processQ(element) {

        //Fill in the blank
        if(element.hasClass('fitb_wrapper')) {
                var q_num = element.attr('id').substring(9);
                $('#center_content').append("<h2>Q" + display_num + ": " + element.find('h2').text() 
                + "</h2></br><h4>(Type Answer)</h4><div id = 'q_underline'></div></br>");

                display_num++;

                var input = $("<span class = 'fitb_" + q_num + "'><input id = 'fitb_" +  q_num
                        + "' type = 'text'/></br><input type = 'submit' value = 'Submit' />"
                        + "<div class = 'response_wrapper'><img class = 'response_c' src = '../images/right.png'/>"
                        + "<img class = 'response_i' src = '../images/wrong.png'/></div><div class = 'feedback' /></br></br></br>");

                $('#center_content').append(input);

        }

        //True False
        if(element.hasClass('tf_wrapper')) {
                var q_num = element.attr('id').substring(9);
                $('#center_content').append("<h2>Q" + display_num + ": " + element.find('h2').text() 
                + "</h2></br><h4>(Select True or False)</h4><div id = 'q_underline'></div></br>");

                display_num++;

				var tf_fb_array = [];
				
				element.find('.feedback').each(function(index) {		
					tf_fb_array.push($(this).text());
				});

                
                var true_input = "<table><tr class='tf_answer'><td valign='top'><input id = 'true_" + q_num +
					"' type = 'radio' name = 'tf_" + 
                    + q_num + "' value = '1' /></td>";
				var true_label = "<td valign='top'><label for = 'true_" + q_num + "'>True</label>" + 
					"<br/><span class='feedback' style='display:none'>" + 
					tf_fb_array[0] + 
					"</span></td></tr>";

                var false_input = "<tr class='tf_answer'><td valign='top'><input id = 'false_" + q_num + 
					"' type = 'radio' name = 'tf_" + q_num + "' value = '0' /></td>";
                var false_label = "<td valign='top'><label for = 'false_" + q_num + "'>False</label>" +
					"<br/><span class='feedback' style='display:none'>" + tf_fb_array[1] + 
					"</span></td></tr></table>";

                var submit = "";
				
				/*
				var submit = "<input type = 'submit' value = 'Submit' /><div class = 'response_wrapper'>"
                + "<img class = 'response_c' src = '../images/right.png'/><img class = 'response_i' src = '../images/wrong.png'/></div>"
                + "<div class = 'feedback' /></br></br></br>"; */

                var all_content = "<span class = 'tf_" + q_num + "'>" + true_input + true_label + false_input + false_label+"</span>";

                $('#center_content').append(all_content);

        }

        //Multiple Choice
        if(element.hasClass('mc_wrapper')) {
                var q_num = element.attr('id').substring(9);
                $('#center_content').append("<h2>Q" + display_num + ": " + element.find('h2').text() 
                + "</h2></br><h4>(Click on the Correct Answer)</h4><div id = 'q_underline'></div>");

                /*var submit = "<input type = 'submit' value = 'Submit' /><div class = 'response_wrapper'>"
                + "<img class = 'response_c' src = '../images/right.png'/><img class = 'response_i' src = '../images/wrong.png'/></div>"
                + "<div class = 'feedback' /></br></br></br>";*/
				
				var submit = "";

                display_num++;

                var mc_list = $("<span class = 'mc_" + q_num + "'><ol id = 'spaced_ul'></ol></br>" + submit + "</span>");
                $('#center_content').append(mc_list);

                var count = 1;

				var mc_fb_array = [];
				
				element.find('.feedback').each(function(index) {		
					mc_fb_array.push($(this).text());
				});


                element.find('li').each(function(index) {
                        var li_element = $("<li id = '" + count + "' class = 'mc_answer' >" + $(this).text() + "</li>");
						li_element.append("<br/><span class='feedback' style='display:none'>"+ mc_fb_array[index] + "</span");
						mc_list.find('ol').append(li_element);         
						count++
                });
        }
}

function processMedia(element) {

        if(element.find('h2').text() != '') {
                $('#center_content').append("<h2>" + element.find('h2').text() + "</h2><br />");
        }

        var media;
		if(element.find('img').length){
                media = element.find('img').clone();
                media.after("<br />");
        }
        else if(element.find('audio').length){
				media = element.find('audio').clone();
		}
		else {
                media = element.find('video').clone();
        }

        var caption = element.find('#p_caption').clone();

        if(caption.text() != ''){
                caption.after("<br />");
        }

        $('#center_content').append(media, caption);
}

function saveData(answers, feedback) {
        for(var i = 1; i < answers.length; i++) {
                var answer = $("<span></span>");
                var fb = $("<span></span>");
                
                fb.addClass('feedback').attr('id', i.toString()).css('display', 'none');
                fb.append(feedback[i][i]);
                
                answer.addClass('answer').attr('id', i.toString()).html(answers[i]).css('display', 'none');
                
                $('body').append(answer);
                $('body').append(fb);
        }
}

function getData(answers, feedback) {
        if(typeof answers === 'undefined') {
                answers = [];
                var answer_num = 1;
                $('.answer').each(function() {
                        answers[answer_num] = $(this).text();
                        answer_num++;
                });
        }
        if(typeof feedback === 'undefined') {
                feedback = [];
                var feedback_num = 1;
                $('.feedback').each(function() {
                        var individual_feedback = $(this).text().split(',');
                        feedback[feedback_num] = [];
                        for(var i = 0; i < individual_feedback.length - 1; i++) {
                                feedback[feedback_num].push(individual_feedback[i]);
                        }
                        feedback_num++;
                });
        }
}









