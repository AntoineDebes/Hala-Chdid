import React, { lazy, Suspense } from 'react';

const LazyRenderExpiryDateColumn = lazy(() => import('./RenderExpiryDateColumn'));

export const RenderExpiryDateColumn = props => (
    <Suspense fallback={null}>
        <LazyRenderExpiryDateColumn {...props} />
    </Suspense>
);
