
export interface IUser {
    // role: string;
    username: string;
    email: string;
    password: string;
}

export interface Product {
    id: string,
    name: string,
    image: string,
    desc: string,
    price: number;
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
