import React from "react";
import { createBrowserRouter } from "react-router-dom";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { default: Layout } = await import("components/layout/Layout");
        return { Component: Layout };
      },
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
        {
          path: "menu",
          lazy: async () => {
            const { default: MenuPage } = await import(
              "modules/user/pages/MenuPage"
            );
            return { Component: MenuPage };
          },
        },
        {
          path: "testimonials",
          lazy: async () => {
            const { default: TestimonialPage } = await import(
              "modules/user/pages/TestimonialPage"
            );
            return { Component: TestimonialPage };
          },
        },
        {
          path: "contact",
          lazy: async () => {
            const { default: ContactPage } = await import(
              "modules/user/pages/ContactPage"
            );
            return { Component: ContactPage };
          },
        },
        {
          lazy: async () => {
            const { default: RequireAuth } = await import("guard/RequireAuth");
            return {
              element: React.createElement(RequireAuth),
            };
          },
          children: [
            {
              path: "subscription",
              lazy: async () => {
                const { default: SubscriptionPage } = await import(
                  "modules/user/pages/SubscriptionPage"
                );
                return { Component: SubscriptionPage };
              },
            },
          ],
        },
        {
          lazy: async () => {
            const { default: RequireNoAuth } = await import(
              "guard/RequireNoAuth"
            );
            return {
              element: React.createElement(RequireNoAuth),
            };
          },
          children: [
            {
              path: "login",
              lazy: async () => {
                const { default: LoginPage } = await import(
                  "modules/auth/pages/LoginPage"
                );
                return { Component: LoginPage };
              },
            },
            {
              path: "register",
              lazy: async () => {
                const { default: RegisterPage } = await import(
                  "modules/auth/pages/RegisterPage"
                );
                return { Component: RegisterPage };
              },
            },
          ],
        },
      ],
    },
  ]);
