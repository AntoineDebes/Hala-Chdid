import React, { lazy, Suspense } from 'react';

const LazyCimDialog = lazy(() => import('./CimDialog'));

export const CimDialog = props => (
    <Suspense fallback={null}>
        <LazyCimDialog {...props} />
    </Suspense>
);
