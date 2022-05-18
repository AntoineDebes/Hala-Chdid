import React, { lazy, Suspense } from 'react';

const LazyCimNotificationBar = lazy(() => import('./CimNotificationBar'));

export const CimNotificationBar = props => (
    <Suspense fallback={null}>
        <LazyCimNotificationBar {...props} />
    </Suspense>
);
