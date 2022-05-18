import React, { lazy, Suspense } from 'react';

const LazyCimProfileMenu = lazy(() => import('./CimProfileMenu'));

export const CimProfileMenu = props => (
    <Suspense fallback={null}>
        <LazyCimProfileMenu {...props} />
    </Suspense>
);
