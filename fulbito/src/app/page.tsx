import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

export default async function Home() {
  const matches = await api.match.list();

  return (
    <>
      <h3 className="mb-3 w-full text-left text-lg font-medium">
        Listado de partidos
      </h3>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Fecha</TableHead>
            <TableHead>Equipo 1</TableHead>
            <TableHead>Equipo 2</TableHead>
            <TableHead className="text-center">Goles Equipo 1</TableHead>
            <TableHead className="text-center">Goles Equipo 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map(({ date, team1, team2, goals1, goals2 }) => (
            <TableRow key={date}>
              <TableCell>{date}</TableCell>
              <TableCell>{team1}</TableCell>
              <TableCell>{team2}</TableCell>
              <TableCell
                className={cn('text-center', {
                  'font-semibold text-green-500': goals1 > goals2,
                })}
              >
                {goals1}
              </TableCell>
              <TableCell
                className={cn('text-center', {
                  'font-semibold text-green-500': goals2 > goals1,
                })}
              >
                {goals2}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
