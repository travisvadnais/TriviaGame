$(document).ready(function () {
    
    //We'll need an array of objects.  Each object will contain "question: "; "answers: "; and "correct answer: ";
        //We're going to use a function to create the objects.  Example in Images folder
    //for each object.answer, we'll need a radio button option.  This needs to be dynamic so if there are 4 answers, 4 radio buttons populate.  If there are 2 answers, 2 radio buttons populate, etc.  Probably need a for loop or a for each function
    //for each question, we'll need to run a function to compare the user's answer w/ the correct answer.
    //We'll need to set a timer that counts down from xx:xx
    //When time expires, we'll replace the entire Quiz Div w/ a message that says "Time's Up!  Please wait while quiz calculates"
    //This message should play for x amount of seconds and then the calculate quiz function will run
        //This is going to need some sort of failsafe against blank entries so the form doesn't error out
    //we'll need a calculateQuiz function which tallies up the correct/incorrect answers to populate to the DOM, replacing everything in the quiz div
        //This means we'll need a variable for correct & incorrect answers


    //In the HTML, we'll need an empty 'Quiz' div.  Here we're going to add a new div for every question.  This will be dynamic.  We're going to use JQuery to push the new question div to the div, and it will be with a FOR EACH loop

    //array to hold the 'easy' questions.  Note - they're not in object notation b/c we're going to feed them through a function for formatting
    var quizQuestionsEasy = [
        new quizQuestion("Question_1", "How many installments are there in the 'Halloween' franchise?", [8, 10, 12, 14], 1),
        new quizQuestion("Question_2", "Who played 'Baby Firefly' in 'Devil's Rejects'?", ["Sheri Moon Zombie", "Helena Bonham Carter", "Jamie Lee Curtis", "Margot Robbie"], 0),
        new quizQuestion("Question_3", "How many days do you have to live if you watch the tape found in 'The Ring'?", [3, 5, 7, 10], 2),
        new quizQuestion("Question_4", "'The Rock' starred in the movie adaptation of which horror video game?", ["Doom", "Resident Evil", "Silent Hill", "House of the Dead"], 0),
        new quizQuestion("Question_5", "Which installment of the Indiana Jones series featured voodoo magic as a thematic device?", ["Raiders of the Lost Ark", "Temple of Doom", "The Last Crusade", "Kingdom of the Crystal Skull"], 1),
        new quizQuestion("Question_6", "Who was the antagonist in the 'Hellraiser' series?", ["Colossus", "Pinhead", "The Collector", "Pyramid Head"], 1),
        new quizQuestion("Question_7", "What is the name of the 2nd installment in the Blair Witch trilogy?", ["Book of Shadows", "Book of Secrets", "Book of Spells", "Book of Spirits"], 0),
        new quizQuestion("Question_8", "In the 'Evil Dead' series, Ash loses his hand and replaces it with what instrument?", ["Guitar", "Machine Gun", "Machete", "Chainsaw"], 3),
        new quizQuestion("Question_9", "What was Haley Joe Osmont's 'Sixth Sense'?", ["Telepathy", "Time Travel", "Truth Serum", "Seeing the Dead"], 3),
        new quizQuestion("Question_10", "Which film is most likely to make you avoid going to the beach?", ["It", "Children of the Corn", "Jaws", "Cujo"], 2)
    ];
    //array to hold the 'hard' questions
    var quizQuestionsHard = [
        new quizQuestion("Question_1", "Tobin Bell, who is best known for his role as 'Jigsaw' in the 'Saw' franchise, played a record store owner in one episode of which popular 90's sitcom?", ["Friends", "Step-by-Step", "Seinfeld", "Frasier"], 2),
        new quizQuestion("Question_2", "The Tales from the Crypt TV Series produced two big-screen theatrical releases.  What was the title of the little-known third installment?", ["House of 1,000 Corpses", "Sanctuary", "Nine Lives", "Ritual"], 3),
        new quizQuestion("Question_3", "In films depicting demonic possession, which language do the demons typically speak when communicating through their human hosts?", ["Greek", "Aramaic", "Gaelic", "Latin"], 3),
        new quizQuestion("Question_4", "In 'Tales from the Crypt: Demon Knight', which substance fills the ancient key?", ["Blood", "Poison", "Fire", "Holy Water"], 0),
        new quizQuestion("Question_5", "In Will Smith's 'I Am Legend', what was the most effective weapon against the 'zombies'?", ["Sunlight", "Holy Water", "Fire", "Bombs"], 0),
        new quizQuestion("Question_6", "Complete this sentence from 'The Shining' with Jack Nicholson:  All work and no play makes Jack _  _ _ _ _  _ _ _ ", ["A Huge Bum", "A Dull Boy", "A Dead Man", "A Dumb Guy"], 1),
        new quizQuestion("Question_7", "Which of these films was NOT of the 'Found Footage' variety?", ["The Blair Witch Project", "Cloverfield", "Stigmata", "Quarantine"], 2),
        new quizQuestion("Question_8", "In the film adaptation of Stephen King's 'Misery', which tool did Kathy Bates use to make sure Paul Sheldon did not escape?", ["Chainsaw", "Barbed Wire", "Super Glue", "Sledgehammer"], 3),
        new quizQuestion("Question_9", "What was the pet cat's name in Pet Sematary?", ["Furball", "Church", "Salem", "Shadow"], 1),
        new quizQuestion("Question_10", "In the 1990 movie 'Tremors' with Kevin Bacon, what alerted the giant worms to the characters' whereabouts?", ["Smell of Barbecue", "Radio Waves", "Microwaves", "Vibrations"], 3),
    ]
    //This function formats the questions for us.  Instead of following object notation for 20 questions, we can use the function to format them for us just by feeding it inputs (which are the 'new' items above)
    function quizQuestion(questionNumber, question, choices, correctAnswer) {
        this.questionNumber = questionNumber;
        this.question = question;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
    }

    $("#startGame").click(function() {
        startTimer();
        setupGame();
    });
    
    //This function is for the timer that will display
    function startTimer () {
        //declare the counter variable
        var n = 90;
        //This function says "Every one second, complete the 'countDown' function"
        setTimeout(countDown, 1000);
        function countDown(){
            //first, we'll decrement the counter by 1
            n--;
            //Then we'll make sure the counter is still above 1 and, if not, run the function again
            if(n > 0) {
                setTimeout(countDown, 1000);
            }
            console.log(n);
        }
    }
    
    function setupGame() {
        //first we need to add a div for each question
        for (var i = 0; i < quizQuestionsEasy.length; i++) {
            $(".jumbotron").append("<div id=" + quizQuestionsEasy[i].questionNumber + ">Question "+ (i+1) + ":" + "</div>");
        
            //call next function to add the question to each div
            addQuestion(quizQuestionsEasy[i].questionNumber, quizQuestionsEasy[i].question);
            addChoices(quizQuestionsEasy[i].questionNumber, quizQuestionsEasy[i].choices)
        }
    };

    //function takes inputs of the question number(div ID) & question itself
    function addQuestion(qNum, q) {
        //need to declare this variable to hold the name of the div
        var divIdName = "div#" + qNum;
        //target the div and append an h4 w/ the question
        $(divIdName).append("<h4>" + q + "</h4>");
    }

    //function takes inputs of the question number(div ID) & question choices.  This will append radio buttons to each question.
    function addChoices(qNum, choices) {
        //declaring the same local variable as the last function
        var divIdName = "div#" + qNum;
        //store the form in a variable
        var formContents = 
        //target the div and append a form w/ radio buttons for each answer choice
        $(divIdName).append()
    }


    

});
