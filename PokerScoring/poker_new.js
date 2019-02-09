let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
let first_player_hand   = [];
let second_player_hand  = [];

function scoreHand(pokerHand){
    let ranks = ["ACE","KING","QUEEN","JACK","10","9","8","7","6","5","4","3","2"];
    let count = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    let aEnd = 0;
    let threeofakind = false;
    let fourofakind = false;
    let pair = 0;
    let a = 0;
    let prev_suit = null;
    let samesuits = 0;
    let highest = null;
    let combination;

    for(i=0; i< pokerHand.length; i++){
        for(j=0; j< ranks.length; j++){
            if(pokerHand[i]["value"]==ranks[j]){
                count[j] +=1;
            }
        }
        if(prev_suit == null){
            prev_suit = pokerHand[i]["suit"];
        }else{
            if(prev_suit == pokerHand[i]["suit"]){
                samesuits++;
            }
        }

    }
    
    for(i=0; i< count.length; i++){
        // highest
        if(highest == null){
            if(count[i]>0){
                highest = ranks[i];
            }
        }
        // consecutive
        a=0;
        for(let j=i; j<i+5; j++){            
            if(j >= count.length){
                if(count[j - count.length]==1){
                    a++;             
                }
            }else{
                if(count[j]==1){
                    a++;             
                }
            }
        }
        if(a == 5){ // this is straight combination
            aEnd = j+4;
        }
        // pair
        if(count[j]==2){
            pair +=1;           
        }
        // Three of a kind
        if(count[j]==3){
            threeofakind = true;

        }
        // four of a kind
        if(count[j]==4){

            fourofakind=true;
        }
  
    }
    //Royal, straight, flush
    if(samesuits==4){
        if(aEnd==4){
            combination = "Royal Flush";
        }else if(aEnd >4){
            combination = "Straight Flush";
        }else{
            combination = "Flush";
        }        
    }else if(aEnd ==4){
        combination =  "Straight";
    }else if(fourofakind){
        combination = "Four of a Kind";
    }else if(threeofakind){
        combination = "Three of a Kind";
    } else if(pair ==2){
        combination = "Two pairs";
    }else if(pair==1){
        combination = "A pair";
    }else{
        combination = highest;
    }

    return combination;
}
    

 

fetch(url)
.then((resp) => resp.json())
.then(function(res) {

  let deck_id = res.deck_id;
  url = "https://deckofcardsapi.com/api/deck/" + deck_id + "/draw/?count=10"

  fetch(url)
  .then((resp) => resp.json())
  .then(function(res) 
  {
    
      for(let i=0;i<5;i++)
      {
          first_player_hand.push(res.cards[i])
          second_player_hand.push(res.cards[i+5])
      }

     
      document.querySelector("#player_one_score").innerHTML = "TBD";
      document.querySelector("#player_two_score").innerHTML = "TBD";
      
      document.querySelector("#player_one_card_one").setAttribute("src",first_player_hand[0].image);
      document.querySelector("#player_two_card_one").setAttribute("src",second_player_hand[0].image);
      document.querySelector("#player_one_card_two").setAttribute("src",first_player_hand[1].image);
      document.querySelector("#player_two_card_two").setAttribute("src",second_player_hand[1].image);
      document.querySelector("#player_one_card_three").setAttribute("src",first_player_hand[2].image);
      document.querySelector("#player_two_card_three").setAttribute("src",second_player_hand[2].image);
      document.querySelector("#player_one_card_four").setAttribute("src",first_player_hand[3].image);
      document.querySelector("#player_two_card_four").setAttribute("src",second_player_hand[3].image);
      document.querySelector("#player_one_card_five").setAttribute("src",first_player_hand[4].image);
      document.querySelector("#player_two_card_five").setAttribute("src",second_player_hand[4].image);


      first_player_score = scoreHand(first_player_hand);
      second_player_score = scoreHand(second_player_hand);

      document.querySelector("#player_one_score").innerHTML = first_player_score;
      document.querySelector("#player_two_score").innerHTML = second_player_score;

      console.log();

  });
});




