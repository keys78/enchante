
export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface Product {
    seller: any;
    createdAt: string;
    _id: string;
    category: string;
    name: string;
    image: string;
    desc: string;
    sizes: string[],
    price: number;
    color: string;
    brand: string;
    free_shipping: boolean;
    new_product: boolean;
    star_ratings: number;
    discount: boolean;
    cartQuantity?: number;
}



// from store
export const emptyProduct: Product = {
    _id: '',
    category: '',
    name: '',
    image: '',
    desc: '',
    sizes: [],
    price: 0,
    color: '',
    brand: '',
    discount: false,
    free_shipping: false,
    new_product: false,
    star_ratings: 0,
    createdAt: '',
    seller: { id: '', username: '' }
};

export const emptyOrder: OrderDetails = {
    product: [],
    shipping: {
        address: {
            line1: "",
            city: "",
            state: "",
            country: "",
            postal_code: ""
        },
        name: "",
        email: "",
        phone: ""
    },
    delivery_status: "",
    subTotal: "",
    total: 0,
    createdAt: ""
}


export interface Order {
    _id: string
    createdAt: string
    payment_status: string
    delivery_status: string,
    subTotal: string,
    total: number,
}

export interface OrderDetails {
    delivery_status: string,
    subTotal: string,
    total: number,
    createdAt: string | number | Date;
    product: {
        category: string,
        name: string,
        price: number,
        image: string
    }[],
    shipping: {
        address: {
            line1: string,
            city: string,
            state: string,
            country: string,
            postal_code: string,
        },
        name: string,
        email: string,
        phone: string
    },
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