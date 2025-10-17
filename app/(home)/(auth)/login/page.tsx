import { AuthHandler } from "@/app/(home)/(auth)/login/auth-handler";
import { LoginCard } from "@/app/(home)/(auth)/login/login-card";
import { LoginHeader } from "@/app/(home)/(auth)/login/login-header"
import { Footer } from "@/components/ui/footer";
import FlickeringGrid from "@/components/ui/flickering-grid";

type PageProps = {
    searchParams: { [key: string]: string | undefined };
};

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams;
    const auth = params["auth_success"];

    if (auth) {
        return <AuthHandler auth={auth} />;
    }

    return (
        <>
            <main className="flex-1 relative flex flex-col">
                <div className="absolute inset-0 w-full overflow-hidden rounded-lg bg-background">
                    <FlickeringGrid
                        className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_50%,white,transparent)]"
                        color="#0B54C7"
                        maxOpacity={0.5}
                        flickerChance={0.5}
                        squareSize={4}
                        gridGap={4}
                    />
                </div>
                <div className="relative z-10 flex-1 flex flex-col">
                    <LoginHeader />
                    <div className="flex-1 flex items-center justify-center">
                        <LoginCard />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}