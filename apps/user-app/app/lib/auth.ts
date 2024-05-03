import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone Number", type: "text", placeholder: "3244224423", required: true },
                password: { label: "Password", type: "password", placeholder: "password", required: true }
            },
            async authorize(credentials: any) {
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                console.log("hashed password=="+hashedPassword)
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });
                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null;
                }
                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    }
                } catch (error) {
                    console.error(error)
                }
                return null
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        }
    }
}
