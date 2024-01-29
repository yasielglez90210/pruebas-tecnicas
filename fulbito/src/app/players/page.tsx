import { api } from '@/lib/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function PlayersPage() {
  const players = await api.player.list();

  return (
    <>
      <h3 className="mb-3 w-full text-left text-lg font-medium">
        Listado de jugadores
      </h3>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Partidos</TableHead>
            <TableHead>Valoración</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map(({ name, matches, score }) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>{matches}</TableCell>
              <TableCell>{score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
