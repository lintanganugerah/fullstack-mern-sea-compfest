import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "components/layout/Layout";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: React.createElement(Layout),
      children: [
        {
          index: true,
          lazy: async () => {
            const { default: HomePage } = await import(
              "modules/user/pages/HomePage"
            );
            return { Component: HomePage };
          },
        },
      ],
    },
  ]);
