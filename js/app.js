/*
//get answer
function checkAnswer(){
	var userAnswer = $("input:radio[name='option']:checked");
	var answerCheck = $(userAnswer).attr('id');
    for(var i=0; i <= answerList.length; i++){

      if (+answerCheck+ === answerList[i].corrAns) {
      		corrTrack++;
      	}
    }
}



$("input:radio[name='option']:checked").on("click",function(){
	var userAnswer = $(this).attr('name');
 	var correct = getElementsByName('optionCorr');
 	if (""+userAnswer+"" == ""+correct+"") {
 		corrTrack++;
 	}
});


function checkAnswer(){
	var userAnswer = $("input:radio[name='option']:checked");
	var correct = $(userAnswer).attr('id');
	if ((userAnswer).val() == "optionCorr") {
		corrTrack++;
	}
}
*/


$(document).ready(function(){

//question setup
function qDetails(qID, qText) {
	this.qID = qID;
	this.qText = qText;
}

var asdQuiz = new Array();
asdQuiz[0] = new qDetails(0, "What kind of disorder is Autism?");
asdQuiz[1] = new qDetails(1, "How is Autism treated?");
asdQuiz[2] = new qDetails(2, "How prevalent is the diagnosis of Autism in the US?");
asdQuiz[3] = new qDetails(3, "Whom is Autism more common among?");
asdQuiz[4] = new qDetails(4, "What is the earliest age that an accurate diagnosis of Autism can be given?");

function qAnswers(a0, a1, a2, a3, corrAns) {
	this.a0 = a0;
	this.a1 = a1;
	this.a2 = a2;
	this.a3 = a3;
	this.corrAns = corrAns;
}

var answerList = new Array();
answerList[0] = new qAnswers("<li><input type=radio name='option' id='1a' value='(a) Mental disorder '> (a) Mental disorder </li>",
							"<li><input type=radio name='optionCorr' id='1b' value='(b) Developmental disorder'> (b) Developmental disorder</li>",
							"<li><input type=radio name='option' id='1c' value='(c) Personality disorder'> (c) Personality disorder</li>",
							"<li><input type=radio name='option' id='1d' value='(d) Anxiety disorder'> (d) Anxiety disorder</li>", "1a");

answerList[1] = new qAnswers("<li><input type=radio name='option' id='2a' value='(a) Medication'> (a) Medication</li>",
							"<li><input type=radio name='option' id='2b' value='(b) Behavioral therapy'> (b) Behavioral therapy</li>",
							"<li><input type=radio name='option' id='2c' value='(c) Occupational therapy'> (c) Occupational therapy</li>",
							"<li><input type=radio name='optionCorr' id='2d' value='(d) All of the above'> (d) All of the above</li>", "2d");

answerList[2] = new qAnswers("<li><input type=radio name='optionCorr' id='3a' value='(a) 1 in 68 children diagnosed'> (a) 1 in 68 children diagnosed</li>",
							"<li><input type=radio name='option' id='3b' value='(b) 1 in 110 children diagnosed'> (b) 1 in 110 children diagnosed</li>",
							"<li><input type=radio name='option' id='3c' value='(c) 1 in 136 children diagnosed'> (c) 1 in 136 children diagnosed</li>",
							"<li><input type=radio name='option' id='3d' value='(d) 1 in  240 children diagnosed'> (d) 1 in  240 children diagnosed</li>", "3a");

answerList[3] = new qAnswers("<li><input type=radio name='option' id='4a' value='(a) Girls'> (a) Girls</li>",
							"<li><input type=radio name='optionCorr' id='4b' value='(b) Boys'> (b) Boys</li>",
							"<li><input type=radio name='option' id='4c' value='(c) No gender discrepancy'> (c) No gender discrepancy</li>",
							"<li><input type=radio name='option' id='4d' value='(d) No way to tell'>(d) No way to tell</li>", "4b");

answerList[4] = new qAnswers("<li><input type=radio name='option' id='5a' value='(a) 12'> (a) 12</li>",
							"<li><input type=radio name='option' id='5b' value='(b) 8'> (b) 8</li>",
							"<li><input type=radio name='option' id='5c' value='(c) 4'> (c) 4</li>",
							"<li><input type=radio name='optionCorr' id='5d' value='(d) 2'> (d) 2</li>", "5d");


//global variables
var qTrack = 0;
	corrTrack = 0;
	currentQuestion = 0;
	$quiz = $("#quizBody");
	$intro = $(".intro");
	$question = $(".question");
	$questionNum = $(".qNum");
	$questionText = $("#quizQuestion");
	$questionOpts = $(".qOptions");
	$answerCount = $(".answerCount");
	$answerTrack = $(".answerTrack");
	$startBtn = $("#startBtn");
	$nextBtn = $("#nextBtn");
	$restartBtn = $("#restartBtn")
	$results = $(".results");



//begin quiz
$startBtn.on('click',function(){
	qTrack++;
	$intro.hide();
	$nextBtn.show();
	$question.fadeIn(800);
	$questionNum.text("Question " + qTrack + " of " + asdQuiz.length);
	$questionText.show().text("" + asdQuiz[0].qText + "");
	$questionOpts.append("" + answerList[currentQuestion].a0 + "").append("" + answerList[currentQuestion].a1 + "").append("" + answerList[currentQuestion].a2 + "").append("" + answerList[currentQuestion].a3 + "");
});





//next question
$nextBtn.on('click',function() {
	qTrack++;
	currentQuestion++;
	$questionNum.text("Question " + qTrack + " of " + asdQuiz.length);
		for (var i = 1; i <= 5; i++) {
			if (qTrack <= 5) {
				//checkAnswer();
				$questionText.empty();
				$questionOpts.empty();
				nextQuestion();
				$answerCount.text("" + corrTrack + "");
				$answerTrack.fadeIn(800); 

			} else if (qTrack === 6) {
				//checkAnswer();
				$answerCount.text("" + corrTrack + "");
				$nextBtn.hide();
				$answerTrack.hide();
				$question.hide();
				$results.show();
				$restartBtn.show();
				$questionOpts.empty();
			} 
	}
});

//load questions
var nextQuestion = function() {
	$questionText.text("" + asdQuiz[currentQuestion].qText + "");
	$questionOpts.append("" + answerList[currentQuestion].a0 + "").append("" + answerList[currentQuestion].a1 + "").append("" + answerList[currentQuestion].a2 + "").append("" + answerList[currentQuestion].a3 + "");
}


//retake quiz
$restartBtn.on('click',function(){
	var qTrack = 1;
		corrTrack = 0;
		currentQuestion = 0;
	$restartBtn.hide();
	$results.hide();
	$questionNum.text("Question " + qTrack + " of " + asdQuiz.length);
	$questionText.show().text("" + asdQuiz[0].qText + "");
	$questionOpts.append("" + answerList[currentQuestion].a0 + "").append("" + answerList[currentQuestion].a1 + "").append("" + answerList[currentQuestion].a2 + "").append("" + answerList[currentQuestion].a3 + "");
	$question.fadeIn(800);
	$nextBtn.show();
})


});






/*Load question and choices
	function loadQuestion() {
		$quiz.empty();
		$answers.empty();
		$quiz.append('<p>' + allQuestions[current].question + '</p>');
		for (var i = 0; i <= 3; i++) {
			document.getElementById('answers').innerHTML += '<input type="radio" name="choice" value='+i+'>' + allQuestions[currentQuestion].qChoices[i] + '<br/>';
		}
	}




	Questions  
	ID    Question    CorrectAnswer ID
	1     blah blah     2
	2	  sdfsdf	    1	

	Answers
	QuestionId   Answer ID   Answer
	1			 1			 blah blah
	1			 2 			 sdfjsff

	User
	QuestionId   HisAnswerID   Correct
			1			1		False

	if(question[x]["correctanswerid"]==Answers[y]["AnswerID"])
	if(question[x]["questiodid"]==userresponses[y]["questionID"])
		if(userresponses[y]["answerid"]==questions[x]["correctanswer"])
			userresponses[y]["correct"]=true
			else 
			userresponses[y]["correct"]




	*/


	