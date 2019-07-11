// Waits for DOM to be rendered
$(document).ready(function () {
    // Sets character key based off characters object
    var characterKey = ""

    // Sets enemy key based off characters object
    var enemyKey = ""

    // Stores game state variables
    var gameState = {
        characterSelected: false,
        enemySelected: false,
        character: {},
        enemy: {},
        enemyarray: []
    }

    // Object with characters and character attributes
    // Random health and attack power assigned to keep things interesting
    const characters = {
        yoda: {
            displayName: "Yoda",
            image: "assets/images/characters/yoda.png",
            health: 110 + (Math.floor(Math.random() * 30)),
            baseAttack: 10 + (Math.floor(Math.random() * 10))
        },
        luke: {
            displayName: "Luke Skywalker",
            image: "assets/images/characters/luke.png",
            health: 150 + (Math.floor(Math.random() * 40)),
            baseAttack: 10 + (Math.floor(Math.random() * 5))
        },
        chewie: {
            displayName: "Chewbacca",
            image: "assets/images/characters/chewbacca.png",
            health: 120 + (Math.floor(Math.random() * 20)),
            baseAttack: 10 + (Math.floor(Math.random() * 10))
        },
        han: {
            displayName: "Han Solo",
            image: "assets/images/characters/hansolo.png",
            health: 180 + (Math.floor(Math.random() * 20)),
            baseAttack: 10 + (Math.floor(Math.random() * 20))
        },
        vader: {
            displayName: "darth vader",
            image: "assets/images/characters/darthvader.png",
            health: 100 + (Math.floor(Math.random() * 10)),
            baseAttack: 10 + (Math.floor(Math.random() * 10))
        },
        fett: {
            displayName: "Boba Fett",
            image: "assets/images/characters/bobafett.png",
            health: 80 + (Math.floor(Math.random() * 40)),
            baseAttack: 10 + (Math.floor(Math.random() * 10))
        }
    }

    // Game initialisation code 
    var initGame = function () {
        // Creates card div for character
        var appendCard = $('<div>').attr({
            class: "card",
        })

        // Adds card attributes like player info, image and stats
        appendCard.append(`<img src="${gameState.character.image}" alt="card image" class="rounded-circle card-image" width="100" height="100"> `)
        appendCard.append(`<h5 class="title">${gameState.character.displayName}</h5>`)
        appendCard.append(`<p class="card-attr health" style="color:pink;"> ❤️${gameState.character.health + 100} </p>`)
        appendCard.append(`<p class="card-attr power"style="color:yellow; margin-top: 5px;"> 👊${gameState.character.baseAttack} </p>`)

        // Adds card to game board
        $('.character-card').append(appendCard)

        // Creates card div for enemy
        var appendCard = $('<div>').attr({
            class: "card",
        })

        // Adds card attributes like enemy info, image and stats
        appendCard.append(`<img src="${gameState.enemy.image}" alt="card image" class="rounded-circle card-image" width="100" height="100"> `)
        appendCard.append(`<h5 class="title">${gameState.enemy.displayName}</h5>`)
        appendCard.append(`<p class="card-attr health" style="color:pink;"> ❤️${gameState.enemy.health} </p>`)
        appendCard.append(`<p class="card-attr power"style="color:yellow; margin-top: 5px;"> 👊${gameState.enemy.baseAttack} </p>`)

        // Adds card to game board
        $('.enemy-card').append(appendCard)

        // Appends remaining enemies as images to show remaining enemies
        gameState.enemyarray.map(function (enemy) {
            var enemyimage = $('<img>').attr({
                class: "rounded enemy-image",
                src: characters[enemy].image,
                width: 50,
                height: 50,
                style: "padding: 1px;"
            })
            $('.remaining-enemies').append(enemyimage)

        })
    }

    var changeEnemy = function () {
        // Checks if all enemies have been defeated
        if (gameState.enemyarray.length !== 0) {
            // Resets current enemy and sets a new one
            gameState.enemy = {}
            gameState.enemy = characters[gameState.enemyarray[gameState.enemyarray.length - 1]]

            // Removes newly set enemy form enemies array
            gameState.enemyarray.pop()

            // Resets enemy card and adds in new enemy 
            $('.enemy-card').empty()

            var appendCard = $('<div>').attr({
                class: "card",
            })

            appendCard.append(`<img src="${gameState.enemy.image}" alt="card image" class="rounded-circle card-image" width="100" height="100"> `)
            appendCard.append(`<h5 class="title">${gameState.enemy.displayName}</h5>`)
            appendCard.append(`<p class="card-attr health" style="color:pink;"> ❤️${gameState.enemy.health} </p>`)
            appendCard.append(`<p class="card-attr power"style="color:yellow; margin-top: 5px;"> 👊${gameState.enemy.baseAttack} </p>`)

            $('.enemy-card').append(appendCard)

            // Updates remaining enemies
            $('.remaining-enemies img').last().remove();

        }

    }


    // Map function to create character cards for each character in character object
    Object.keys(characters).map(function (character) {
        // Creates card div and appends to the card deck
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

    // Logic for when attack button is clicked
    $('#attack').on("click", function () {
        // Checks if user's character is defeated
        if (gameState.character.health <= 0) {
            // Fires defeat message
            Swal.fire({
                background: 'rgba(0,0,0,0.9)',
                html: `<p style="color:red;">You were defeated... would you like to restart?</p>`,
                allowOutsideClick: false,
                confirmButtonText: "Let's go",
                backdrop: 'rgba(255,0,0,0.2)',
                preConfirm: () => {
                    // Hands down my laziest approach to resetting the game
                    // Why reset all variables when you can reload the page¯\_(ツ)_/¯
                    location.reload()
                }
            })
            // Checks if enemy is defeated
        } else if (gameState.enemy.health <= 0) {
                // Checks if there are anymore enemies to fight
            if (gameState.enemyarray.length !== 0) {
                Swal.fire({
                    // Fires enemy defeated message 
                    background: 'rgba(0,0,0,0.9)',
                    html: `<p style="color:greenyellow;">Enemy defeated... would you like the challenge the next </p>`,
                    confirmButtonText: "Let's go",
                    allowOutsideClick: false,
                    backdrop: 'rgba(180,255,180,0.2)',
                    preConfirm: () => {
                        // Switches defeated enemy with one in the enemy stack
                        changeEnemy()
                    }
                })
            } else {
                // Fires all enemies defeated and victory message 
                Swal.fire({
                    background: 'rgba(0,0,0,0.9)',
                    html: `<p style="color:greenyellow;">Woohoo you win... would you like to restart? </p>`,
                    confirmButtonText: "Let's go",
                    allowOutsideClick: false,
                    backdrop: 'rgba(180,255,180,0.2)',
                    preConfirm: () => {
                        // Hands down my laziest approach to resetting the game
                        // Why reset all variables when you can reload the page¯\_(ツ)_/¯
                        location.reload()
                    }
                })
            }

        } else {
            //Runs attack logic
            // CSS class added to make cards bounce in
            $('.character-card,.enemy-card').addClass('bounceIn')

            // updating health and base attack
            gameState.character.health = gameState.character.health - gameState.enemy.baseAttack
            gameState.enemy.health = gameState.enemy.health - gameState.character.baseAttack
            gameState.character.baseAttack = gameState.character.baseAttack + Math.floor(Math.random() * 40)

            // updating DOM with above attributes
            $('.character-card').find("p.health").html(`❤️${gameState.character.health}`)
            $('.enemy-card').find("p.health").html(`️️❤️${gameState.enemy.health}`)
            $('.character-card').find("p.power").html(`👊${gameState.character.baseAttack}`)

            // Slight sleep to reset class to ensure that Bounce in can be executed multiple times
            setTimeout(function(){
                $('.character-card,.enemy-card').removeClass('bounceIn').delay(1000)
            },250)
        }

    })

    // Card selection logic
    $('.card').on("click", function () {
        // Checks if enemy and character are selected and if so ignores any clicks
        if (!gameState.enemySelected || !gameState.characterSelected) {
            // Checks if a player has been selected and the user is not trying to reselect it
            if (gameState.characterSelected && $(this).attr('id') !== "player") {
                gameState.enemySelected = true;

                // Gets enemy's key to reference back to the character object
                enemyKey = $(this).attr("value")

                // Sets enemy object to game state
                gameState.enemy = characters[enemyKey]

                // Sets enemy defining attributes
                $(this).attr({
                    id: "enemy"
                }).css({
                    border: "5px solid red"
                });

                // Updates page title
                $('#character-select-title').html('Click the button below to begin')

                // Makes start game button
                $('.begin-button').html('<button id="start-button">Start Game</button>')

                // Initializes game when start game button is clicked
                $('#start-button').on('click', function () {
                    // Pushes all remaining characters to an enemies array
                    Object.keys(characters).map(function (enemy) {
                        console.log(characterKey, )
                        if (enemy !== characterKey && enemy !== enemyKey) {
                            gameState.enemyarray.push(enemy)
                        }
                    })
                    // Hides card selection div and opens game screen
                    $('.character-container').animate({
                        'opacity': 'hide',
                        'height': '0'
                    }, 1500)
                    $('.game-field').animate({
                        'opacity': 'show'
                    })
                    initGame()
                })

            } else {
                gameState.characterSelected = true;

                // Gets character's key to reference back to the character object
                characterKey = $(this).attr("value")

                // Sets character object to game state
                gameState.character = characters[characterKey]

                // Sets character defining attributes
                $(this).attr({
                    id: "player"
                }).css({
                    border: "5px solid green"
                });
                
                // Updates page title
                $('#character-select-title').html('Select your first enemy to fight')

            }
        }

    });


});
