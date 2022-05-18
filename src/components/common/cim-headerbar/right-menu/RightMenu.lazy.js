import React, { lazy, Suspense } from 'react';

const LazyRightMenu = lazy(() => import('./RightMenu'));

export const RightMenu = props => (
    <Suspense fallback={null}>
        <LazyRightMenu {...props} />
    </Suspense>
);
