*Update 8/23:* Cleaned up the main game loop (a little bit). Began adding unit tests with QUnit for easier debugging if I want to make more changes later.   

# **HEIST**

*The heist is on ...*

You're a professional thief looking to get out of the game, and the perfect opportunity has just presented itself. Four high-profile locations around the city are changing security contractors on the same night. During the switchover, they'll all be vulnerable. If you can take down even three of them before their new security is in place, you'll be set for life. Now it's time to assemble your crew, scout the locations, and pull one last job.  

** How to Play **

Your objective is to rob three of the five possible banks before the computer can secure them. To do this, you'll assemble your crew and start a run on one of the banks, progressing past any security measures to reach your goal.

You have four actions to spend each turn, and you can use them to do any of four things:

*Draw a card*
These could be crew members you can recruit, or events that help you get the job done.

*Play a card or add a new member to your crew*
Click on an event in your hand to play it. Drag a crew member to the board to hire them.

*Gain $1*
You'll need money to play your cards and break through the bank's security.

*Attack a bank*
This is the heart of the game. Click on the arrow below each bank column to start a run.

If the bank is undefended, you can walk right in and score a point.

If it has security, though, you'll need your crew to break through. When you encounter a security measure, break it by clicking on a crew member who matches that security measure's *color* and whose *strength* matches or beats the security's.

Pro Tip: Hovering over a card reveals its stats.

When you spend all your actions, it's the bank's turn. The computer can add additional security or bring in trucks to relocate the loot before you can steal it. If three trucks reach a bank, you've missed your chance to rob it and the computer scores.

The first side to claim three banks is the winner.


**Installation Instructions**

Just clone this repo and open index.html, or play the [hosted version](https://jayhatha.github.io/heist-game/).

**How to Play**

You're a veteran bank robber assembling a crew to rob three

**My Process**

*Maybe I could make Netrunner? Hmm ...*

I've been into competitive card games, starting with Magic: The Gathering in elementary school. More recently, I've enjoyed a game called [Android: Netrunner](https://www.fantasyflightgames.com/en/products/android-netrunner-the-card-game/) — an asymmetric game of hidden information.

In Netrunner's cyberpunk-themed world, one player is a powerful corporation, and the other is a scrappy hacker trying to take the corp down. The corp tries to advance its agendas, protecting them with security programs. The runner tries to break through and steal the agendas before that happens.

I didn't think I could recreate Netrunner in a week. The game is incredibly complex. There's an open-source online version at Jinteki.net that helped provide some inspiration, but its huge feature set and its technologies—mostly Clojure and React—are outside the scope and time box of my project.

I liked the idea of a card game with hidden info and a visual progression across the playing field, but I was going to have to simplify it a lot.

*The Heist Is On*

The week before we started work on the project, I heard about "[One Last Job](https://www.kickstarter.com/projects/briangcronin/one-last-job-a-heist-card-game)," a heist-themed Kickstarter card game by two Netrunner players. It's almost as complex as Netrunner, so I wouldn't be able to recreate it in a week, but the theme was perfect. The heist film is one of my favorite movie genres, and it fits with the asymmetric kind of game I wanted to make. One side starts with all the power, and the other has to overcome that with a combination of luck and skill.

So, "Heist," then! I had a theme.

Next up: how to turn that into a Minimum Viable Netrunner?

*Making the Rules*

The core of Netrunner is the interaction between the corporation's "ice," its security software, and the runner's "icebreaker" programs. If my game only had two types of cards, it'd have to be those.

In the Heist metaphor, the "ice" becomes walls, traps, doors, and security guards. The "icebreakers" are the crew — the characters who specialize in getting around them.

As long as we have that, and a visual indication of moving forward toward the goal, we've got a game.

Although the actual gameplay is simple, I built with an eye toward expandability. Given enough time, I could build Netrunner on top of the Heist game.

**Technologies Used**

* HTML (word to flex-box) / CSS / JS  
* jQuery  
* jQuery UI (particularly draggable, droppable)  
* [Intro.js](https://introjs.com) for the tutorial popups  
* [Tooltipster](http://iamceege.github.io/tooltipster/) for the expanded cards on hover
- [jQuery Touch Punch](http://touchpunch.furf.com) to make dragging and dropping work on iOS.

**Biggest Wins and Challenges**

*Making "Cards"*
The biggest challenge of the whole project was getting the divs to "act" like game cards, with all the data of a card object attached. Luckily, I stumbled on jQuery's .data() method while I was reading documentation, and it did exactly what I needed. Once appended, the card data persisted even when I moved the card divs from one parent element to another. Thank you, jQuery!

*Wrangling "This"*
I spent more time than I expected on making the central "run" interaction recursive instead of creating new functions for each "level" the player passes on the way to the bank. The problem was that two functions relied on "$(this)," but it referred to a different object by the end of the first loop. This was a good learning opportunity, though, and I discovered that event.target was a better tool for the job.

Another huge win was finally getting the tooltips working the way I had envisioned. It would have been much easier if I had noticed I was inconsistently capitalizing one of my variables. That lesson will stick with me, though, because I spent half a day of project week learning it the hard way. Always check your cases, kids!

**Unsolved Problems**

Heist functions the way I envisioned it, but I have a long list of features I'd like to add to increase its complexity and replay value. Right now, it's a fun toy, but it could be a rich and interesting game, even if it's not exactly Netrunner.

Here's where I'd start:

On the bank side: security would be able to do things other than bounce the player out of the run—it would take away money or actions, or even discard crew members.

Also, a more sophisticated AI player would place security that counters the player's current crew, rather than at random.

To make up for the additional challenge, the computer wouldn't be able to place trucks as often, which would extend the game and make the player's actions matter more.

On the player side: more special cards would help increase money, bypass security, or even shuffle the board to create a chance to break an unwinnable position.

Ideally, most games would be a race against the clock, and player wins would feel hard-fought. It would take 5 or 10 minutes to play a round, not the minute or so it takes now.

** In Conclusion **

Making this game was a fun experience, and I learned a lot from it. There are parts that are still a little janky, but I like the bones of the thing. By the end of the week, it didn't take much effort to figure out how to add new gameplay features.

** Photo Credits **

[Theen Moy](https://www.flickr.com/photos/theenmoy/5554943156/)/Flickr (CC BY-NC-SA 2.0)

[Scot Alexander](https://flic.kr/p/5q8qw4)/Flickr (CC BY-NC-SA 2.0)  

[cmh2315fl](https://flic.kr/p/p4ZLkK)/Flickr (CC BY-NC 2.0)

[domiriel](https://www.flickr.com/photos/domiriel/6122146596/)/Flickr  (CC BY-NC 2.0)

[Emiliano Grusovin](https://www.flickr.com/photos/emiliano-iko/12769096263/)/Flickr (CC BY-NC-SA 2.0)

[James Higgott](https://www.flickr.com/photos/higgott/5450137989/)/Flickr (CC BY-NC-SA 2.0)
