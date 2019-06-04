var turn= "red";
var error=false;
var directions=["downLeft", "down", "downRight", "right", "rightUp", "up", "upLeft", "left"];

$(document).ready(function () {
    generateTitle();
    $(".slot").on("click", function(){
        dropChecker(this.id);
        changeTurn();
        if(gameDone()){
            finishGame();
        }
    });
});

function generateTitle() {
    var arr=["C", "O", "N", "N", "E", "C", "T &nbsp&nbsp", "F", "O", "U", "R"];
    for(var i=0;i<arr.length;i++){
        var letter = document.createElement("span");
        letter.innerHTML=arr[i];
        if(i%2==1){
            letter.setAttribute("class", "odd title");
        }else{
            letter.setAttribute("class", "even title");
        }
        document.getElementById("title").appendChild(letter);
    }
}

function dropChecker(id) {
    var number = getSlotNumber(id);
    for(var i=number; i<=42;i+=7){
        if($("#"+(number+35)).html()=="⚪"){
            error=false;
        }else{
            error=true;
        }
        if($("#"+i).html()=="⚪"){
            if(turn=="red"){
                $("#"+i).html("🔴");
            }else{
                $("#"+i).html("🔵");
            }
            break;
        }
    }
}

function getSlotNumber(id) {
    var slots=["a", "b", "c", "d", "e", "f", "g"];
    for(var i=0;i<slots.length;i++){
        if(id==slots[i]){
            return i+1;
        }
    }
}

function changeTurn() {
    if(!error){
        if(turn=="red"){
            turn="blue";
            $("#turn").html("Blue player's turn");
            $("#turn").css("color", "blue");
        }else{
            turn="red";
            $("#turn").html("Red player's turn");
            $("#turn").css("color", "red");
        }
    }
}

function gameDone() {
    for(var i=1;i<=42;i++){
        if($("#"+i).html()!="⚪") {
            for (var j = 0; j < 8; j++) {
                var direction = directions[j];
                if (firstDirectionCheck(direction, i)) {
                    if (secondDirectionCheck(direction, i)) {
                        if (thirdDirectionCheck(direction, i)) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

function firstDirectionCheck(direction, location){
    if(direction==directions[0]){
        if((location<22)||(location%7==1)||(location%7==2)||(location%7==3)){
            return false;
        }else{
            return($("#"+location).html()==$("#"+(location-8)).html());
        }
    }
    if(direction==directions[1]){
        if(location<22){
            return false;
        }else{
            return($("#"+location).html()==$("#"+(location-7)).html());
        }
    }
    if(direction==directions[2]){
        if((location<22)||(location%7==0)||(location%7==6)||(location%7==5)){
            return false;
        }else{
            return($("#"+location).html()==$("#"+(location-6)).html());
        }
    }
    if(direction==directions[3]){
        if((location%7==0)||(location%7==6)||(location%7==5)){
            return false;
        }else{
            return($("#"+location).html()==$("#"+(location+1)).html());
        }
    }
    if(direction==directions[4]){
        if((location>21)||(location%7==0)||(location%7==6)||(location%7==5)){
            return false;
        }else{
            return($("#"+location).html()==$("#"+(location+8)).html());
        }
    }
    if(direction==directions[5]){
        if(location>21){
            return false;
        }else{
            return($("#"+location).html()==$("#"+(location+7)).html());
        }
    }
    if(direction==directions[6]){
        if((location>21)||(location%7==1)||(location%7==2)||(location%7==3)){
            return false;
        }else{
            return($("#"+location).html()==$("#"+(location+6)).html());
        }
    }
    if(direction==directions[7]){
        if((location%7==1)||(location%7==2)||(location%7==3)){
            return false;
        }else{
            return($("#"+location).html()==$("#"+(location-1)).html());
        }
    }
}

function secondDirectionCheck(direction, location) {
    if(direction==directions[0]){
        return($("#"+location).html()==$("#"+(location-16)).html());
    }
    if(direction==directions[1]){
        return($("#"+location).html()==$("#"+(location-14)).html());
    }
    if(direction==directions[2]){
        return($("#"+location).html()==$("#"+(location-12)).html());
    }
    if(direction==directions[3]){
        return($("#"+location).html()==$("#"+(location+2)).html());
    }
    if(direction==directions[4]){
        return($("#"+location).html()==$("#"+(location+16)).html());
    }
    if(direction==directions[5]){
        return($("#"+location).html()==$("#"+(location+14)).html());
    }
    if(direction==directions[6]){
        return($("#"+location).html()==$("#"+(location+12)).html());
    }
    if(direction==directions[7]){
        return($("#"+location).html()==$("#"+(location-2)).html());
    }
}

function thirdDirectionCheck(direction, location) {
    if(direction==directions[0]){
        return($("#"+location).html()==$("#"+(location-24)).html());
    }
    if(direction==directions[1]){
        return($("#"+location).html()==$("#"+(location-21)).html());
    }
    if(direction==directions[2]){
        return($("#"+location).html()==$("#"+(location-18)).html());
    }
    if(direction==directions[3]){
        return($("#"+location).html()==$("#"+(location+3)).html());
    }
    if(direction==directions[4]){
        return($("#"+location).html()==$("#"+(location+24)).html());
    }
    if(direction==directions[5]){
        return($("#"+location).html()==$("#"+(location+21)).html());
    }
    if(direction==directions[6]){
        return($("#"+location).html()==$("#"+(location+18)).html());
    }
    if(direction==directions[7]){
        return($("#"+location).html()==$("#"+(location-3)).html());
    }
}

function finishGame() {
    if(turn=="blue"){
        $("#gameOver").html("RED PLAYER WINS");
        $("#gameOver").css("color", "red");
    }else{
        $("#gameOver").html("BLUE PLAYER WINS");
        $("#gameOver").css("color", "blue");
    }
    $("#turn").css("display", "none");
    $(".slot").off("click");
}