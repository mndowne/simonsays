/////  Sound  Files linked to buttons \\\\\\\
//\\//\\//\\//\\//\\//\\//\\//\\//
var userMoves = [];
var moves = [];
var life = 0;
var strict = false;


var audioBlack = document.createElement('audio');
audioBlack.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');

var audioWhite = document.createElement('audio');
audioWhite.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');

var audioGray = document.createElement('audio');
audioGray.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');

var audioOffWhite = document.createElement('audio');
audioOffWhite.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');


$(document).ready(function(){

        //////put the colors  BACK  to original color \\\\\\\\
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//
        $('#countDisplay').html("<p>Hit Start</p>");

        var blackBack = function(){
        $("#black").css("background-color", "rgb(35,30,0)");
        };
        var whiteBack = function(){
        $("#white").css("background-color","rgb(230,230,220)");
        };
        var grayBack = function(){
        $("#gray").css("background-color", "rgb(230,230,170)");
        };
        var offWhiteBack = function(){
        $("#offWhite").css("background-color", "rgb(200,185,130)");
        };

        //////////////\\\\\\\\\\\\\\\\\
        ///// fire each button  \\\\\\\\

        var fireBlack = function(){
            $("#black").css('background-color' , 'rgb(95,90,70)');
            setTimeout(blackBack, 400);
            audioBlack.play();
        };


        var fireWhite = function(){
            $("#white").css("background-color","rgb(100,100,100)");
            setTimeout(whiteBack, 400);
            audioWhite.play();
        };
        var fireGray = function(){
            $("#gray").css("background-color", "rgb(150,150,100)");
            setTimeout(grayBack, 400);
            audioGray.play();
        };
        var fireOffWhite = function(){
            $("#offWhite").css("background-color", "rgb(140,125,70)");
            setTimeout(offWhiteBack, 400);
            audioOffWhite.play();
        };

        var moveClock = function(moves , i){
            $('#shield').css('z-index','1');
            setTimeout(function() {
                    switch (moves[i]){
                    case 0:
                    fireBlack();
                    break;
                    case 1:
                    fireWhite();
                    break;
                    case 2:
                    fireGray();
                    break;
                    case 3:
                    fireOffWhite();
                    break;
                    }//end of switch
                    i++;

                    if (i < moves.length){
                    moveClock(moves, i);
                    }
                    if (i == moves.length){
                        $('#shield').css('z-index','-1');
                    }

            }, 1000); //setTimeout

        };//moveClock

        ////\\\\
        ///////       \\\\\\\\\
        ////    ROUND     \\\\\
        ///////        \\\\\\\\

        var round = function(moves , count, CallbackMoveClock, lives){
            count++;
            $('#countDisplay').html("<p>Round \n"+count+"</p>");
            life = lives;

            var next =  Math.floor(4 * Math.random());
            moves.push(next);

            CallbackMoveClock(moves, 0);
            userMoves = [];

        }//end of round

        ///// When a button is clicked \\\\\
        var check = function(userMovesPass , movesPass){
            var index = userMovesPass.length - 1;
            if (userMovesPass[index] == movesPass[index]){

                if(userMovesPass.length == movesPass.length && strict){
                    round(movesPass, movesPass.length, moveClock, 1);
                } 
                else if(userMovesPass.length == movesPass.length){
                    round(movesPass, movesPass.length, moveClock, 2);
                } 

            }
            else {  /////this is if they hit a wrong button \\\\\
                fireBlack();
                fireWhite();
                fireGray();
                fireOffWhite();
                life--;
                userMoves = [];

                if (life <= 0){
                    moves = [];
                    $('#countDisplay').html("<p>Hit Start</p>");
                }
                else{
                    moveClock(movesPass,0);

                }
            }

        }

        $("#black").click(function(){
                fireBlack();
                userMoves.push(0);
                check(userMoves , moves);
                });

        $("#white").click(function(){
                fireWhite();
                userMoves.push(1);
                check(userMoves , moves);
                });

        $("#gray").click(function(){
                fireGray();
                userMoves.push(2);
                check(userMoves , moves);
                });

        $("#offWhite").click(function(){
                fireOffWhite();
                userMoves.push(3);
                check(userMoves , moves);
                });

        var toggleStrict = function() {
            strict ? strict = false : strict = true;
            strict ? $("#strictButton").css('background-color','green') : $("#strictButton").css('background-color','rgb(200,200,180)');
        }

        $("#strictButton").click(function(){
                toggleStrict();
                });


        $("#startButton").click(function(){
                moves = [];
                var count = 0;
                if (strict){
                round(moves , count, moveClock, 1);
                }
                else{
                round(moves , count, moveClock, 2);
                }
                console.log(moves);
                console.log(userMoves)

                });


});
