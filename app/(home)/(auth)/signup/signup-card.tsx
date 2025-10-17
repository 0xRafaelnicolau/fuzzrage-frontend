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
import { GitHubIcon } from "@/components/ui/github-icon";
import { GitLabIcon } from "@/components/ui/gitlab-icon";
import { BitbucketIcon } from "@/components/ui/bitbucket-icon";
import { Spinner } from "@/components/ui/spinner";
import { login } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useState } from "react";

export function SignupCard() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [authenticatingProvider, setAuthenticatingProvider] = useState<string | undefined>();

    const handleAuthenticate = async (provider: string) => {
        setIsAuthenticating(true);
        setAuthenticatingProvider(provider);

        const result = await login(provider);
        if (result && !result.success) {
            setAuthenticatingProvider(undefined);
            setIsAuthenticating(false);
            toast.error(result.error.message);
        }
    };

    return (
        <Card className="relative w-full max-w-[350px] min-w-[320px] overflow-hidden">
            <CardHeader className="text-center px-10 py-4 pb-2">
                <CardTitle className="text-xl">Let&apos;s create your account!</CardTitle>
                <CardDescription>
                    Sign up with your Git provider
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-10 pb-4 pt-0">
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    disabled={isAuthenticating}
                    onClick={() => handleAuthenticate("github")}
                >
                    {authenticatingProvider === "github" ? (
                        <Spinner variant="default" size={20} />
                    ) : (
                        <GitHubIcon />
                    )}
                    Continue with GitHub
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    disabled={isAuthenticating}
                    onClick={() => handleAuthenticate("gitlab")}
                >
                    {authenticatingProvider === "gitlab" ? (
                        <Spinner variant="default" size={20} />
                    ) : (
                        <GitLabIcon />
                    )}
                    Continue with GitLab
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    disabled={isAuthenticating}
                    onClick={() => handleAuthenticate("bitbucket")}
                >
                    {authenticatingProvider === "bitbucket" ? (
                        <Spinner variant="default" size={20} />
                    ) : (
                        <BitbucketIcon />
                    )}
                    Continue with Bitbucket
                </Button>
                <div className="text-center text-sm pt-2">
                    Already have an account?{" "}
                    <a href="/login" className="underline underline-offset-4">
                        Login
                    </a>
                </div>
            </CardContent>
            <BorderBeam duration={8} size={100} colorFrom="#0B54C7" colorTo="#4496FF" />
        </Card >
    );
}