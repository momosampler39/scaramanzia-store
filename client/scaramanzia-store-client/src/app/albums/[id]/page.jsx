import AlbumDetail from './AlbumDetail';
import { getAlbumById } from '@/lib/api';

export default async function AlbumPage({ params }) {
  const album = await getAlbumById(params.id);
  return <AlbumDetail album={album} />;
}