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
  ]);
