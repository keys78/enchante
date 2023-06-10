
export interface IUser {
    // role: string;
    username: string;
    email: string;
    password: string;
}

export interface Product {
    id: string;
    category: string;
    name: string;
    image: string;
    desc: string;
    price: number;
    color: string;
    brand: string;
    free_shipping: boolean;
    cartQuantity?: number;
}


export interface CartItem {
    id: string;
    name: string,
    image: string,
    desc: string,
    price: number
    cartQuantity: number;
}

export interface CartState {
    cartItems: CartItem[];
    cartTotalQuantity: number;
    cartTotalAmount: number;
}

// auth
export interface IUserSignUp {
    username: string;
    email: string;
    password: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

// user
export interface IToken {
    token: string;
}

export interface footerProps {
    header: string,
    links: string[]
}

export interface heroDisplayTexts {
    tag: number,
    title: string,
    desc: string
}