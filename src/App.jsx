import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomToastProvider from "@/layouts/CustomToastProvider";
import appRoutes from "@/routes/appRoutes";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const queryClient = new QueryClient();

export default function App() {
  return (
    <CustomToastProvider>
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <RouterProvider router={appRoutes} />
      </Suspense>
    </QueryClientProvider>
    </CustomToastProvider>
  );
}
