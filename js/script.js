const gameState = [
    {
        gameOver: null,
        running: 0,
        playersTurn: true,
        playerCash: null,
        playerClicks: null,
        corpCash: 5,
        corpClicks: 3,
        currentServer: null,
        cardsInHand: null,
        firstOpen: null,
        firstSecOpen: null,
        currentOpponent: null,
        playerScore: null,
        corpScore: null,
        insideMan: false
    }
];

const securityPool = []; // the corp's deck, basically
const cardsInDeck = [];

function fixTooltips() {
    $('.tooltip').tooltipster({
        theme: 'tooltipster-borderless',
        animation: 'fade',
        delay: 200
    });
}

/** fetches the card list and puts it in deck array -- this could maybe be condensed with initsec*/
function initDeck() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].cardNum = i;
        cardsInDeck.push(cards[i]);
    }
    $('.deckheader').text(`Deck (${cardsInDeck.length})`);
    $('.discardheader').text('Discard (0)');
}

/** fetches all security measures and puts them in the corp's pool */
function initSec() {
    for (let i = 0; i < securityMeasures.length; i++) {
        securityMeasures[i].cardNum = `sec${i}`;
        securityPool.push(securityMeasures[i]);
    }
}

/** shuffles the deck using Frank Mitchell's Fisher-Yates shuffle
* @param {string} deck the target deck to shuffle
*/
function shuffleDeck(deck) {
    let i = 0,
        j = 0,
        temp = null;

    for (i = deck.length - 1; i > 0; i = i - 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

/** begins the game, sets all gameState variables */
function initGame() {
    // init new game
    gameLog('The heist is starting!');
    gameState.gameOver = false;
    gameState.running = false;
    gameState.playersTurn = true;
    initDeck();
    initSec();
    shuffleDeck(cardsInDeck);
    shuffleDeck(securityPool);
    placeSec(5);
    gameState.playerCash = 5;
    gameState.playerClicks = 4;
    gameState.playerScore = 0;
    gameState.corpScore = 0;
    $('#playerscore').append(`<h1>${gameState.playerScore}</h1>`);
    $('#corpscore').append(`<h1>${gameState.corpScore}</h1>`);
    $('.bank').data('trucks', 0);
    $('.credits').append(`<h1>${gameState.playerCash}</h1>`);
    $('.clicks').append(`<h1>${gameState.playerClicks}</h1>`);
    noFreeWin();
}

/** resets the game */
function restartGame() {
    // resetting everything from last game
    $('.banner').slideToggle(1000);
    $('.cardslot').children().remove();
    $('.secslot').children().remove();
    $('.discard').children().remove();
    $('.bank').children().remove();
    $('.crew').children().remove();
    $('.column').addClass('server');
    $('.square').addClass('bank');
    $('.arrow').addClass('run-arrow');
    $('.run-arrow').css('display', 'flex');
    $('.server').attr('style', '');
    $('#corpscore').text(null);
    $('#playerscore').text(null);
    $('.credits').text(null);
    $('.clicks').text(null);
    $('.draw').off();
    $('.credits').off();
    $('.run-arrow').off();
    $('.draw').click(clickToDraw);
    $('.credits').click(clickForCredit);
    $('.run-arrow').click(approach);
    cardsInDeck.length = 0;
    securityPool.length = 0;
    initGame();
}

/** adds a status message to the game log window, to let the player know what just happened
* @param {string} stringToLog is the message to display
*/
function gameLog(stringToLog) {
    $(`<p>> ${stringToLog}<p>`).appendTo('#gamelog');
    $('#gamelog').animate({ scrollTop: $('#gamelog').get(0).scrollHeight }, 700);
}

/** subtracts credits from player's bank, updates bank display
* @param {number} cost The cost in credits
*/
function charge(cost) {
    if (gameState.playerCash >= cost) {
        gameState.playerCash = gameState.playerCash - cost;
        $('.credits h1').text(gameState.playerCash);
    } else {
        $('.draw').effect('shake', 'slow');
    }
}

/** subtracts a click from player's actions, updates clicks display
* @param {number} cost the number of clicks
*/
function spendClick(cost = 1) {
    gameState.playerClicks = gameState.playerClicks - cost;
    $('.clicks h1').text(gameState.playerClicks);
    checkForWin();
    if (gameState.playerClicks === 0 && !gameState.gameOver) {
        corpTurn();
    }
}

/** basic card drawing function
* @param {number} draws is the number of cards to draw
*/
function drawCards(draws) {
    // does the player have room in their hand? are there cards remaining in the deck?
    gameState.cardsInHand = $('.cardslot > div').length;
    for (let i = 0; i < draws; i++) {
        if (gameState.cardsInHand < 5 && cardsInDeck.length > 0) {
            $('.cardslot').each(function() {
                if (!$.trim($(this).html())) {
                    gameState.firstOpen = `#${this.id}`;
                    return false;
                }
            });
            // okay, draw. and remove the drawn card from the deck.
            $(gameState.firstOpen).append(`<div class='card sm-sq tooltip ${cardsInDeck[0].cardNum}'></div>`).hide().fadeIn(400);
            $(`.${cardsInDeck[0].cardNum}`).data(cardsInDeck[0]);
            $(`.${cardsInDeck[0].cardNum}`).css('background-image', `url(${cardsInDeck[0].img})`);
            $(`.${cardsInDeck[0].cardNum}`).css('background-size', 'contain');

            const cardInfo = $('<div>', { id: `tool${cardsInDeck[0].cardNum}` });
            $(cardInfo).append(`<img src='${cardsInDeck[0].img}'>`);
            $(cardInfo).append(`<h1>${cardsInDeck[0].name}</h1>`);

            if ($(`.${cardsInDeck[0].cardNum}`).data().type === 'crew') {
                console.log(cardsInDeck[0].type);
                $(`.${cardsInDeck[0].cardNum}`).addClass('man');
                $(cardInfo).append(`<h2> Cost to Hire: ${cardsInDeck[0].cost}</h2>`);
                $(cardInfo).append(`<h2> Strength: ${cardsInDeck[0].strength}</h2>`);
                $(cardInfo).append(`<h2> Cost to Break Security: ${cardsInDeck[0].break}</h2>`);
            } else if ($(`.${cardsInDeck[0].cardNum}`).data().type === 'event') {
                console.log('type is event');
                console.log($(`.${cardsInDeck[0].cardNum}`).data().name);
                $(`.${cardsInDeck[0].cardNum}`).click((e) => {
                    const target = $(e.target);
                    if (gameState.playerClicks > 0 && gameState.playerCash >= target.data().cost) {
                        target.data().use();
                        target.off();
                        $('.discard').children('.card').hide();
                        target.appendTo('.discard');
                        // if ($('.discard').children('.card').length === 0) {
                        //     target.appendTo('.discard');
                        // } else {
                        //     target.appendTo('.discard:last-child');
                        // }
                        target.css('position', 'relative');
                        target.css('top', '-1vw');
                        target.css('left', '-1vw');
                        $('.discardheader').text(`Discard (${$('.discard').children('.card').length})`);
                        charge(target.data().cost);
                        spendClick();
                        gameLog(`You played ${target.data().name}!`);
                    } else {
                        $('.credits').effect('shake', 'slow');
                    }
                });
                console.log($(`.${cardsInDeck[0].cardNum}`).data().use);
                $(cardInfo).append(`<h2> Cost to Play: ${cardsInDeck[0].cost}</h2>`);
                $(cardInfo).append(`<h2> Effect: ${cardsInDeck[0].effect}</h2>`);
            }
            $(cardInfo).appendTo('.tooltip_templates');
            $(`.${cardsInDeck[0].cardNum}`).attr('data-tooltip-content', `#tool${cardsInDeck[0].cardNum}`);

            fixTooltips();

            cardsInDeck.shift();
            $('.deckheader').text(`Deck (${cardsInDeck.length})`);
            $('.man').draggable({
                revert: 'invalid',
                start: function(event, ui) {
                    $(this)
                        .addClass('glow');
                },
                stop: function(event, ui) {
                    $(this)
                        .removeClass('glow');
                }

            });
        } else if (cardsInDeck.length < 1) {
            // deal with running out of cards
            $('.draw').effect('shake', 'slow');
        }
    }
}

/** the player spends an action to draw a card */
function clickToDraw() {
    gameState.cardsInHand = $('.cardslot > div').length;
    if (gameState.cardsInHand < 5 && gameState.playerClicks && cardsInDeck.length > 0 && !gameState.running) {
        spendClick();
        drawCards(1);
        gameLog('You drew a card.');
    } else {
        $('.draw').effect('shake', 'slow');
    }
}

/** the player spends an action to gain money */
function clickForCredit() {
    if (gameState.playerClicks && !gameState.running) {
        spendClick();
        charge(-1);
    }
}

/** the powers that be are placing security measures
* @param {string} ice is the number of cards to place
*/
function placeSec(ice = 1) {
    for (let i = 0; i < ice; i++) {
    // choose a random bank
        const banksLeft = $('.bank').length;
        const rando = Math.floor(Math.random() * (banksLeft - 0)) + 0;
        const targetServer = $('.server').eq(rando);
        // check for first open slot
        $(targetServer).children('.secslot').each(function checkForOpen() {
            console.log($(this).attr('id'));
            if ($(this).children('.security').length < 1) {
                gameState.firstSecOpen = `#${this.id}`;
                console.log(`the first open space is${gameState.firstSecOpen}`);
                return false;
            }
        });
        if ($(targetServer).children().children('.security').length < 3) {
            // place next available security there
            $(gameState.firstSecOpen).append(`<div class='security ${securityPool[0].cardNum}'></div>`);
            $(`.${securityPool[0].cardNum}`).data(securityPool[0]);
            $(`.${securityPool[0].cardNum}`).css('background-image', 'url(img/cardback.jpg)').hide().fadeIn(1000);
            $(`.${securityPool[0].cardNum}`).css('background-size', 'cover');
            $(`.${securityPool[0].cardNum}`).css('background-position', 'center');
            const secInfo = $('<div>', { id: `tool${securityPool[0].cardNum}` });
            $(secInfo).append(`<img src='${securityPool[0].img}'>`);
            $(secInfo).append(`<h1>${securityPool[0].name}</h1>`);
            $(secInfo).append(`<h2> Strength: ${securityPool[0].strength}</h2>`);
            $(secInfo).appendTo('.tooltip_templates');
            $(`.${securityPool[0].cardNum}`).attr('data-tooltip-content', `#tool${securityPool[0].cardNum}`);
            fixTooltips();
            securityPool.shift();
        } else if (!gameState.playersTurn) {
            addTruck();
        } else {
            placeSec(1);
        }
    }
}

/** keeps the initial setup from including 3 undefended banks, a free win */
function noFreeWin() {
    // count undefended servers
    let undefendedCount = 0;
    let emptyServer = null;
    $('.server').each(function() {
        if ($(this).children().children('.security').length < 1) {
            undefendedCount++;
        }
        if (undefendedCount > 1) {
            $('.server').each(function() {
                if ($(this).children().children('.security').length < 1) {
                    emptyServer = $(this);
                    return false;
                }
            });
            if (emptyServer.children().children('.security').length < 1) {
                console.log(`${emptyServer.attr('id')} is the empty server`);
                // place into slot zero
                emptyServer.children(':nth-child(2)').append(`<div class='security ${securityPool[0].cardNum}'></div>`);
                $(`.${securityPool[0].cardNum}`).data(securityPool[0]);
                $(`.${securityPool[0].cardNum}`).css('background-image', 'url(img/cardback.jpg)').hide().fadeIn(1000);
                $(`.${securityPool[0].cardNum}`).css('background-size', 'cover');
                $(`.${securityPool[0].cardNum}`).css('background-position', 'center');
                const secInfo = $('<div>', { id: `tool${securityPool[0].cardNum}` });
                $(secInfo).append(`<img src='${securityPool[0].img}'>`);
                $(secInfo).append(`<h1>${securityPool[0].name}</h1>`);
                $(secInfo).append(`<h2> Strength: ${securityPool[0].strength}</h2>`);
                $(secInfo).appendTo('.tooltip_templates');
                $(`.${securityPool[0].cardNum}`).attr('data-tooltip-content', `#tool${securityPool[0].cardNum}`);
                fixTooltips();
                securityPool.shift();
                return false;
            }
        }
    });
}

/** the player starts a run, attempting to break through security and rob a bank
* @param {string} e is just the click event so we can locate the server we're running on
* @returns {boolean} false is just cheating to get out of the loop
*/
function approach(e) {
    // this stuff only happens at the beginning of the run
    if (!gameState.running) {
        gameLog('You started a run!');
        if (gameState.playerClicks > 0) {
            gameState.playerClicks--; // player spends one action to make the run
            $('.clicks h1').text(gameState.playerClicks);
        }
        gameState.currentServer = $(e.currentTarget).parents('.server'); // we determine which bank the player is targeting
        $('.run-arrow').css('display', 'none');
        if ($(gameState.currentServer).children().children('.security').length > 0) { // and figure out how much security they have to pass
            runDepth = $(gameState.currentServer).children().children('.security').length;
        } else {
            robBank();
            return false;
        }
    }
    runDepth--; // we get one step closer to the bank
    if (gameState.insideMan === true && runDepth >= 1) {
        runDepth--;
    } else if (gameState.insideMan === true && runDepth < 1) {
        robBank();
        return false;
    }

    gameState.running = true; // and turn off all the actions that aren't allowed during a run
    currentOpponent = $(gameState.currentServer).children('.secslot').children('.security').eq(runDepth); // determine which security card we're interacting with
    currentOpponent.css('background-image', `url(${currentOpponent.data().img})`); // "flip over" the hidden security card the first time it's encountered
    currentOpponent.css('background-size', 'contain');
    currentOpponent.css('background-position', 'center');
    // updating the security card's tooltip to show its stats
    currentOpponent.addClass('tooltip');
    fixTooltips();
    $('.marker').css('display', 'block');
    $('.marker').fadeTo(400, 0.5).appendTo(currentOpponent); // point the run indicator arrow at the current position
    gameLog(`You ran into a(n) ${currentOpponent.data().name}!`);
    checkBreakers();
}

/** checks our player cards to see if any of them can beat the current security card*/
function checkBreakers() {
    $('.card').removeClass('focused');
    $('.crew > .man').off();
    // do we have a card with the same color and a high enough strength score?
    // if so, we add a click handler that lets it break that security card
    $('.crew > .man').each(function() {
        if ($(this).data().strength >= currentOpponent.data().strength && $(this).data().color === currentOpponent.data().color) {
            $(this).addClass('focused');
            $(this).click(iceBreak);
        }
    });
    // if not, womp womp!
    if ($('.focused').length === 0) {
        currentOpponent.effect('shake', 'slow');
        gameLog('No one on your crew can break past this.');
        endTheRun();
    }
}

/** here, we're defeating a security measure using one of our crew members */
function iceBreak() {
    // Compare strength! Is our card stronger?
    if ($(this).data().strength >= currentOpponent.data().strength && $(this).data().color === currentOpponent.data().color) {
        // and do we have enough money to break through? Crew members have different costs.
        if (gameState.playerCash >= ($(this).data().break)) {
            charge($(this).data().break);
            gameLog(`${$(this).data().name} broke past the ${currentOpponent.data().name}!`);
            if (runDepth < 1) {
                robBank();
            } else if (runDepth >= 1) {
                approach();
            }
        } else {
            // if we don't have enough money, womp womp
            $('.credits').effect('shake', 'slow');
            currentOpponent.effect('shake', 'slow');
            gameLog('You can\'t afford to break past this security measure.');
            endTheRun();
        }
    }
}

/** ends the run, reactivates non-run actions like drawing */
function endTheRun() {
    gameLog('The run came to an end.');
    $('.man').removeClass('focused');
    $('.marker').css('display', 'none');
    $('.marker').appendTo($('body'));
    $('.run-arrow').css('display', 'flex');
    gameState.running = false;
    gameState.insideMan = false;
    spendClick(0);
}

// we need a flee/getaway/jack out function here

/** increase player's score when they rob a bank */
function robBank() {
    gameLog('Success! You made it into the bank!');
    $(gameState.currentServer).children('.run-arrow').removeClass('run-arrow');
    $(gameState.currentServer).children('.bank').removeClass('bank');
    $(gameState.currentServer).children().children().remove();
    $(gameState.currentServer).css('filter', 'grayscale(100%) blur(0.5em)');
    $(gameState.currentServer).removeClass('server');
    gameState.running = false;
    // add to these next two with some exciting animation for robbing the bank
    gameState.playerScore++;
    $('#playerscore h1').text(gameState.playerScore);
    endTheRun();
}

/** the powers that be are moving! */
function corpTurn() {
    gameState.playersTurn = false;
    gameLog('The powers that be are moving.');
    const secNow = $('.security').length;
    let truckCount = 0;
    // randomly determine where computer will put trucks and security
    for (let i = 0; i < 2; i++) {
        const rando = Math.floor(Math.random() * (7 - 1)) + 0;

        if (rando < 2 && !gameState.gameOver) {
            placeSec();
        } else if (rando >= 3 && !gameState.gameOver) {
            truckCount++;
        }
    }
    if (!gameState.gameOver) {
        if ($('.security').length > secNow) {
            gameLog('New security measures are in place.');
        }
        if (truckCount > 0) {
            addTruck(truckCount);
            gameLog('Trucks have arrived to secure the loot.');
        }
        playerTurn();
    }
}

/** adding a truck to the bank, if 3 trucks, corp can score */
function addTruck(trucks) {
    for (let i = 0; i < trucks; i++) {
    // pick a random bank
        const banksLeft = $('.bank').length;
        const rando = Math.floor(Math.random() * (banksLeft - 0)) + 0;
        const targetBank = $('.bank').eq(rando);
        // check for first open place to put a truck
        targetBank.data().trucks++;
        for (let i = 0; i < targetBank.data().trucks; i++) {
            targetBank.children(`.truck:eq(${i})`).fadeIn(1000).css('display', 'inline-block');
        }
        if (targetBank.data().trucks >= 3) {
            gameLog('Trucks start to pull away with the loot. It\'s too late to rob this bank.');
            gameState.corpScore++;
            $('#corpscore h1').text(gameState.corpScore);
            gameState.currentServer = targetBank.parent();
            targetBank.removeClass('bank');
            $(gameState.currentServer).children('.run-arrow').css('display', 'none');
            $(gameState.currentServer).children('.run-arrow').removeClass('run-arrow');
            $(gameState.currentServer).children().children().remove();
            $(gameState.currentServer).css('filter', 'sepia(100%) blur(0.5em)');
            $(gameState.currentServer).removeClass('server');

            checkForWin();
        }
    }
}

/** starting the player's turn */
function playerTurn() {
    // display a 'your turn' animation?
    gameLog('Your turn!');
    gameState.playersTurn = true;
    gameState.playerClicks = 4;
    $('.clicks h1').text(gameState.playerClicks);
}

/** checks scores to see if either player has won */
function checkForWin() {
    if (gameState.corpScore > 2 || gameState.playerScore > 2) {
        if (gameState.corpScore > 2) {
            gameLog('Your heist failed. The powers that be have won this round.');
            $('.banner').text('You lose!');
        } else if (gameState.playerScore > 2) {
            gameLog('You pulled it off! You and your crew are set for life.');
            $('.banner').text('You win!');
        }
        gameState.gameOver = true;

        $('.banner').slideDown(2000);
        $('.marker').css('display', 'none');
        gameState.running = true;
    }
}

// function roulette() {
//     console.log('spin that wheel!');
// }

$(document).ready(() => {
    // turning on game buttons
    $('.draw').click(clickToDraw);
    $('.credits').click(clickForCredit);
    $('.run-arrow').click(approach);
    // clicking 'you win' banner restarts game
    $('.banner').click(restartGame);
    // fixing tooltips - listening for new .tooltip objects and activating them
    $('body').on('mouseenter', '.tooltip:not(.tooltipstered)', function() {
        $(this)
            .tooltipster({
                theme: 'tooltipster-borderless',
                animation: 'fade',
                delay: 200

            })
            .tooltipster('show');
    });
    // popping up intro dialog
    $('.popup').dialog({
        dialogClass: 'no-close',
        open: function() {
            $('.popup').css('display', 'flex');
        },
        close: function() {
            $('.popup').css('display', 'none');
            $('.board').css('filter', 'none');
        },
        buttons: [
            {
                text: 'I\'m ready to rob!',
                click: function() {
                    $(this).dialog('close');
                }
            },
            {
                text: 'Walk me through this.',
                click: function() {
                    $(this).dialog('close');
                    introJs().start();
                }
            }
        ]
    });

    // making cards draggable
    $('.man').draggable({
        start: function(event, ui) {
            $(this)
                .addClass('glow');
        },
        stop: function(event, ui) {
            $(this)
                .removeClass('glow');
        }
    });
    // turning parts of board into drop targets
    // this code also handles adding members to your crew
    $('.crew, .cardslot').droppable({

        drop: function(event, ui) {
            if (!$.trim($(this).html()) && !gameState.running) {
                if ($(this).hasClass('crew')) {
                    const cost = $(ui.draggable).data().cost;
                    if (gameState.playerCash >= cost) {
                        if (gameState.playerClicks) {
                            gameLog(`You added ${$(ui.draggable).data().name} to your crew.`);
                            charge(cost);
                            spendClick();
                            $(this)
                                .addClass('ui-droppable-active');
                            $(ui.draggable).detach().css('top', '-1vw').css('left', '-1vw')
                                .appendTo(this);
                            $(ui.draggable).draggable('disable');
                        } else {
                            $('.clicks').effect('shake', 'slow');
                            $(ui.draggable)
                                .delay(800)
                                .queue(function(next) {
                                    $(this).css('top', '-1vw').css('left', '-1vw');
                                    next();
                                });
                        }
                    } else {
                        $('.credits').effect('shake', 'slow');
                        gameLog('You can\'t afford to hire this person for your crew.');
                        $(ui.draggable)
                            .delay(800)
                            .queue(function(next) {
                                $(this).css('top', '-1vw').css('left', '-1vw');
                                next();
                            });
                    }
                } else {
                    $(this)
                        .addClass('ui-droppable-active');
                    $(ui.draggable).detach().css('top', '-1vw').css('left', '-1vw')
                        .appendTo(this);
                }
            } else {
                $('.marker').effect('shake', 'slow');
                $(ui.draggable)
                    .delay(800)
                    .queue(function(next) {
                        $(this).css('top', '-1vw').css('left', '-1vw');
                        next();
                    });
            }
        }
    });

    // put code for swapping cards here?
    initGame();
});
