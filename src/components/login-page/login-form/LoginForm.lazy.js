import React, { lazy, Suspense } from 'react';

const LazyLoginForm = lazy(() => import('./LoginForm'));

export const LoginForm = props => (
    <Suspense fallback={null}>
        <LazyLoginForm {...props} />
    </Suspense>
);
