# Novuss clock [Novuss Clock App](https://ralfs-gutmanis.github.io/novuss-clock/#/)

Standard chess clock type timer for blitz version of Novuss.

## Blitz Terms

*Insta-loss* -- player loses immediately
*Main time* -- Game time that doesn't replenish
*Bonus time* -- Game time that replenishes per turn after main time has run out
*Turn* -- Shots player can make without giving a turn to the opponent
*Reserve Mother piece* -- Mother piece placed on the border of the board

## Rules

* When not specified otherwise, use default Novuss rules
* Each side gets 60 seconds of main time and 7 seconds of bonus time
* Each player must complete at least 1 full shot to pass time to other player, otherwise if player skips time without doing at least 1 full shot he receives an insta-loss.
* It is allowed to put reserve pieces on the border of the board
* Reserve mother piece must be on the border the board at all times
* If one player shoots mother piece into the pocket and the other player takes the reserve mother piece. The player who shoot the mother piece into the pocket must retrieve it from the pocket and place it back on the border, otherwise player receives an insta-loss
* If player has ended his turn but the mother piece is still moving, opponent can choose not to wait for the mother piece to stop and take it for his turn
* If player with direct shot moves his dark piece, he receives insta-loss
