/* - The app must lead the user through a set of questions.
   - The user should only see one question at a time, with new answers presented
		only after they have answered the current one.
   - Users should be able to to input their answer to each question, with
		radio buttons or some other appropriate interface.
   - When the user answers the last question, the app should show his or her
   		overall score.
   - Each question should be stored as a JavaScript object, and you’ll probably want
   		to store your list of questions in an array.

If you are feeling particularly ambitious, consider implementing the
	following features:
	- Let the user know where in the quiz they are at each step (i.e. “Question 3 of 5")
	- Let the user know their score so far
	- Let the user know if their previous response was correct*/



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
asdQuiz[3] = new qDetails(3, "Whom is ASD more common among?");
asdQuiz[4] = new qDetails(4, "What is the earliest age that an accurate diagnosis of ASD can be given?");

function qAnswers(a0, a1, a2, a3, corrAns) {
	this.a0 = a0;
	this.a1 = a1;
	this.a2 = a2;
	this.a3 = a3;
	this.corrAns = corrAns;
}

var answerList = new Array();
answerList[0] = new qAnswers("<li><input type=radio name='option' class='0'> (a) Mental disorder </li>", "<li><input type=radio name='option' class='1'> (b) Developmental disorder </li>", "<li><input type=radio name='option' class='2'>  (c) Personality disorder</li>", "<li><input type=radio name='option' class='3'> (d) Anxiety disorder</li>", 1);
answerList[1] = new qAnswers("<li><input type=radio name='option' class='0'> (a) Medication </li>", "<li><input type=radio name='option' class='1'> (b) Behavioral therapy</li>", "<li><input type=radio name='option' class='2'> (c) Occupational therapy</li>", "<li><input type=radio name='option' class='3'> (d) All of the above</li>", 3);
answerList[2] = new qAnswers("<li><input type=radio name='option' class='0'> (a) 1 in 68 children diagnosed</li>", "<li><input type=radio name='option' class='1'> (b) 1 in 110 children diagnosed</li>", "<li><input type=radio name='option' class='2'> (c) 1 in 136 children diagnosed</li>", "<li><input type=radio name='option' class='3'> (d) 1 in  240 children diagnosed</li>", 0);
answerList[3] = new qAnswers("<li><input type=radio name='option' class='0'> (a) Girls</li>", "<li><input type=radio name='option' class='1'> (b) Boys</li>", "<li><input type=radio name='option' class='2'> (c) No gender discrepancy</li>", "<li><input type=radio name='option' class='3'>(d) No way to tell</li>", 1);
answerList[4] = new qAnswers("<li><input type=radio name='option' class='0'> (a) 12</li>", "<li><input type=radio name='option' class='1'> (b) 8</li>", "<li><input type=radio name='option' class='2'> (c) 4</li>", "<li><input type=radio name='option' class='3'> (d) 2</li>", 3);


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
	$questionOpts.append("" + answerList[0].a0 + "").append("" + answerList[0].a1 + "");
});



//get answer
function checkAnswer(){
	var $userAnswer = document.getElementsByName("option");
    for(var i=0; i<answerList.length; i++){

      if($userAnswer.checked){
        $userAnswer = option[i].value; 
      }

      if ($userAnswer === answerList[i].corrAns) {
      		corrTrack++;
			$answerCount.text("" + corrTrack + "");
      	}
    }
}
 


//next question
$nextBtn.on('click',function() {
	qTrack++;
	currentQuestion++;
	$questionNum.text("Question " + qTrack + " of " + asdQuiz.length);
		for (var i = 1; i <= 5; i++) {
			if (qTrack <= 5) {
				$questionText.empty();
				$questionOpts.empty();
				nextQuestion();
				checkAnswer();
				$answerTrack.fadeIn(800); 

			} else if (qTrack === 6) {
				$nextBtn.remove();
				$answerTrack.hide();
				checkAnswer();
				$question.hide();
				$results.show();
				$restartBtn.show();
			} 
	}
});

//load questions
var nextQuestion = function() {
	$questionText.text("" + asdQuiz[currentQuestion].qText + "");
	$questionOpts.append("" + answerList[currentQuestion].a0 + "").append("" + answerList[currentQuestion].a1 + "").append("" + answerList[currentQuestion].a2 + "").append("" + answerList[currentQuestion].a3 + "");
}


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


	