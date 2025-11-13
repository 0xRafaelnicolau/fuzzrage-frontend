import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/lib/actions/user";

export function ShowUserCard({ user }: { user: User }) {
    return (
        <>
            <Card className="w-full mt-6">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <CardTitle>{user.name}</CardTitle>
                            <CardDescription>
                                {user.email}
                            </CardDescription>
                        </div>
                        <Avatar className="h-12 w-12 flex-shrink-0 border border-border">
                            <AvatarImage src={user.avatar_url} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-br from-muted to-accent backdrop-blur-sm">
                                <div className="w-full h-full bg-gradient-to-br from-accent/50 to-border/50 rounded-full blur-sm"></div>
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </CardHeader>
            </Card>
        </>
    )
}