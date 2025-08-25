"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { login } from "@/lib/actions";

export function LoginCard() {
    return (
        <Card className="relative w-[350px] overflow-hidden">
            <CardHeader className="text-center px-10 py-4 pb-2">
                <CardTitle className="text-xl">Welcome back!</CardTitle>
                <CardDescription>
                    Log in with your Git provider
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-10 pb-4 pt-0">
                <Button variant="outline" size="lg" className="w-full" onClick={() => login("github")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                        <path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                            fill="currentColor"
                        />
                    </svg>
                    Continue with GitHub
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={() => login("gitlab")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                        <path
                            d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"
                            fill="currentColor"
                        />
                    </svg>
                    Continue with GitLab
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={() => login("bitbucket")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                        <path
                            d="M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.26a.772.772 0 00.77-.646l3.27-20.03a.774.774 0 00-.787-.912zM14.52 15.53H9.522L8.17 8.466h7.561z"
                            fill="currentColor"
                        />
                    </svg>
                    Continue with Bitbucket
                </Button>
                <div className="text-center text-sm pt-2">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="underline underline-offset-4">
                        Sign up
                    </a>
                </div>
            </CardContent>
            <BorderBeam duration={8} size={100} colorFrom="#0B54C7" colorTo="#4496FF" />
        </Card>
    );
}
