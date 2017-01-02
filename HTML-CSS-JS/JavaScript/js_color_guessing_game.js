//color guessing JS program part-1
var color = ["blue","cyan","gold","gray","green","magenta","orange","red","white","yellow"]; 
var colorstring = color.join(", ");           
var guess_input;      
var finished = false;   
var guesses = 0;

function do_game() {
    
    var target = color[Math.floor(Math.random() * color.length)];

    alert("The color is " + target + "\n");

    while (!finished) {
        guess_input = prompt("I am thinking of one of these colors:\n\n "+
                                  colorstring + "\n\n"+
                                  "What color am I thinking of?");
        guesses += 1;   
        finished = check_guess(target);
    }
}

function check_guess(target) {
    if (!isInArray(guess_input,color)) {
        //alert("Sorry, I don't recognize your code.\n\n" +
        //      "Please try again");
        return false;
    }
    else if (guess_input > target) {
        //alert("Sorry, your guess is not correct!\n\n" + 
        //      "Hint: your color is alphabetically higher than mine.\n\n" +
        //      "Please try again");
        return false;
    }
    else if (guess_input < target) {
        //alert("Sorry, your guess is not correct!\n\n" + 
        //      "Hint: your color is alphabetically lower than mine.\n\n" +
        //      "Please try again");
        return false;
    }
    //alert("Congratulations! You have guessed the color!\n\n " +  
    //      "It took you " + guesses + " to finish the game!\n\n" +
    //      "You can see the colour in the background");
    return true;   
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}