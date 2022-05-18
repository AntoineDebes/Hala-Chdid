import React, { lazy, Suspense } from 'react';

const LazyBody = lazy(() => import('./Body'));

export const Body = props => (
    <Suspense fallback={null}>
        <LazyBody {...props} />
    </Suspense>
);
