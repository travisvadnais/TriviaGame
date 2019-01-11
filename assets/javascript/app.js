$(document).ready(() => {

  $("#calculation").hide();

  //array to hold the 'easy' questions.  Note - they're not in object notation b/c we're going to feed them through a function for formatting
  const quizQuestionsEasy = [
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
  //array to hold the 'hard' questions - not built into HW yet.  Will incorporate later.
  const quizQuestionsHard = [
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

  //This function formats the questions for us.  Instead of following object notation for 20 questions, we can use the function to format them for us just by feeding it inputs (which are the 'new' items above)
  function quizQuestion(questionNumber, question, choices, correctAnswer, name) {
      this.questionNumber = questionNumber;
      this.question = question;
      this.choices = choices;
      this.correctAnswer = correctAnswer;
      this.name = name;
  }
  //Array holding all the different outcomes that will populate on the calculation screen
  const outcomeAnalysis = [
      new outcome("Leprechaun", "Really, you are the least scary horror villain in history.  Your performance in this quiz was almost as pathetic as the idea of you as a bad guy.  We can only hope there aren't 6 sequels of YOU", "assets/images/outcome0.png"),
      new outcome("Corn Child", "Honestly, the only thing scarier than a dork in a sombrero is your performance in this quiz.", "assets/images/outcome1.png"),
      new outcome("Bad Moon Werewolf", "What the hell is that?!  No, not the image; your performance.  Come back when you've learned how to use the Google machine", "assets/images/outcome2.png"),
      new outcome("The Fisherman", "I know what you did last summer . . . . literally everything but watch horror movies.", "assets/images/outcome3.png"),
      new outcome("Feardotcom", "Yes, that's right - your performance doesn't even deserve the honor of a villain; you're just an evil website.  Maybe next time instead of using the internet to scare people to death, you can use it to, I don't know, look for horror quiz answers.", "assets/images/outcome4.png"),
      new outcome("The Collector", "Okay, so you weren't horrible, but you definitely weren't great.  Parts of your performance were brilliant, and some made you just shake your head.  Keep trying.", "assets/images/outcome5.png"),
      new outcome("Negan", "You're not horrible, you're not great; you're just kind of there.  The most entertaining part of your performance is how many curse words you say.  Much like me when reading your answers.", "assets/images/outcome6.png"),
      new outcome("Pinhead", "A certified badass - one of the most depraved villains of all time.  Unfortunately, this franchise really trailed off after awhile, much like your performance on this quiz", "assets/images/outcome7.png"),
      new outcome("Annie Wilkes", "Now we're getting somewhere.  Although you weren't perfect, you were damn good. We'll just be sure to keep you away from sledgehammers.  And tomato soup.", "assets/images/outcome8.png"),
      new outcome("Leatherface", "The creme de la creme of horror baddies - this dude is a complete sociopath.  Chainsaws, cannibalism, meat hooks - this gentleman is not one to be trifled with - much like you with regards to your profound horror movie knowledge", "assets/images/outcome9.png"),
      new outcome("Otis Driftwood", "Oh were you expecting Jason? Sorry to disappoint.  Otis Driftwood is king baddie - satanism, rituals and demon surgeons coupled with witty one-liners and amazing t-shirts - you are truly the best and your performance was a masterpiece.", "assets/images/outcome10.png"),
  ];
  //function to convert the array above to object notation
  function outcome(name, explanation, image) {
    this.name = name;
    this.explanation = explanation;
    this.image = image;
  }

  let timer;
  let timerCounter;

  //Arrays to hold the actual correct answers and user's quiz answers
  let correctAnswers = [];
  let userAnswers = [];
  
  //Answer counters
  let answersCorrect = 0;
  let answersWrong = 0;

  //Click the button to start the game.  This will run the setup function and star the timer
  $("#startGame").click(() => setupGame())
    
  const setupGame = () => {
    startTimer();
    timerCounter = 121;
    //first we need to add a div for each question
    quizQuestionsEasy.map((_val, i) => {
      $(".gameBoard").append(`<div id=${quizQuestionsEasy[i].questionNumber}><p>Question ${(i+1)}:</p></div>`);
      correctAnswers.push(quizQuestionsEasy[i].correctAnswer);
      //call next function to add the question to each div
      addQuestion(quizQuestionsEasy[i].questionNumber, quizQuestionsEasy[i].question);
      addChoices(quizQuestionsEasy[i].questionNumber, quizQuestionsEasy[i].choices, quizQuestionsEasy[i].name);
    })
    //This adds a submit button at the bottom of the quiz to finish
    $(".gameBoard").append("<button type='button' class='btn btn-success' id='gameOver'>I'm Finished!</button>");
    //Clear some stuff out of the jumbotron
    $("p.swap-button").empty().append("<div id='gameTimer'></div>");
    $("p.clickInstruct").empty();
    $("div.buffer").remove();
  };

  const startTimer = () => timer = setInterval(countDown, 1000);
  const countDown = () => {
    timerCounter--;
    (timerCounter > -1) ? $("#gameTimer").text(`Time Remaining: ${(timerCounter)}`) : endGame(); //Ternary
  }

  //function takes inputs of the question number(div ID) & question itself
  const addQuestion = (qNum, q) => {
    const divIdName = `div#${qNum}`
    //target the div and append an h4 w/ the question
    $(divIdName).append(`<h4>${q}</h4><form id=${qNum}></form`);
  }

  //function takes inputs of the question number(div ID) & question choices.  This will append radio buttons to each question.
  const addChoices = (qNum, choices, qName) => {
    //declaring a local variable to store the Form ID from the above function
    const formIdName = `form#${qNum}`;
    //set up a loop to loop through the questionChoices and add a radio button for each
    choices.map((_val, i) => {
      $(`<label><input type='radio' name=${qName} value= ${i + 1}>${choices[i]}</label>`).appendTo(formIdName);
    })
  }

  $(document).on('click', '#gameOver', () => endGame());

  const endGame = () => {
    if(!(timerCounter > -1)) {alert("Time's Up! Press 'OK' to See Your Score")}
    clearInterval(timer);
    $(".gameBoard").hide();
    window.scroll(0,0);
    $("#calculation").show();
    quizQuestionsEasy.map((_val, i) => {
      let userInput = $(`input[name=Q${i + 1}]:checked`).val();
      userAnswers.push(userInput - 1);
    })
    tallyScore();
  }

  const tallyScore = () => {
    //Map through each answer and compare it to the correctAnswer in the quizQuestion Array. **Ternary**
    quizQuestionsEasy.map((_val, i) => (userAnswers[i] === correctAnswers[i]) ? answersCorrect++ : answersWrong++)
    let tally = ((answersCorrect / quizQuestionsEasy.length) * 100);
    $("#correctAnswers").text(answersCorrect);
    $("#incorrectAnswers").text(answersWrong);
    $("#finalScore").text(`${tally}%`);
    $("#your_villain").text(outcomeAnalysis[answersCorrect].name);
    $("#villain_image").attr("src", outcomeAnalysis[answersCorrect].image);
    $("h4#explanation").text(outcomeAnalysis[answersCorrect].explanation);
  } 
});