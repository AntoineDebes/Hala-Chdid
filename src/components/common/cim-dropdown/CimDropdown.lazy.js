import React, { lazy, Suspense } from 'react';

const LazyCimDropdown = lazy(() => import('./CimDropdown'));

export const CimDropdown = props => (
    <Suspense fallback={null}>
        <LazyCimDropdown {...props} />
    </Suspense>
);
