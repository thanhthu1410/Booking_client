import { lazy, Suspense } from "react";
import Loading from "./components/Loading/Loading";


const LazyLoad = (importFunc: any) => {
    const LazyComponent = lazy(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(importFunc());
            }, 1000);
        });
    });

    return () => (
        <Suspense fallback={<Loading />}>
            <LazyComponent />
        </Suspense>
    );
};

export default LazyLoad;

