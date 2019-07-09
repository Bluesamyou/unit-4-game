$(document).ready(function () {
    var characterKey = ""

    var enemyKey = ""


    var gameState = {
        characterSelected : false, 
        enemySelected : false,
        character : {}, 
        enemy     : {}, 
        enemyarray : []
    }
    
    const characters = {
        yoda: {
            displayName: "Yoda",
            image: "assets/images/characters/yoda.png", 
            health : 110 + (Math.floor(Math.random() * 30)),
            baseAttack : 30 + (Math.floor(Math.random() * 10))
        },
        luke: {
            displayName: "Luke Skywalker",
            image: "assets/images/characters/luke.png", 
            health : 150 + (Math.floor(Math.random() * 40)), 
            baseAttack : 40 + (Math.floor(Math.random() * 5))
        },
        chewie: {
            displayName: "Chewbacca",
            image: "assets/images/characters/chewbacca.png", 
            health : 120 + (Math.floor(Math.random() * 20)), 
            baseAttack : 50 + (Math.floor(Math.random() * 10))
        },
        han: {
            displayName: "Han Solo",
            image: "assets/images/characters/hansolo.png", 
            health : 180 + (Math.floor(Math.random() * 20)), 
            baseAttack : 10 + (Math.floor(Math.random() * 20))
        },
        vader: {
            displayName: "darth vader",
            image: "assets/images/characters/darthvader.png", 
            health : 100 + (Math.floor(Math.random() * 10)), 
            baseAttack : 10 + (Math.floor(Math.random() * 10))
        }, 
        fett: {
            displayName: "Boba Fett",
            image: "assets/images/characters/bobafett.png", 
            health : 80 + (Math.floor(Math.random() * 40)), 
            baseAttack : 40 + (Math.floor(Math.random() * 10))
        }
    }

    var initGame = function(){
        var appendCard = $('<div>').attr({
            class: "card",
        })

        appendCard.append(`<img src="${gameState.character.image}" alt="card image" class="rounded-circle card-image" width="100" height="100"> `)
        appendCard.append(`<h5 class="title">${gameState.character.displayName}</h5>`)
        appendCard.append(`<p class="card-attr health" style="color:pink;"> ❤️${gameState.character.health} </p>`)
        appendCard.append(`<p class="card-attr power"style="color:yellow; margin-top: 5px;"> 👊${gameState.character.baseAttack} </p>`)

        $('.character-card').append(appendCard)

        var appendCard = $('<div>').attr({
            class: "card",
        })

        appendCard.append(`<img src="${gameState.enemy.image}" alt="card image" class="rounded-circle card-image" width="100" height="100"> `)
        appendCard.append(`<h5 class="title">${gameState.enemy.displayName}</h5>`)
        appendCard.append(`<p class="card-attr health" style="color:pink;"> ❤️${gameState.enemy.health} </p>`)
        appendCard.append(`<p class="card-attr power"style="color:yellow; margin-top: 5px;"> 👊${gameState.enemy.baseAttack} </p>`)

        $('.enemy-card').append(appendCard)

        gameState.enemyarray.map(function(enemy){
            var enemyimage = $('<img>'). attr({class : "rounded enemy-image", src : characters[enemy].image , width : 50, height : 50, style: "padding: 1px;"})
            $('.remaining-enemies').append(enemyimage)

        })
    }

    Object.keys(characters).map(function (character) {
        var appendCard = $('<div>').attr({
            class: "card",
            value: character
        })

        appendCard.append(`<img src="${characters[character].image}" alt="card image" class="rounded-circle card-image" width="100" height="100"> `)
        appendCard.append(`<h5 class="title">${characters[character].displayName}</h5>`)
        appendCard.append(`<p class="card-attr health" style="color:pink;"> ❤️${characters[character].health} </p>`)
        appendCard.append(`<p class="card-attr power"style="color:yellow; margin-top: 5px;"> 👊${characters[character].baseAttack} </p>`)

        $('.container-card').append(appendCard)


    })

    // util sleep function to delay the resetting of classes
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      

    $('#attack').on("click", function(){
        if(gameState.character.health <= 0){

        }
        else if (gameState.enemy.health <= 0){

        }
        else{
            $('.character-card,.enemy-card').addClass('bounceIn')
        
            gameState.character.health  = gameState.character.health  - gameState.enemy.baseAttack
            gameState.enemy.health  = gameState.enemy.health  - gameState.character.baseAttack
            gameState.character.baseAttack  = gameState.character.baseAttack + Math.floor(Math.random()*40)
    
    
            $('.character-card').find("p.health").html(`❤️${gameState.character.health}`)
            $('.enemy-card').find("p.health").html(`️️❤️${gameState.enemy.health}`)
            $('.character-card').find("p.power").html(`👊${gameState.character.baseAttack}`)
    
            sleep(250).then(function(){
                $('.character-card,.enemy-card').removeClass('bounceIn').delay(1000)
            })
        }

    })
    

    $('.card').on("click", function () {
            if (!gameState.enemySelected || !gameState.characterSelected){
                if (gameState.characterSelected && $(this).attr('id') !== "player"){
                    gameState.enemySelected = true; 
    
                    enemyKey = $(this).attr("value")

                    gameState.enemy = characters[enemyKey] 
                    
                    
                    $(this).attr({
                        id: "player"
                    }).css({
                        border: "5px solid red"
                    });

                    $('#character-select-title').html('Click the button below to begin')

                    $('.begin-button').html('<button id="start-button">Start Game</button>')

                    $('#start-button').on('click',function(){
                        Object.keys(characters).map(function(enemy){
                            console.log(characterKey,)
                            if(enemy !== characterKey && enemy !== enemyKey){
                                gameState.enemyarray.push(enemy)
                            }
                        })
                        console.log(gameState.enemyarray)
                        $('.character-container').animate({'opacity' : 'hide', 'height' : '0'}, 1500)
                        $('.game-field').animate({'opacity': 'show'})
                        initGame()
                    })
                    
                }
                else{
                    gameState.characterSelected = true; 
    
                    characterKey = $(this).attr("value")
                    gameState.character = characters[characterKey] 
        
                    console.log(gameState.character)
                    
                    $(this).attr({
                        id: "player"
                    }).css({
                        border: "5px solid green"
                    });

                    $('#character-select-title').html('Select an enemy to fight')
                            
                }
            }

    });







});
