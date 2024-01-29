'use server';

import { redirect } from 'next/navigation';

export async function createTeam(formData: FormData) {
  const players = formData.getAll('player');

  const searchParams = new URLSearchParams();

  for (const player of players) {
    searchParams.append('players', player as string);
  }

  redirect(`/builder/play?${searchParams.toString()}`);
}
