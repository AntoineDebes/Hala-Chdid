import React, { lazy, Suspense } from 'react';

const LazyRenderSupplierColumn = lazy(() => import('./RenderSupplierColumn'));

export const RenderSupplierColumn = props => (
    <Suspense fallback={null}>
        <LazyRenderSupplierColumn {...props} />
    </Suspense>
);
