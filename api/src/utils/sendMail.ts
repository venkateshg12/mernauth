import resend from "../config/resent"
import { NODE_ENV } from "../constants/env"

type Params = {
    to: string,
    subject: string,
    text: string,
    html: string,
}
const getToEmail = (to: string) => {
    return NODE_ENV === "development" ? "delivered@resend.dev" : to;
}
export const sendMail = async ({ to, subject, text, html }: Params) =>
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: getToEmail(to),
        subject,
        text,
        html,
    });