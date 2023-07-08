
export interface IUser {
    // role: string;
    username: string;
    email: string;
    password: string;
}

export interface Product {
    _id: string;
    category: string;
    name: string;
    image: string;
    desc: string;
    sizes:string[],
    price: number;
    color: string;
    brand: string;
    free_shipping: boolean;
    new_product: boolean;
    star_ratings: number;
    discount: boolean;
    cartQuantity?: number;
}


export interface CartItem {
    _id: string;
    name: string,
    image: string,
    desc: string,
    price: number,
    discount?: boolean,
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