import React, { lazy, Suspense } from 'react';

const LazyRenderProductTypeColumn = lazy(() => import('./RenderProductTypeColumn'));

export const RenderProductTypeColumn = props => (
    <Suspense fallback={null}>
        <LazyRenderProductTypeColumn {...props} />
    </Suspense>
);
