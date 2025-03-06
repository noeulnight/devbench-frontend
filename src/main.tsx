import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import Callback from "./pages/auth/Callback";
import { CookiesProvider } from "react-cookie";
import Logout from "./pages/auth/Logout";
import Products from "./pages/shop/Products";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import { UserProvider } from "./provider/UserProvider";
import Purchase from "./pages/shop/Purchase";
import Purchases from "./pages/shop/Purchases";
import Notfound from "./pages/Notfound";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
      gcTime: 10 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster />
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#282828",
                colorPrimary: "white",
              },
            },
          }}
        >
          <UserProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<Navigate to="/leaderboard" />} />
                <Route path="/auth/callback" element={<Callback />} />
                <Route path="/auth/logout" element={<Logout />} />
                <Route path="/store" element={<Products />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/purchase/:purchaseId" element={<Purchase />} />
                <Route path="/purchase" element={<Purchases />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </CookiesProvider>
  </>
);

export { queryClient };
