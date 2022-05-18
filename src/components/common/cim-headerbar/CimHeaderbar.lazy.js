import React, { lazy, Suspense } from 'react';

const LazyCimHeaderbar = lazy(() => import('./CimHeaderbar'));

export const CimHeaderbar = props => (
    <Suspense fallback={null}>
        <LazyCimHeaderbar {...props} />
    </Suspense>
);
