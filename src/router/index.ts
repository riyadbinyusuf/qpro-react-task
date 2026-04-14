import { createBrowserRouter } from "react-router";
import RootLayout from "@/layout/RootLayout";
import FormLayout from "@/layout/FormLayout";
import Home from "@/pages/Home";
import TodosPage from "@/pages/todos";
import FormBuilderPage from "@/pages/form-builder";
import FormPreviewPage from "@/pages/form-preview";
import { fetchUsers } from "@/services/todos";
import RootErrorBoundary from "@/components/RootErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "todos",
        Component: TodosPage,
        loader: async () => {
          const res = await fetchUsers();

          return res;
        },
      },
      {
        Component: FormLayout,
        children: [
          {
            path: "form-builder",
            Component: FormBuilderPage,
          },
          {
            path: "form-preview",
            Component: FormPreviewPage,
          },
        ],
      },
    ],
  },
]);
