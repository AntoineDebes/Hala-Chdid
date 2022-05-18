import React, { lazy, Suspense } from 'react';

const LazyCimNotificationMenu = lazy(() => import('./CimNotificationMenu'));

export const CimNotificationMenu = props => (
    <Suspense fallback={null}>
        <LazyCimNotificationMenu {...props} />
    </Suspense>
);
