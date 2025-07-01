import { type ReactNode } from "react";
import { UnauthenticatedNotFoundPage } from "./unauthenticated/UnauthenticatedNotFoundPage";

export const NotFoundPage = (): ReactNode => {
    // const [loading, setLoading] = useState<boolean>(true);
    // const [authenticated, setAuthenticated] = useState<boolean>(false);

    // useEffect(() => {
    //     APIManager.auth.loggedIn().then(x => {
    //         setAuthenticated(x);
    //     }).catch(() => {
    //         setAuthenticated(false);
    //     }).finally(() => {
    //         setLoading(false);
    //     });
    // }, []);

    // if (loading) {
    //     return (
    //         <RootLoading />
    //     );
    // }

    // if (authenticated) {
    //     return (
    //         <h1>404 page for dashboard</h1>
    //     );
    // } else {
        return (
            <>
                <title>atom - 404</title>
                <UnauthenticatedNotFoundPage />
            </>
        );
    // }
}