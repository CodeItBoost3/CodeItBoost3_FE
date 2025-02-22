import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomToastProvider from "@/layouts/CustomToastProvider";
import appRoutes from "@/routes/appRoutes";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PromptButton from "@/components/PromptButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorPage from "@/pages/ErrorPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <CustomToastProvider>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <RouterProvider router={appRoutes} fallbackElement={<ErrorPage />} />

      </Suspense>
      </ErrorBoundary>
      <PromptButton />
    </QueryClientProvider>
    </CustomToastProvider>
  );
}
