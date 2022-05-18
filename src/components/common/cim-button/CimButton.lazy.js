import React, { lazy, Suspense } from 'react';

const LazyCimButton = lazy(() => import('./CimButton'));

export const CimButton = props => (
    <Suspense fallback={null}>
        <LazyCimButton {...props} />
    </Suspense>
);
