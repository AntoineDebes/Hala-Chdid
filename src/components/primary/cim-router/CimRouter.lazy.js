import React, { lazy, Suspense } from 'react';

const LazyCimRouter = lazy(() => import('./CimRouter'));

export const CimRouter = props => (
    <Suspense fallback={null}>
        <LazyCimRouter {...props} />
    </Suspense>
);
