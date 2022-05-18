import React, { lazy, Suspense } from 'react';

const LazyRenderWareHouseColumn = lazy(() => import('./RenderWareHouseColumn'));

export const RenderWareHouseColumn = props => (
    <Suspense fallback={null}>
        <LazyRenderWareHouseColumn {...props} />
    </Suspense>
);
