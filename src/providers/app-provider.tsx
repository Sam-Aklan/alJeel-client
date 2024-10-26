import { Toaster } from "sonner";
import { ReactQueryProvider } from "./react-query-provider";
import { RoutingProvider } from "./routing-provider";

export function AppProvider() {
    return (<>
        <ReactQueryProvider>
          <RoutingProvider />
          <Toaster richColors />
        </ReactQueryProvider>
      </>
    );
  }