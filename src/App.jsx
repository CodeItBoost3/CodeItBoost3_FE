import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PageContainer from "@/layouts/PageContainer";
import appRoutes from "@/routes/appRoutes";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <PageContainer>
            <LoadingSpinner />
          </PageContainer>
        }
      >
        <RouterProvider router={appRoutes} />
      </Suspense>
    </QueryClientProvider>
  );
}
