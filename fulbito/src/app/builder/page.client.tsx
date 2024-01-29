'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Player } from '@/lib/types';
import React, { useState } from 'react';

export default function BuilderPageClient({
  players: initialPlayers,
  onCreate,
}: {
  players: Player[];
  onCreate: (formData: FormData) => void;
}) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  function handleAddPlayer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const player = formData.get('player');
    if (player) {
      setPlayers((prevPlayers) =>
        prevPlayers.concat({ name: player as string, matches: 0, score: 0 }),
      );
      event.currentTarget.reset();
    }
  }

  return (
    <>
      <h3 className="mb-3 w-full text-left text-lg font-medium">
        Listado de jugadores
      </h3>
      <form
        action=""
        className="mb-6 flex gap-6 md:justify-end"
        onSubmit={handleAddPlayer}
      >
        <Input
          className="md:max-w-72"
          name="player"
          placeholder="Nombre del jugador"
        />
        <Button type="submit" variant="secondary">
          Agregar
        </Button>
      </form>
      <form action={onCreate}>
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map(({ name }) => (
              <TableRow key={name}>
                <TableCell>{name}</TableCell>
                <TableCell className="text-right">
                  <Checkbox name="player" value={name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end">
          <Button className="mb-16 mt-8 max-w-40" type="submit">
            Armar equipo
          </Button>
        </div>
      </form>
    </>
  );
}
