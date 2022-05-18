import React, { lazy, Suspense } from 'react';

const LazyCimGlobalLoader = lazy(() => import('./CimGlobalLoader'));

export const CimGlobalLoader = props => (
    <Suspense fallback={null}>
        <LazyCimGlobalLoader {...props} />
    </Suspense>
);
