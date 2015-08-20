$(document).ready(function(){
    //global variables
    var questionNum = 0,
        correctAnswers = 0,
        intro = $(".intro"),
        question = $(".question"),
        questionTracker = $(".qNum"),
        questionText = $("#quizQuestion"),
        questionOpts = $(".qOptions"),
        answerCount = $(".answerCount"),
        answerInfo = $(".answerInfo"),
        answer = $(".answer"),
        startBtn = $("#startBtn"),
        nextBtn = $("#nextBtn"),
        restartBtn = $("#restartBtn"),
        quizEnd = $(".end"),
        result = $(".result"),
        questionList = {
            items: [
                {
                    question: "What kind of disorder is Autism?",
                    options: [
                        {choice: "Mental disorder"},
                        {choice: "Developmental disorder"},
                        {choice: "Personality disorder"},
                        {choice: "Anxiety disorder"}
                    ],
                    correctAnswer: {
                        choice: "Developmental disorder",
                        explanation: "Autism is classified as a developmental disorder because it impacts the way the brain develops and functions. It often results in characteristics such as social deficits, repetitive behaviors (\"stimming\"), hypersensitivity to light, textures, sounds, etc., and verbal communication issues."
                    }
                },
                {
                    question: "How is Autism treated?",
                    options: [
                        {choice: "Medication"},
                        {choice: "Behavioral (ABA) therapy"},
                        {choice: "Occupational therapy"},
                        {choice: "All of the above"}
                    ],
                    correctAnswer: {
                        choice: "All of the above",
                        explanation: "Autism is usually treated using a variety of methods, including (but not limited to) behavioral thearpy, medication, occupational therapy, and speech therapy. The earlier treatment is started, the bigger impact it is more likely to make, especially with treatment forms such as behavioral therapy. Treatments vary greatly based on the needs of the individual."
                    }
                },
                {
                    question: "How prevalent is the diagnosis of Autism in the US?",
                    options: [
                        {choice: "1 in 68 children diagnosed"},
                        {choice: "1 in 110 children diagnosed"},
                        {choice: "1 in 136 children diagnose"},
                        {choice: "1 in  240 children diagnosed"}
                    ],
                    correctAnswer: {
                        choice: "1 in 68 children diagnosed",
                        explanation: "The most current statistic is 1 in 68 children are diagnosed with Autism Spectrum Disorder. It has increased by 119% since 2000! There are theories about why there's been such a surge in prevalence, but the reason is still largely unknown."
                    }
                },
                {
                    question: "Whom is Autism more common among?",
                    options: [
                        {choice: "Girls"},
                        {choice: "Boys"},
                        {choice: "No gender discrepancy"},
                        {choice: "No way to tell"}
                    ],
                    correctAnswer: {
                        choice: "Boys",
                        explanation: "Autism is about 5 times more common in boys (1 in 42) than in girls (1 in 189)."
                    }
                },
                {
                    question: "Does Autism manifest in the same way for all individuals who are affected by it?",
                    options: [
                        {choice: "Yes"},
                        {choice: "No"},
                        {choice: "Mostly"},
                        {choice: "Not sure"}
                    ],
                    correctAnswer: { 
                        choice: "No",
                        explanation: "Autism is a spectrum disorder, so the impact on the individual can vary a lot. Some individuals may be deeply impacted and need assistance doing day-to-day activities. Other individuals are more \"high functioning\", and their symptoms may not be noticeable to those who are unaware of their diagnosis."
                    }
                }
            ]
        };
    
    //loop through questions, displaying 1 at a time on the dom
    var questionSource = "<p>{{question}}</p>";
    var template = Handlebars.compile(questionSource);
    questionText.empty().append(template({question: questionList.items[questionNum].question}));
    
    var answerSource = $("#answers-template").html();
    var answerTemplate = Handlebars.compile(answerSource);
    questionOpts.empty().append(answerTemplate(questionList.items[questionNum]));
    
    //begin quiz
    startBtn.on('click',function(){
        intro.hide();
        questionTracker.text(questionNum+1);
        question.fadeIn(600);
        delayAnswers(500);
    });

    //get answer
    questionOpts.on("click", "li", function() {
        var selectedAnswer = $(this).text(),
            correctAnswer = questionList.items[questionNum].correctAnswer.choice,
            answerKeySource = "<p>{{answer}}</p>",
            answerKeyTemplate = Handlebars.compile(answerKeySource);
        if (selectedAnswer === correctAnswer) {
            result.text("Correct!");
            correctAnswers++;
        } else {
            result.html("Incorrect. The correct answer is: <br/>"+correctAnswer);
        }
        answerCount.text(correctAnswers);
        question.hide();
        answerInfo.empty().append(answerKeyTemplate({answer: questionList.items[questionNum].correctAnswer.explanation}));
        answer.fadeIn();
    });

    //next question
    nextBtn.on("click",function() {
        questionNum++;
        if (questionNum === 4) {
            nextBtn.text("End Quiz");
        }
        if (questionNum <= 4) {
            questionTracker.empty().text(questionNum+1);
            questionText.empty().append(template({question: questionList.items[questionNum].question}));
            questionOpts.empty().append(answerTemplate(questionList.items[questionNum]));
            answer.hide();
            question.fadeIn(600);
            delayAnswers(500);
        } else {
            if (correctAnswers === 5) {
                var report = "Great job! You got "+correctAnswers+" questions right. You knew a lot!";
            } else if (correctAnswers >= 3 && correctAnswers < 5) {
                var report = "Nice going! You got "+correctAnswers+" questions right. Kudos!";
            } else {
                var report = "Nice try, but you only got "+correctAnswers+" questions right. Maybe this is something you should learn more about!";
            }
            $(".report").text(report);
            answer.hide();
            quizEnd.fadeIn();
        }
    });
    
    //restart quiz
    restartBtn.click(function() {
        nextBtn.text("Next Question");
        questionNum = 0;
        correctAnswers = 0;
        questionTracker.empty().text(questionNum+1);
        questionText.empty().append(template({question: questionList.items[questionNum].question}));
        questionOpts.empty().append(answerTemplate(questionList.items[questionNum]));
        quizEnd.hide();
        question.fadeIn(600);
        delayAnswers(500);
    });

    function delayAnswers(delayTime) {
        $.each($(".qOptions li"), function() {
            $(this).delay(delayTime).fadeIn(800);
            delayTime+=800;
        });
    };


});