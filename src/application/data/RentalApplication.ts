export interface RentalApplication {
    name: string;
    email: string;
    to: string;
    subject: string;
    property:string;
    phone?: string;
    questions?:string;
    captchaResponse: string;
}
