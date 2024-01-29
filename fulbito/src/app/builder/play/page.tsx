import { api } from '@/lib/api';
import { Player } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function PlayPage({
  searchParams: { players: draftPlayers },
}: {
  searchParams: { players: string[] };
}) {
  const roster = await api.player.list();
  const players = draftPlayers
    .map(
      (name) =>
        roster.find((player) => player.name === name) ?? {
          name,
          matches: 0,
          score: 0,
        },
    )
    .sort((a, b) => b.score - a.score);

  const team1: Player[] = [];
  const team2: Player[] = [];

  for (const player of players) {
    if (team1.length > team2.length) {
      team2.push(player);
    } else {
      team1.push(player);
    }
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Equipo 1</TableHead>
          <TableHead className="text-right">Equipo 2</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: Math.max(team1.length, team2.length) }).map(
          (_, index) => (
            <TableRow key={index}>
              <TableCell>{team1[index]?.name ?? '-'}</TableCell>
              <TableCell className="text-right">
                {team2[index]?.name ?? '-'}
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>
            {team1.reduce((total, player) => total + player.score, 0)}
          </TableCell>
          <TableCell className="text-right">
            {team2.reduce((total, player) => total + player.score, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
