import React, { lazy, Suspense } from 'react';

const LazyRenderBarcodeColumn = lazy(() => import('./RenderBarcodeColumn'));

export const RenderBarcodeColumn = props => (
    <Suspense fallback={null}>
        <LazyRenderBarcodeColumn {...props} />
    </Suspense>
);
