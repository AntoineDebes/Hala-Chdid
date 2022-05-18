import React, { lazy, Suspense } from 'react';

const LazyRenderProductCategoryColumn = lazy(() => import('./RenderProductCategoryColumn'));

export const RenderProductCategoryColumn = props => (
    <Suspense fallback={null}>
        <LazyRenderProductCategoryColumn {...props} />
    </Suspense>
);
