# Price is Precise

Price is Precise is a game about guessing Facebook marketplace listing prices for bizarre items, hosted on Twitch. This is a full-stack application to facilitate playing the game.

In other words this is a [Jackbox Games](https://www.jackboxgames.com/) clone built for fun to support [my friend Joel](https://www.joeltodero.com/), the host of the show.

This is a Next.js app requiring a PostgreSQL database for game data (users, teams, questions), a Redis K/V store for game state, and an integration with [Pusher](https://pusher.com/) for syncing the game state with the end user.
