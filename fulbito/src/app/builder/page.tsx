import { api } from '@/lib/api';
import BuilderPageClient from './page.client';
import { createTeam } from '@/lib/actions';

export default async function BuilderPage() {
  const players = await api.player.list();

  return <BuilderPageClient players={players} onCreate={createTeam} />;
}
