import React, { lazy, Suspense } from 'react';

const LazyCimSidebar = lazy(() => import('./CimSidebar'));

export const CimSidebar = props => (
    <Suspense fallback={null}>
        <LazyCimSidebar {...props} />
    </Suspense>
);
