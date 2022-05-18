import React, { lazy, Suspense } from 'react';

const LazyCimTable = lazy(() => import('./CimTable'));

export const CimTable = props => (
    <Suspense fallback={null}>
        <LazyCimTable {...props} />
    </Suspense>
);
