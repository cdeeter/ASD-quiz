$(document).ready(function(){

//question setup
function qDetails(qText, answer) {
	this.qText = qText;
	this.answer = answer;
}

var asdQuiz = new Array();
asdQuiz[0] = new qDetails("What kind of disorder is Autism?", "b");
asdQuiz[1] = new qDetails("How is Autism treated?", "d");
asdQuiz[2] = new qDetails("How prevalent is the diagnosis of Autism in the US?", "a");
asdQuiz[3] = new qDetails("Whom is Autism more common among?", "b");
asdQuiz[4] = new qDetails("What is the earliest age that an accurate diagnosis of Autism can be given?", "d");


function qAnswers(a0, a1, a2, a3) {
	this.a0 = a0;
	this.a1 = a1;
	this.a2 = a2;
	this.a3 = a3;
}

var answerList = new Array();
answerList[0] = new qAnswers("Mental disorder",
							"Developmental disorder",
							"Personality disorder",
							"Anxiety disorder");

answerList[1] = new qAnswers("Medication",
							"Behavioral therapy",
							"Occupational therapy",
							"All of the above");

answerList[2] = new qAnswers("1 in 68 children diagnosed",
							"1 in 110 children diagnosed",
							"1 in 136 children diagnosed",
							"1 in  240 children diagnosed");

answerList[3] = new qAnswers("Girls",
							"Boys",
							"No gender discrepancy",
							"No way to tell");

answerList[4] = new qAnswers("12",
							"8",
							"4",
							"2");

//global variables
var qTrack = 0;
	cTrack = 0;
	currentQuestion = 0;
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
	qTrack++;
	currentQuestion++;
	$questionNum.text("Question " + qTrack + " of " + asdQuiz.length);
		if (qTrack <= 5) {
			checkAnswer();
			$questionText.empty();
			$questionOpts.empty();
			nextQuestion();
			$answerTrack.fadeIn(800);
		} else if (qTrack > 5) {
			checkAnswer();
			$nextBtn.hide();
			$questionOpts.empty();
			$question.hide();
			$answerTrack.hide();
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
	for (var a = 0; a <= 4; a++) {
		if (userAnswer === asdQuiz[a].answer) {
			$answerCount.text(cTrack++); 
		}
	}
}

//retake quiz
$restartBtn.on('click',function(){
	var qTrack = 1;
		cTrack = 0;
		currentQuestion = 0;
	$restartBtn.hide();
	$results.hide();
	$questionNum.text("Question " + qTrack + " of " + asdQuiz.length);
	$questionText.show().text("" + asdQuiz[0].qText + "");
	$questionOpts.append("<li><input type=radio name='option' id='a'> " + answerList[currentQuestion].a0 + "</li>").append("<li><input type=radio name='option' id='b'> " + answerList[currentQuestion].a1 + "</li>").append("<li><input type=radio name='option' id='c'> " + answerList[currentQuestion].a2 + "</li>").append("<li><input type=radio name='option' id='d'> " + answerList[currentQuestion].a3 + "</li>");
	$question.fadeIn(800);
	$nextBtn.show();
})


});




	