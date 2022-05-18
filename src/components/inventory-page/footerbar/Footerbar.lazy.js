import React, { lazy, Suspense } from 'react';

const LazyFooterbar = lazy(() => import('./Footerbar'));

export const Footerbar = props => (
    <Suspense fallback={null}>
        <LazyFooterbar {...props} />
    </Suspense>
);
