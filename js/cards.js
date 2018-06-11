const cards = [
    {
        cardNum: 0,
        name: 'Danny',
        type: 'crew',
        img: 'img/01.jpg',
        color: 'red',
        cost: 2,
        strength: 2,
        break: 2
    },
    {
        cardNum: 1,
        name: 'Rusty',
        type: 'crew',
        img: 'img/02.jpg',
        color: 'green',
        cost: 2,
        strength: 2,
        break: 2
    },
    {
        cardNum: 2,
        name: 'Linus',
        type: 'crew',
        img: 'img/03.jpg',
        color: 'blue',
        cost: 2,
        strength: 2,
        break: 2
    },
    {
        cardNum: 3,
        name: 'Tess',
        type: 'crew',
        img: 'img/04.jpg',
        color: 'yellow',
        cost: 2,
        strength: 2,
        break: 2
    },
    {
        cardNum: 4,
        name: 'Logan',
        type: 'crew',
        img: 'img/05.jpg',
        color: 'red',
        cost: 4,
        strength: 3,
        break: 1
    },
    {
        cardNum: 5,
        name: 'Yanny',
        type: 'crew',
        img: 'img/06.jpg',
        color: 'green',
        cost: 4,
        strength: 3,
        break: 1
    },
    {
        cardNum: 6,
        name: 'Laurel',
        type: 'crew',
        img: 'img/07.jpg',
        color: 'blue',
        cost: 4,
        strength: 3,
        break: 1
    },
    {
        cardNum: 7,
        name: 'Nathan',
        type: 'crew',
        img: 'img/08.jpg',
        color: 'yellow',
        cost: 4,
        strength: 3,
        break: 1
    },
    // {
    //     cardNum: 8,
    //     name: 'Eliot',
    //     type: 'crew',
    //     img: 'img/01.jpg',
    //     color: 'red',
    //     cost: 6,
    //     strength: 4,
    //     break: 1
    // },
    // {
    //     cardNum: 9,
    //     name: 'Alec',
    //     type: 'crew',
    //     img: 'img/02.jpg',
    //     color: 'green',
    //     cost: 6,
    //     strength: 4,
    //     break: 1
    // },
    // {
    //     cardNum: 10,
    //     name: 'Parker',
    //     type: 'crew',
    //     img: 'img/03.jpg',
    //     color: 'blue',
    //     cost: 6,
    //     strength: 4,
    //     break: 1
    // },
    // {
    //     cardNum: 10,
    //     name: 'Sophie',
    //     type: 'crew',
    //     img: 'img/04.jpg',
    //     color: 'yellow',
    //     cost: 6,
    //     strength: 4,
    //     break: 1
    // },
    {
        cardNum: 11,
        name: 'Lucky Break',
        type: 'event',
        img: 'img/e01.jpg',
        cost: 5,
        use: function() {
            charge(-9);
        },
        effect: 'Gain $9'
    },
    // {
    //     cardNum: 12,
    //     name: 'Lucky Break',
    //     type: 'event',
    //     img: 'img/e01.jpg',
    //     cost: 5,
    //     use: function() {
    //         charge(-9);
    //     },
    //     effect: 'Gain $9'
    // },
    {
        cardNum: 13,
        name: 'Lucky Break',
        type: 'event',
        img: 'img/e01.jpg',
        cost: 5,
        use: function() {
            charge(-9);
        },
        effect: 'Gain $9'
    },
    {
        cardNum: 14,
        name: 'Lucky Break',
        type: 'event',
        img: 'img/e01.jpg',
        cost: 5,
        use: function() {
            charge(-9);
        },
        effect: 'Gain $9'
    },
    // {
    //     cardNum: 15,
    //     name: 'Pennies from Heaven',
    //     type: 'event',
    //     img: 'img/e02.jpg',
    //     cost: 0,
    //     use: function() {
    //         charge(-2);
    //     },
    //     effect: 'Gain $2'
    // },
    {
        cardNum: 16,
        name: 'Pennies from Heaven',
        type: 'event',
        img: 'img/e02.jpg',
        cost: 0,
        use: function() {
            charge(-2);
        },
        effect: 'Gain $2'
    },
    {
        cardNum: 17,
        name: 'Pennies from Heaven',
        type: 'event',
        img: 'img/e02.jpg',
        cost: 0,
        use: function() {
            charge(-2);
        },
        effect: 'Gain $2'
    },
    {
        cardNum: 18,
        name: 'Pennies from Heaven',
        type: 'event',
        img: 'img/e02.jpg',
        cost: 0,
        use: function() {
            charge(-2);
        },
        effect: 'Gain $2'
    },
    // {
    //     cardNum: 19,
    //     name: 'Inside Man',
    //     type: 'event',
    //     img: 'img/e03.jpg',
    //     cost: 2,
    //     use: function() {
    //         gameState.insideMan = true;
    //     },
    //     effect: 'On your next run, bypass the first layer of security.'
    // },
    {
        cardNum: 20,
        name: 'Inside Man',
        type: 'event',
        img: 'img/e03.jpg',
        cost: 2,
        use: function() {
            gameState.insideMan = true;
        },
        effect: 'On your next run, bypass the first layer of security.'
    }
    // {
    //     cardNum: 21,
    //     name: 'Roulette',
    //     type: 'event',
    //     img: 'img/e04.jpg',
    //     cost: 2,
    //     use: function() {
    //         roulette();
    //     },
    //     effect: 'Scramble all security measures. Use only as a last resort.'
    // }

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
