import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    // base requirements
    layout("pages/BaseLayout.tsx", [
        index("routes/index.tsx"),
        
        // auth stuff
        layout("pages/auth/AuthLayout.tsx", [
            route("login", "routes/auth/login.tsx"),
            route("signup", "routes/auth/signup.tsx")
        ]),

        layout("pages/auth/AuthGuardLayout.tsx", [
            // auth guarded stuff

            layout("pages/dashboard/DashboardLayout.tsx", [
                route("dashboard", "routes/dashboard/home.tsx")
            ])
        ])
    ])
] satisfies RouteConfig;