import React, { lazy, Suspense } from 'react';

const LazyCimTextFieldInput = lazy(() => import('./CimTextFieldInput'));

export const CimTextFieldInput = props => (
    <Suspense fallback={null}>
        <LazyCimTextFieldInput {...props} />
    </Suspense>
);
