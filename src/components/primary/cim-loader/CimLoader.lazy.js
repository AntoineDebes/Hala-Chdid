import React, { lazy, Suspense } from 'react';

const LazyCimLoader = lazy(() => import('./CimLoader'));

export const CimLoader = props => (
    <Suspense fallback={null}>
        <LazyCimLoader {...props} />
    </Suspense>
);
