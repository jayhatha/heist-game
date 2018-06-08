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
        corpScore: null
    }
];

/** object with test cards, will move to JSON? */
const cards = [
    {
        cardNum: 0,
        name: 'Danny',
        img: 'img/01.jpg',
        color: 'red',
        cost: 2,
        strength: 2,
        break: 2
    },
    {
        cardNum: 1,
        name: 'Rusty',
        img: 'img/02.jpg',
        color: 'green',
        cost: 2,
        strength: 2,
        break: 2
    },
    {
        cardNum: 2,
        name: 'Linus',
        img: 'img/03.jpg',
        color: 'blue',
        cost: 3,
        strength: 1,
        break: 1
    },
    {
        cardNum: 3,
        name: 'Tess',
        img: 'img/04.jpg',
        color: 'yellow',
        cost: 3,
        strength: 2,
        break: 2
    }
];
// list of all available security tiles
const securityMeasures = [
    {
        cardNum: 'sec0',
        name: 'Electrified Fence',
        img: 'img/sec01.jpg',
        color: 'green',
        cost: 2,
        strength: 2,
        subs: 2
    },
    {
        cardNum: 'sec1',
        name: 'Rent-a-Cop',
        img: 'img/sec02.jpg',
        color: 'red',
        cost: 1,
        strength: 1,
        subs: 1
    },
    {
        cardNum: 'sec2',
        name: 'Reinforced Door',
        img: 'img/sec03.jpg',
        color: 'yellow',
        cost: 1,
        strength: 2,
        subs: 1
    },
    {
        cardNum: 'sec3',
        name: 'Retina Scanner',
        img: 'img/sec04.jpg',
        color: 'blue',
        cost: 1,
        strength: 1,
        subs: 1
    },
    {
        cardNum: 'sec3',
        name: 'Retina Scanner',
        img: 'img/sec04.jpg',
        color: 'blue',
        cost: 1,
        strength: 1,
        subs: 1
    },
    {
        cardNum: 'sec3',
        name: 'Retina Scanner',
        img: 'img/sec04.jpg',
        color: 'blue',
        cost: 1,
        strength: 1,
        subs: 1
    },
    {
        cardNum: 'sec0',
        name: 'Electrified Fence',
        img: 'img/sec01.jpg',
        color: 'green',
        cost: 2,
        strength: 2,
        subs: 2
    },
    {
        cardNum: 'sec1',
        name: 'Rent-a-Cop',
        img: 'img/sec02.jpg',
        color: 'red',
        cost: 1,
        strength: 1,
        subs: 1
    },
    {
        cardNum: 'sec2',
        name: 'Reinforced Door',
        img: 'img/sec03.jpg',
        color: 'yellow',
        cost: 1,
        strength: 2,
        subs: 1
    },
    {
        cardNum: 'sec0',
        name: 'Electrified Fence',
        img: 'img/sec01.jpg',
        color: 'green',
        cost: 2,
        strength: 2,
        subs: 2
    },
    {
        cardNum: 'sec1',
        name: 'Rent-a-Cop',
        img: 'img/sec02.jpg',
        color: 'red',
        cost: 1,
        strength: 1,
        subs: 1
    },
    {
        cardNum: 'sec2',
        name: 'Reinforced Door',
        img: 'img/sec03.jpg',
        color: 'yellow',
        cost: 1,
        strength: 2,
        subs: 1
    },
    {
        cardNum: 'sec0',
        name: 'Electrified Fence',
        img: 'img/sec01.jpg',
        color: 'green',
        cost: 2,
        strength: 2,
        subs: 2
    },
    {
        cardNum: 'sec1',
        name: 'Rent-a-Cop',
        img: 'img/sec02.jpg',
        color: 'red',
        cost: 1,
        strength: 1,
        subs: 1
    },
    {
        cardNum: 'sec2',
        name: 'Reinforced Door',
        img: 'img/sec03.jpg',
        color: 'yellow',
        cost: 1,
        strength: 2,
        subs: 1
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

/** fetches the card list and puts it in deck array -- this should be condensed with initsec*/
function initDeck() {
    for (let i = 0; i < cards.length; i++) { // replace this with JSON object eventually
        cardsInDeck.push(cards[i]);
    }
}

/** fetches all security measures and puts them in the corp's pool */
function initSec() {
    for (let i = 0; i < securityMeasures.length; i++) { // replace this with JSON object eventually
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
    gameState.playerScore = 0;
    gameState.corpScore = 0;
    $('#corpscore').click(addTruck);
    $('#playerscore').append(`<h1>${gameState.playerScore}</h1>`);
    $('#corpscore').append(`<h1>${gameState.corpScore}</h1>`);
    $('.bank').data('trucks', 0);
    $('.credits').append(`<h1>${gameState.playerCash}</h1>`);
    gameState.playerClicks = 4;
    $('.clicks').append(`<h1>${gameState.playerClicks}</h1>`);
    $('.deck').click(clickToDraw);
    $('.credits').click(clickForCredit);
    $('.run-arrow').click(approach);
}

/** adds a status message to the game log window, to let the player know what just happened
* @param {string} stringToLog is the message to display
*/
function gameLog(stringToLog) {
    $(`<p>> ${stringToLog}<p>`).appendTo('#gamelog');
    $('#gamelog').animate({ scrollTop: $('#gamelog').get(0).scrollHeight }, 2000);
}

/** subtracts credits from player's bank, updates bank display
* @param {number} cost The cost in credits
*/
function charge(cost) {
    gameState.playerCash = gameState.playerCash - cost;
    $('.credits h1').text(gameState.playerCash);
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
            $(gameState.firstOpen).append(`<div class='card sm-sq tooltip ${cardsInDeck[0].cardNum}'><img src='${cardsInDeck[0].img}'></div>`).hide().fadeIn(400);
            $(`.${cardsInDeck[0].cardNum}`).data(cardsInDeck[0]);
            const cardInfo = $('<div>', { id: `tool${cardsInDeck[0].cardNum}` });
            $(cardInfo).append(`<img src='${cardsInDeck[0].img}'>`);
            $(cardInfo).append(`<h1>${cardsInDeck[0].name}</h1>`);
            $(cardInfo).append(`<h2> Cost to Hire: ${cardsInDeck[0].cost}</h2>`);
            $(cardInfo).append(`<h2> Strength: ${cardsInDeck[0].strength}</h2>`);
            $(cardInfo).append(`<h2> Cost to Break Security: ${cardsInDeck[0].break}</h2>`);
            $(cardInfo).appendTo('.tooltip_templates');
            $(`.${cardsInDeck[0].cardNum}`).attr('data-tooltip-content', `#tool${cardsInDeck[0].cardNum}`);

            fixTooltips();
            cardsInDeck.shift();
            $('.card').draggable({
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
    gameLog('You drew a card.');
    gameState.cardsInHand = $('.cardslot > div').length;
    if (gameState.cardsInHand < 5 && gameState.playerClicks && cardsInDeck.length > 0 && !gameState.running) {
        spendClick();
        drawCards(1);
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
        console.log($(targetServer).children().children('.security').length);
        // check for first open slot
        $(targetServer).children('.secslot').each(function checkForOpen() {
            if (!$.trim($(this).html()).length) {
                gameState.firstSecOpen = `#${this.id}`;
                return false;
            }
        });
        if ($(targetServer).children().children('.security').length < 3) {
            // place next available security there
            $(gameState.firstSecOpen).append(`<div class='security rect tooltip ${securityPool[0].cardNum}'><img src='img/cardback.jpg'</div>`).hide().fadeIn(1000);
            $(`.${securityPool[0].cardNum}`).data(securityPool[0]);
            fixTooltips();
            securityPool.shift();
        } else if (!gameState.playersTurn) {
            addTruck();
        } else {
            placeSec(1);
        }
    }
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
    gameState.running = true; // and turn off all the actions that aren't allowed during a run
    currentOpponent = $(gameState.currentServer).children('.secslot').children('.security').eq(runDepth); // determine which security card we're interacting with
    currentOpponent.children('img').attr('src', currentOpponent.data().img); // "flip over" the hidden security card the first time it's encountered
    // updating the security card's tooltip to show its stats
    const secInfo = $('<div>', { id: `tool${currentOpponent.data().cardNum}` });
    $(secInfo).append(`<img src='${currentOpponent.data().img}'>`);
    $(secInfo).append(`<h1>${currentOpponent.data().name}</h1>`);
    $(secInfo).append(`<h2> Strength: ${currentOpponent.data().strength}</h2>`);
    $(secInfo).appendTo('.tooltip_templates');
    $(`.${currentOpponent.data().cardNum}`).attr('data-tooltip-content', `#tool${currentOpponent.data().cardNum}`);
    $(`.${currentOpponent.data().cardNum}`).attr('title', 'testing');
    fixTooltips();
    $('.marker').css('display', 'block');
    $('.marker').fadeTo(400, 0.5).appendTo(currentOpponent); // point the run indicator arrow at the current position
    gameLog(`You ran into a(n) ${currentOpponent.data().name}!`);
    checkBreakers();
}

/** checks our player cards to see if any of them can beat the current security card*/
function checkBreakers() {
    $('.card').removeClass('focused');
    // do we have a card with the same color and a high enough strength score?
    // if so, we add a click handler that lets it break that security card
    $('.crew > .card').each(function() {
        if ($(this).data().strength >= currentOpponent.data().strength && $(this).data().color === currentOpponent.data().color) {
            console.log($(this).data().color);
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
    $('.card').removeClass('focused');
    $('.marker').css('display', 'none');
    $('.marker').appendTo($('body'));
    $('.run-arrow').css('display', 'block');
    gameState.running = false;
    spendClick(0);
}

// we need a flee/getaway/jack out function here

/** increase player's score when they rob a bank */
function robBank() {
    gameLog('Success! You made it into the bank!');
    $(gameState.currentServer).children('.run-arrow').remove();
    $(gameState.currentServer).children('.bank').removeClass('bank');
    $(gameState.currentServer).children().children().remove();
    $(gameState.currentServer).css('filter', 'grayscale(100%) blur(0.5em)');
    $(gameState.currentServer).removeClass('server');
    gameState.running = false;
    // replace these next two with some exciting animation for robbing the bank
    gameState.playerScore++;
    $('#playerscore h1').text(gameState.playerScore);
    endTheRun();
}

/** the powers that be are moving! */
function corpTurn() {
    gameState.playersTurn = false;
    gameLog('The powers that be are moving.');
    const secNow = $('.security').length;
    // randomly determine where computer will put trucks and security
    for (let i = 0; i < 3; i++) {
        const rando = Math.floor(Math.random() * (6 - 1)) + 0;
        if (rando === 0 && gameState.gameOver === false) {
            placeSec();
        } else {
            addTruck();
        }
    }
    if (gameState.gameOver === false) {
        gameLog('More trucks have arrived to secure the loot.');
        if ($('.security').length > secNow) {
            gameLog('New security measures are in place.');
        }
        playerTurn();
    }
}

/** adding a truck to the bank, if 3 trucks, corp can score */
function addTruck() {
    const banksLeft = $('.bank').length;
    const rando = Math.floor(Math.random() * (banksLeft - 0)) + 0;
    const targetBank = $('.bank').eq(rando);
    // check for first open slot
    targetBank.data().trucks++;
    for (let i = 0; i < targetBank.data().trucks; i++) {
        targetBank.children(`.truck:eq(${i})`).fadeIn(1000).css('display', 'inline-block');
    }
    if (targetBank.data().trucks >= 3) {
        gameLog('Trucks start to pull away with the loot. It\'s too late to rob this bank.');
        gameState.corpScore++;
        $('#corpscore h1').text(gameState.corpScore);
        targetBank.removeClass('bank');
        gameState.currentServer = targetBank.parent();
        $(gameState.currentServer).children('.run-arrow').remove();
        $(gameState.currentServer).css('filter', 'sepia(100%) blur(0.5em)');
        $(gameState.currentServer).removeClass('server');
        $(gameState.currentServer).children().children().remove();
        checkForWin();
    }
}

/** starting the player's turn */
function playerTurn() {
    // display the 'your turn' animation
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
            return false;
        } else if (gameState.playerScore > 2) {
            gameLog('You pulled it off! You and your crew are set for life.');
        }
        gameState.gameOver = true;
        $('.marker').css('display', 'none');
    }
}

$(document).ready(() => {
    // fixing tooltips
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
                text: 'Let\'s rob!',
                click: function() {
                    $(this).dialog('close');
                }
            }
        ]
    });

    // making cards draggable
    $('.card').draggable({
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
                            $(ui.draggable).detach().css({ top: -13.57, left: -12.5 }).appendTo(this);
                            $(ui.draggable).draggable('disable');
                        } else {
                            $('.clicks').effect('shake', 'slow');
                            $(ui.draggable)
                                .delay(800)
                                .queue(function(next) {
                                    $(this).css({ top: -13.57, left: -12.5 });
                                    next();
                                });
                        }
                    } else {
                        $('.credits').effect('shake', 'slow');
                        gameLog('You can\'t afford to hire this person for your crew.');
                        $(ui.draggable)
                            .delay(800)
                            .queue(function(next) {
                                $(this).css({ top: -13.57, left: -12.5 });
                                next();
                            });
                    }
                } else {
                    $(this)
                        .addClass('ui-droppable-active');
                    $(ui.draggable).detach().css({ top: -13.57, left: -12.5 }).appendTo(this);
                }
            } else {
                $('.marker').effect('shake', 'slow');
                $(ui.draggable)
                    .delay(800)
                    .queue(function(next) {
                        $(this).css({ top: -13.57, left: -12.5 });
                        next();
                    });
            }
        }
    });

    // put code for swapping cards here?
    initGame();
});
