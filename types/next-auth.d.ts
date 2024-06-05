import NextAuth from "next-auth";

declare module "next-auth" {

    interface Session {
        user: {
            user: {
                id: number;
                username: string;
            },
            access_token: string;
            refresh_token: string;
            exp: any;
            iat: any;
            expiresIn: any;
        };
    }
}
