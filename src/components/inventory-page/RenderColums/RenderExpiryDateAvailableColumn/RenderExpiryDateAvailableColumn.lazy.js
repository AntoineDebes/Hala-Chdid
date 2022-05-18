import React, { lazy, Suspense } from 'react';

const LazyRenderExpiryDateAvailableColumn = lazy(() => import('./RenderExpiryDateAvailableColumn'));

export const RenderExpiryDateAvailableColumn = props => (
    <Suspense fallback={null}>
        <LazyRenderExpiryDateAvailableColumn {...props} />
    </Suspense>
);
