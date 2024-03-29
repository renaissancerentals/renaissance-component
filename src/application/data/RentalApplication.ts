export interface RentalApplication {
    name: string;
    email: string;
    subject: string;
    property: string;
    address?: string;
    phone?: string;
    questions?: string;
    captchaResponse: string;
    currentPage: string;
}
