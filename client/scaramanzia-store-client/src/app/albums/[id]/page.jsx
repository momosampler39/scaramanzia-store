import AlbumDetail from './AlbumDetail';
import { getAlbumById } from '@/lib/api';
import { use } from 'react';

export default function AlbumPage(props) {
  const { id } = use(props.params); // usa React.use()

  const album = use(getAlbumById(id)); // también se envuelve con use()

  return <AlbumDetail album={album} />;
}