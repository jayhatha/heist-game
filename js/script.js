const gameState = [
    {
        gameOver: null,
        running: 0,
        whoseTurn: 'player',
        playerCash: null,
        playerClicks: null,
        corpCash: 5,
        corpClicks: 3,
        currentServer: null,
        cardsInHand: null,
        firstOpen: null,
        firstSecOpen: null,
        currentOpponent: null,
        hand1: null,
        hand2: null,
        hand3: null,
        hand4: null,
        hand5: null,
        crew1: null,
        crew2: null,
        crew3: null,
        crew4: null
    }
];

/** object with test cards, will move to JSON? */
const cards = [
    {
        cardnum: 0,
        name: 'Danny',
        img: 'img/01.jpg',
        color: 'red',
        cost: 2,
        strength: 2,
        break: 2
    },
    {
        cardnum: 1,
        name: 'Rusty',
        img: 'img/02.jpg',
        color: 'green',
        cost: 1,
        strength: 1,
        break: 1
    }
];
// list of all available security tiles
const securityMeasures = [
    {
        cardnum: 'sec0',
        name: 'Electrified Fence',
        img: 'img/sec01.jpg',
        color: 'green',
        cost: 2,
        strength: 2,
        subs: 2
    },
    {
        cardnum: 'sec1',
        name: 'Rent-a-Cop',
        img: 'img/sec02.jpg',
        color: 'red',
        cost: 1,
        strength: 1,
        subs: 1
    }
];

const securityPool = []; // the corp's deck, basically
const cardsInDeck = [];

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
    gameState.gameOver = false;
    gameState.running = 0;
    initDeck();
    initSec();
    shuffleDeck(cardsInDeck);
    shuffleDeck(securityPool);
    placeSec(2);
    gameState.playerCash = 100;
    $('.credits').append(`<h1>${gameState.playerCash}</h1>`);
    gameState.playerClicks = 4;
    $('.clicks').append(`<h1>${gameState.playerClicks}</h1>`);
    $('.deck').click(clickToDraw);
    $('.run-arrow').click(approach);
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
}

/** basic card drawing function
* @param {number} draws is the number of cards to draw
*/
function drawCards(draws) {
    // is there an open cardslot? are there cards remaining in the deck?
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
            $(gameState.firstOpen).append(`<div class='card sm-sq ${cardsInDeck[0].cardnum}'><img src='${cardsInDeck[0].img}'</div>`);
            $(`.${cardsInDeck[0].cardnum}`).data(cardsInDeck[0]);
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

/** function for the player action of spending a click to draw a card */
function clickToDraw() {
    gameState.cardsInHand = $('.cardslot > div').length;
    if (gameState.cardsInHand < 5 && gameState.playerClicks && cardsInDeck.length > 0 && !gameState.running) {
        spendClick();
        drawCards(1);
    }
}

/** function for the corp to place security measures, need to make this loop x times
* @param {string} ice is the number of cards to place
*/
function placeSec(ice) {
    for (let i = 0; i < ice; i++) {
    // choose a random bank
        const rando = Math.floor(Math.random() * (4 - 0)) + 0;
        // check for first open slot
        $('.server').eq(rando).children('.secslot').each(function() {
            if (!$.trim($(this).html())) {
                gameState.firstSecOpen = `#${this.id}`;
                return false;
            }
        });
        // place next available security there
        $(gameState.firstSecOpen).append(`<div class='security rect ${securityPool[0].cardnum}'><img src='img/cardback.jpg'</div>`);
        $(`.${securityPool[0].cardnum}`).data(securityPool[0]);
        const testSec = $(`.${securityPool[0].cardnum}`).data();
        securityPool.shift();
    }
}

/** start run! */
function approach(e) {
    if (gameState.playerClicks > 0) {
        spendClick(1);
        if (!gameState.running) {
            gameState.currentServer = $(e.currentTarget).parents('.server');
            $('.run-arrow').css('display', 'none');
            if ($(gameState.currentServer).children().children('.security').length > 0) {
                runDepth = $(gameState.currentServer).children().children('.security').length;
            } else {
                console.log($(gameState.currentServer).children().children('.security').length);
                robBank();
                return false;
            }
        }
        runDepth--;
        gameState.running = true;
        currentOpponent = $(gameState.currentServer).children('.secslot').children('.security').eq(runDepth);
        currentOpponent.children('img').attr('src', currentOpponent.data().img);
        $('.marker').css('display', 'block');
        $('.marker').fadeTo(400, 0.5).appendTo(currentOpponent);
        checkBreakers();
    }
}

/** checks our player cards to see if any of them can break the ice */
function checkBreakers() {
    $('.card').off();
    $('.card').removeClass('focused');
    $('.crew > .card').each(function() {
        if ($(this).data().strength >= currentOpponent.data().strength && $(this).data().color === currentOpponent.data().color) {
            console.log($(this).data().color);
            $(this).addClass('focused');
            $(this).click(iceBreak);
            console.log('in second function our breaker is', $(this));
            console.log('in second function our opponent is', currentOpponent);
        }
    });
    if ($('.focused').length === 0) {
        console.log('You cant break thru there.');
        endTheRun();
    }
}

/** here, we're defeating a security measure using one of our crew members */
function iceBreak() {
    console.log(`${$(this).data().strength} vs ${currentOpponent.data().strength}`);
    if ($(this).data().strength >= currentOpponent.data().strength && $(this).data().color === currentOpponent.data().color) {
        if (gameState.playerCash >= ($(this).data().break)) {
            charge($(this).data().break);
            console.log('you broke it!');
            if (runDepth >= 1) {
                approach();
            } else if (runDepth < 1) {
                robBank();
            }
        } else {
            console.log('not enough cash to break');
        }
    }
}

/** ends the run, drops the runner back out */
function endTheRun() {
    $('.card').off();
    $('.card').removeClass('focused');
    $('.marker').css('display', 'none');
    $('.marker').appendTo($('body'));
    $('.run-arrow').css('display', 'block');
    gameState.running = false;
}

// we need a flee/getaway/jack out function here

/** the scoring function */
function robBank() {
    console.log('in the baaaank');
    gameState.running = false;
    // replace these next two with some exciting animation for robbing the bank
    $('.marker').css('display', 'block');
    $('.marker').fadeTo(400, 0.5).appendTo($(gameState.currentServer).children('.bank'));
    endTheRun();
}

$(document).ready(() => {
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
    $('.crew, .cardslot, .security').droppable({

        drop: function(event, ui) {
            if (!$.trim($(this).html())) {
                if ($(this).hasClass('crew')) {
                    const cost = $(ui.draggable).data().cost;
                    if (gameState.playerCash >= cost) {
                        charge(cost);
                        $(this)
                            .addClass('ui-droppable-active');
                        $(ui.draggable).detach().css({ top: -13.57, left: -12.5 }).appendTo(this);
                        $(ui.draggable).draggable('disable');
                    } else {
                        $('.credits').effect('shake', 'slow');
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
                    $(ui.draggable).detach().css({ top: -13.75, left: -12 }).appendTo(this);
                }
            }
        }
    });

    // put code for swapping cards here
    initGame();
});
