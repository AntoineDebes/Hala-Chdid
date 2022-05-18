import React, { lazy, Suspense } from 'react';

const LazyLeftMenu = lazy(() => import('./LeftMenu'));

export const LeftMenu = props => (
    <Suspense fallback={null}>
        <LazyLeftMenu {...props} />
    </Suspense>
);
