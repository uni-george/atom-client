import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

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
                ...prefix("dashboard", [
                    index("routes/dashboard/home.tsx"),
                    ...prefix("users", [
                        index("routes/dashboard/users.tsx"),
                        route(":id", "routes/dashboard/user/id.tsx")
                    ])
                ]),
            ])
        ])
    ])
] satisfies RouteConfig;