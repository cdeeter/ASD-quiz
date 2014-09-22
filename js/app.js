$(document).ready(function(){

//question setup
function qDetails(qText) {
	this.qText = qText;
}

var asdQuiz = new Array();
asdQuiz[0] = new qDetails("What kind of disorder is Autism?");
asdQuiz[1] = new qDetails("How is Autism treated?");
asdQuiz[2] = new qDetails("How prevalent is the diagnosis of Autism in the US?");
asdQuiz[3] = new qDetails("Whom is Autism more common among?");
asdQuiz[4] = new qDetails("What is the earliest age that an accurate diagnosis of Autism can be given?");


function qAnswers(a0, a1, a2, a3, answer) {
	this.a0 = a0;
	this.a1 = a1;
	this.a2 = a2;
	this.a3 = a3;
	this.answer = answer;
}

var answerList = new Array();
answerList[0] = new qAnswers("Mental disorder",
							"Personality disorder",
							"Developmental disorder",
							"Anxiety disorder",
							 "c");

answerList[1] = new qAnswers("Medication",
							"Behavioral therapy",
							"Occupational therapy",
							"All of the above",
							"d");

answerList[2] = new qAnswers("1 in 68 children diagnosed",
							"1 in 110 children diagnosed",
							"1 in 136 children diagnosed",
							"1 in  240 children diagnosed",
							"a");

answerList[3] = new qAnswers("Girls",
							"Boys",
							"No gender discrepancy",
							"No way to tell",
							"b");

answerList[4] = new qAnswers("2",
							"4",
							"6",
							"8",
							"a");

//global variables
var qTrack = 0;
	cTrack = 0;
	currentQuestion = 0;
	current = 0;
	$quiz = $("#quizBody");
	$intro = $(".intro");
	$question = $(".question");
	$questionNum = $(".qNum");
	$questionText = $("#quizQuestion");
	$questionOpts = $(".qOptions");
	$answerCount = $(".answerCount");
	$answerTrack = $("#answerTrack");
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
	$questionOpts.append("<li><input type=radio name='option' id='a'> " + answerList[currentQuestion].a0 + "</li>").append("<li><input type=radio name='option' id='b'> " + answerList[currentQuestion].a1 + "</li>").append("<li><input type=radio name='option' id='c'> " + answerList[currentQuestion].a2 + "</li>").append("<li><input type=radio name='option' id='d'> " + answerList[currentQuestion].a3 + "</li>");
});



//next question
$nextBtn.on('click',function() {
		if (current < 4) {
			checkAnswer();
			$answerCount.text(cTrack); 
			$questionText.empty();
			$questionOpts.empty();
			nextQuestion();
			$answerTrack.fadeIn(800);
		} else {
			checkAnswer();
			$nextBtn.hide();
			$questionOpts.empty();
			$question.hide();
			$answerTrack.hide();
			$answerCount.text(""+cTrack+"");
			$results.show();
			$restartBtn.show();
			qTrack = 1;
	} 
});

//load questions
var nextQuestion = function() {
	$questionText.text("" + asdQuiz[currentQuestion].qText + "");
		$questionOpts.append("<li><input type=radio name='option' id='a'> " + answerList[currentQuestion].a0 + "</li>").append("<li><input type=radio name='option' id='b'> " + answerList[currentQuestion].a1 + "</li>").append("<li><input type=radio name='option' id='c'> " + answerList[currentQuestion].a2 + "</li>").append("<li><input type=radio name='option' id='d'> " + answerList[currentQuestion].a3 + "</li>");
	}

//check answer
var checkAnswer = function() {
	var userAnswer = $("input:radio[name='option']:checked").attr('id');
	if (userAnswer === undefined) {
		alert("Please select an answer!");
		$nextBtn.disabled();
	} else if (userAnswer == answerList[current].answer) {
		cTrack++;
		currentQuestion++;
		qTrack++;
		current++;
		$questionNum.text("Question " + qTrack + " of " + asdQuiz.length);
	} else if (userAnswer != answerList[current].answer) {
		currentQuestion++;
		qTrack++;
		current++;
		$questionNum.text("Question " + qTrack + " of " + asdQuiz.length);
	} 
}

//retake quiz
$restartBtn.on('click',function(){
	var qTrack = 1;
		cTrack = 0;
		currentQuestion = 0;
		current = 0;
	$restartBtn.hide();
	$results.hide();
	$questionNum.text("Question " + qTrack + " of " + asdQuiz.length);
	$questionText.show().text("" + asdQuiz[0].qText + "");
	$questionOpts.append("<li><input type=radio name='option' id='a'> " + answerList[currentQuestion].a0 + "</li>").append("<li><input type=radio name='option' id='b'> " + answerList[currentQuestion].a1 + "</li>").append("<li><input type=radio name='option' id='c'> " + answerList[currentQuestion].a2 + "</li>").append("<li><input type=radio name='option' id='d'> " + answerList[currentQuestion].a3 + "</li>");
	$question.fadeIn(800);
	$nextBtn.show();
})


});




	