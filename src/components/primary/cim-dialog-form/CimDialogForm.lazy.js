import React, { lazy, Suspense } from 'react';

const LazyCimDialogForm = lazy(() => import('./CimDialogForm'));

export const CimDialogForm = props => (
    <Suspense fallback={null}>
        <LazyCimDialogForm {...props} />
    </Suspense>
);
