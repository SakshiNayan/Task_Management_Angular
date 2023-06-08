export interface loginDetailInterface {
    message: string;
    token: string;
    user: User;
}
interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: number;
}