"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/cards/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { login } from "@/lib/actions";
import { GitHubIcon } from "@/components/ui/icons/github-icon";
import { GitLabIcon } from "@/components/ui/icons/gitlab-icons";
import { BitbucketIcon } from "@/components/ui/icons/bitbucket-icon";

export function LoginCard() {
    return (
        <Card className="relative w-full max-w-[350px] min-w-[320px] overflow-hidden">
            <CardHeader className="text-center px-10 py-4 pb-2">
                <CardTitle className="text-xl">Welcome back!</CardTitle>
                <CardDescription>
                    Log in with your Git provider
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-10 pb-4 pt-0">
                <Button variant="outline" size="lg" className="w-full" onClick={() => login("github")}>
                    <GitHubIcon />
                    Continue with GitHub
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={() => login("gitlab")}>
                    <GitLabIcon />
                    Continue with GitLab
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={() => login("bitbucket")}>
                    <BitbucketIcon />
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
