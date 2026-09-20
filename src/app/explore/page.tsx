import { Suspense } from 'react';
import { Explore } from '../../views/Explore';

export default function ExplorePage() {
  return (
    <Suspense>
      <Explore />
    </Suspense>
  );
}
