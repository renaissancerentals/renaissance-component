export interface RentalApplication {
    name: string;
    email: string;
    subject: string;
    property:string;
    phone?: string;
    questions?:string;
    captchaResponse: string;
}
