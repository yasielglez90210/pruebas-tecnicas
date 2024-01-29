import type { Match, Player } from './types';
// import { sleep } from './utils';

export const api = {
  match: {
    list: async (): Promise<Match[]> => {
      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS68tBL55yQJabHIQOYxp-5QYzSyFuCnjzFyMvP0bD13YD8x97bcocumE0r445UMy-FbCj2EHwpxvDR/pub?output=tsv',
        { next: { tags: ['matches'] } },
      );
      const text = await response.text();
      const rows = text.split('\n').slice(1);

      const matches = rows.map((row) => {
        const [date, team1, team2, goals1, goals2] = row.split('\t');
        return {
          date,
          team1,
          team2,
          goals1: parseInt(goals1),
          goals2: parseInt(goals2),
        };
      });

      return matches;
    },
  },
  player: {
    list: async (): Promise<Player[]> => {
      // await sleep(5000);
      const matches = await api.match.list();
      const players = new Map<string, Player>();

      for (const match of matches) {
        const { team1, team2, goals1, goals2 } = match;

        const team1Players = team1.split(',');
        const team2Players = team2.split(',');

        for (let playerName of team1Players) {
          playerName = playerName.trim();

          const player = players.get(playerName) || {
            name: playerName,
            matches: 0,
            score: 0,
          };

          player.matches++;
          player.score += goals1 - goals2;
          players.set(playerName, player);
        }

        for (let playerName of team2Players) {
          playerName = playerName.trim();

          const player = players.get(playerName) || {
            name: playerName,
            matches: 0,
            score: 0,
          };

          player.matches++;
          player.score += goals2 - goals1;
          players.set(playerName, player);
        }
      }

      return Array.from(players.values())
        .sort((a, b) => b.score - a.score)
        .map((playes) => ({
          ...playes,
          score: Math.round(playes.score / playes.matches),
        }));
    },
  },
};
