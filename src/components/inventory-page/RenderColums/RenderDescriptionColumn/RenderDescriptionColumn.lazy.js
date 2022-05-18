import React, { lazy, Suspense } from 'react';

const LazyRenderDescriptionColumn = lazy(() => import('./RenderDescriptionColumn'));

export const RenderDescriptionColumn = props => (
    <Suspense fallback={null}>
        <LazyRenderDescriptionColumn {...props} />
    </Suspense>
);
