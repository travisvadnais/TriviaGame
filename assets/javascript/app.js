$(document).ready(function () {

    //Hide the calculation Div
    $("#calculation").hide();

    
    //for each question, we'll need to run a function to compare the user's answer w/ the correct answer.
    //When time expires, we'll replace the entire Quiz Div w/ a message that says "Time's Up!  Please wait while quiz calculates"
    //This message should play for x amount of seconds and then the calculate quiz function will run
        //This is going to need some sort of failsafe against blank entries so the form doesn't error out
    //we'll need a calculateQuiz function which tallies up the correct/incorrect answers to populate to the DOM, replacing everything in the quiz div
        //This means we'll need a variable for correct & incorrect answers


    //array to hold the 'easy' questions.  Note - they're not in object notation b/c we're going to feed them through a function for formatting
    var quizQuestionsEasy = [
        new quizQuestion("Question_1", "How many installments are there in the 'Halloween' franchise?", [8, 10, 12, 14],1, "Q1"),
        new quizQuestion("Question_2", "Who played 'Baby Firefly' in 'Devil's Rejects'?", ["Sheri Moon Zombie", "Helena Bonham Carter", "Jamie Lee Curtis", "Margot Robbie"], 0, "Q2"),
        new quizQuestion("Question_3", "How many days do you have to live if you watch the tape found in 'The Ring'?", [3, 5, 7, 10], 2, "Q3"),
        new quizQuestion("Question_4", "'The Rock' starred in the movie adaptation of which horror video game?", ["Doom", "Resident Evil", "Silent Hill", "House of the Dead"], 0, "Q4"),
        new quizQuestion("Question_5", "Which installment of the Indiana Jones series featured voodoo magic as a thematic device?", ["Raiders of the Lost Ark", "Temple of Doom", "The Last Crusade", "Kingdom of the Crystal Skull"], 1, "Q5"),
        new quizQuestion("Question_6", "Who was the antagonist in the 'Hellraiser' series?", ["Colossus", "Pinhead", "The Collector", "Pyramid Head"], 1, "Q6"),
        new quizQuestion("Question_7", "What is the name of the 2nd installment in the Blair Witch trilogy?", ["Book of Shadows", "Book of Secrets", "Book of Spells", "Book of Spirits"], 0, "Q7"),
        new quizQuestion("Question_8", "In the 'Evil Dead' series, Ash loses his hand and replaces it with what instrument?", ["Guitar", "Machine Gun", "Machete", "Chainsaw"], 3, "Q8"),
        new quizQuestion("Question_9", "What was Haley Joe Osmont's 'Sixth Sense'?", ["Telepathy", "Time Travel", "Truth Serum", "Seeing the Dead"], 3, "Q9"),
        new quizQuestion("Question_10", "Which film is most likely to make you avoid going to the beach?", ["It", "Children of the Corn", "Jaws", "Cujo"], 2, "Q10")
    ];
    //array to hold the 'hard' questions
    var quizQuestionsHard = [
        new quizQuestion("Question_1", "Tobin Bell, who is best known for his role as 'Jigsaw' in the 'Saw' franchise, played a record store owner in one episode of which popular 90's sitcom?", ["Friends", "Step-by-Step", "Seinfeld", "Frasier"], 2, "Q1"),
        new quizQuestion("Question_2", "The Tales from the Crypt TV Series produced two big-screen theatrical releases.  What was the title of the little-known third installment?", ["House of 1,000 Corpses", "Sanctuary", "Nine Lives", "Ritual"], 3, "Q2"),
        new quizQuestion("Question_3", "In films depicting demonic possession, which language do the demons typically speak when communicating through their human hosts?", ["Greek", "Aramaic", "Gaelic", "Latin"], 3, "Q3"),
        new quizQuestion("Question_4", "In 'Tales from the Crypt: Demon Knight', which substance fills the ancient key?", ["Blood", "Poison", "Fire", "Holy Water"], 0, "Q4"),
        new quizQuestion("Question_5", "In Will Smith's 'I Am Legend', what was the most effective weapon against the 'zombies'?", ["Sunlight", "Holy Water", "Fire", "Bombs"], 0, "Q5"),
        new quizQuestion("Question_6", "Complete this sentence from 'The Shining' with Jack Nicholson:  All work and no play makes Jack _  _ _ _ _  _ _ _ ", ["A Huge Bum", "A Dull Boy", "A Dead Man", "A Dumb Guy"], 1, "Q6"),
        new quizQuestion("Question_7", "Which of these films was NOT of the 'Found Footage' variety?", ["The Blair Witch Project", "Cloverfield", "Stigmata", "Quarantine"], 2, "Q7"),
        new quizQuestion("Question_8", "In the film adaptation of Stephen King's 'Misery', which tool did Kathy Bates use to make sure Paul Sheldon did not escape?", ["Chainsaw", "Barbed Wire", "Super Glue", "Sledgehammer"], 3, "Q8"),
        new quizQuestion("Question_9", "What was the pet cat's name in Pet Sematary?", ["Furball", "Church", "Salem", "Shadow"], 1, "Q9"),
        new quizQuestion("Question_10", "In the 1990 movie 'Tremors' with Kevin Bacon, what alerted the giant worms to the characters' whereabouts?", ["Smell of Barbecue", "Radio Waves", "Microwaves", "Vibrations"], 3, "Q10")
    ];

    //variable used for the timer/countdown
    var timer;

    //Arrays to hold the actual correct answers and user's quiz answers
    var correctAnswers = [];
    var userAnswers = [];
    

    //Answer counters
    var answersCorrect = 0;
    var answersWrong = 0;
    
    //This function formats the questions for us.  Instead of following object notation for 20 questions, we can use the function to format them for us just by feeding it inputs (which are the 'new' items above)
    function quizQuestion(questionNumber, question, choices, correctAnswer, name) {
        this.questionNumber = questionNumber;
        this.question = question;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
        this.name = name;
    }

    //Click the button to start the game.  This will run the setup function and star the timer
    $("#startGame").click(function() {
        startTimer();
        setupGame();
    });
    
    //This function is for the timer that will display
    function startTimer () {
        timer = setInterval(countDown, 1000);

        //declare the counter variable
        var n = 121;

        function countDown(){
            //first, we'll decrement the counter by 1
            n--;
            //Then we'll make sure the counter is still above 1 and log the current value to the DOM
            if(n > 0) {
                console.log(n);
                $("#gameTimer").text("Time Remaining: " + (n - 1));
            }   
            //if countdown reaches 0, we'll run the endGame function
            else if (n < 1) {
                alert("Time's Up!  Press 'OK' to See Your Score");
                endGame();
            }     
        }
    }
    
    function setupGame() {
        //first we need to add a div for each question
        for (var i = 0; i < quizQuestionsEasy.length; i++) {
            $(".gameBoard").append("<div id=" + quizQuestionsEasy[i].questionNumber + "><p>Question "+ (i+1) + ":" + "</p></div>");
            correctAnswers.push(quizQuestionsEasy[i].correctAnswer);
            //call next function to add the question to each div
            addQuestion(quizQuestionsEasy[i].questionNumber, quizQuestionsEasy[i].question);
            addChoices(quizQuestionsEasy[i].questionNumber, quizQuestionsEasy[i].choices, quizQuestionsEasy[i].name);
        }
        //This adds a submit button at the bottom of the quiz to finish
        $(".gameBoard").append("<button type='button' class='btn btn-success' id='gameOver'>I'm Finished!</button>");
        //Clear some stuff out of the jumbotron
        $("p.swap-button").empty();
        $("p.clickInstruct").empty();
        $("div.buffer").remove();
        //Add the timer to the jumbotron
        $("p.swap-button").append("<div id='gameTimer'></div>")

    };

    //function takes inputs of the question number(div ID) & question itself
    function addQuestion(qNum, q) {
        //need to declare this variable to hold the name of the div
        var divIdName = "div#" + qNum;
        //target the div and append an h4 w/ the question
        $(divIdName).append("<h4>" + q + "</h4>");
        $(divIdName).append("<form id=" + qNum + "></form");
    }

    //function takes inputs of the question number(div ID) & question choices.  This will append radio buttons to each question.
    function addChoices(qNum, choices, qName) {
        //declaring a local variable to store the Form ID from the above function
        var formIdName = "form#" + qNum;
        //set up a loop to loop through the questionChoices and add a radio button for each
        for (var i = 0; i < choices.length; i++) {
            $("<label><input type='radio' name=" + qName + " value=" + ( i + 1) + ">"+ choices[i] + "</label>").appendTo(formIdName);
        }
    }

    $(document).on('click', '#gameOver', function() {
        window.scroll(0,0);
        endGame();
    });

    function endGame() {
        //game ends, shut off timer
        clearInterval(timer);
        //hide the game board
        $(".gameBoard").hide();
        //scroll to top
        window.scroll(0,0);
        //show the calculation screen
        $("#calculation").show();
        //get the user's answers by running a loop through the questions and pushing their answers into the 'userAnswers' array
        for (var i = 0; i < quizQuestionsEasy.length; i++) {
            var userInput = $('input[name=Q' + (i + 1) + ']:checked').val();
            userAnswers.push(userInput - 1);
        }
        tallyScore();
    }

    function tallyScore() {
        //Run a loop through each answer and compare it to the correctAnswer in the quizQuestion Array.  Increment accordingly.
        for (var i = 0; i < quizQuestionsEasy.length; i++) {
            if (userAnswers[i] === correctAnswers[i]) {
                answersCorrect++;
            }
            else {
                answersWrong++;
            }
        }
        var tally = ((answersCorrect / quizQuestionsEasy.length) * 100);
        $("#correctAnswers").text(answersCorrect);
        $("#incorrectAnswers").text(answersWrong);
        $("#finalScore").text(tally + "%");
    }    

});
