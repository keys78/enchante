import { footerProps } from "../types"
import image_one from '../assets/png/img_one.jpg'
import image_two from '../assets/png/img_two.jpg'
import image_3 from '../assets/png/img_l_3.jpg'
import image_l_xx from '../assets/png/img_l_xx.jpg'
import image_l_5 from '../assets/png/img_l_5.jpg'
import image_l_6 from '../assets/png/img_l_6.jpg'
import image_s_2 from '../assets/png/img_s_2.jpg'
import image_s_xx from '../assets/png/img_s_xx.jpg'
import image_s_x from '../assets/png/img_s_x.jpg'
import image_ss_x from '../assets/png/img_ss_x.jpg'
import image_ss_xx from '../assets/png/img_ss_xx.jpg'


export const pagesList = [
    {
        title: 'Account',
        icon: 'AppWindow',
        link: '/user/account'
    },
    {
        title: 'Sell On enchanté',
        icon: 'Money',
        link: '/user/seller'
    },
    {
        title: 'My Products',
        icon: 'Stack',
        link: '/user/my-products'
    },
    {
        title: 'Orders',
        icon: 'Package',
        link: '/user/orders'
    },
    {
        title: 'Inbox',
        icon: 'EnvelopeOpen',
        link: '/user/inbox'
    },
    {
        title: 'Saved Items',
        icon: 'ArchiveBox',
        link: '/user/saved-items'
    },
    {
        title: 'Manage Products',
        icon: 'Kanban',
        link: '/admin/manage-products'
    }
];



export const footerLinks: footerProps[] = [
    {
        header: 'Shop',
        links: ['All Collections', 'Genz-Style', 'Discount',]
    },
    {
        header: 'Company',
        links: ['Careers', 'Blogs', 'About enchanté',]
    },
    {
        header: 'Support',
        links: ['FAQs', 'Contact Us', 'Terms of use']
    },
]


export const heroDisplayTexts = [
    {
        tag: 1,
        title: "Where fashion meets timeless allure.",
        desc: "Experience a captivating fusion of contemporary fashion and everlasting charm, where every outfit exudes a timeless allure that transcends trends."
    },
    {
        tag: 2,
        title: "Elevate your wardrobe, embrace individuality.",
        desc: "Elevate your wardrobe to new heights, embracing your unique individuality. Explore a range of fashion-forward garments that celebrate self-expression, empowering you to stand out with confidence."
    },
    {
        tag: 3,
        title: "Embrace the allure of fashionable self-expression.",
        desc: "Indulge in the irresistible allure of fashionable self-expression. Our thoughtfully crafted collection speaks volumes about your unique style, allowing you to make a statement and embrace your fashion journey."
    },
    {
        tag: 4,
        title: "Discover the art of fashionable expression.",
        desc: "Immerse yourself in the art of fashion. Uncover a carefully curated selection of avant-garde designs and statement pieces that empower you to express your style through innovative fashion choices."
    },
    {
        tag: 5,
        title: "Your go-to destination for stylish trends.",
        desc: "Make us your go-to destination for the latest stylish trends. Stay ahead of the style game with our curated selection of fashion-forward pieces, ensuring you're always in vogue and on-trend."
    },
];



interface CardItem {
    id: number;
    title: string;
    copy: string;
}

export const cardItems: CardItem[] = [
    {
        id: 1,
        title: "Stacked Card Carousel",
        copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dui scelerisque, tempus dui non, blandit nulla. Etiam sed interdum est."
    },
    {
        id: 2,
        title: "Second Item",
        copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        id: 3,
        title: "A Third Card",
        copy:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dui scelerisque, tempus dui non, blandit nulla."
    },
    {
        id: 4,
        title: "Fourth",
        copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
];


export const SliderData = [
    { image: image_one },
    { image: image_3 },
    { image: image_l_xx },
    { image: image_l_5 },
    { image: image_l_6 },
];
export const CardSliderOne = [
    { image: image_two },
    { image: image_s_xx },
    { image: image_ss_x },
    { image: image_s_xx },
    { image: image_two },
];
export const CardSliderTwo = [
    { image: image_s_2 },
    { image: image_s_x },
    { image: image_ss_xx },
    { image: image_s_x },
    { image: image_s_2 },
];



export const selectedProductsArray = [
    {
        id: '1',
        category: 'men',
        name: 'Iphone Pro MAX',
        image: image_s_x,
        desc: 'no',
        color: 'red',
        free_shipping: false,
        brand: 'Apple',
        price: 900,
        new: true,
        discount: true,
        star_ratings: 3,

    },
    {
        id: '2',
        category: 'women',
        name: 'Lipstick',
        image: image_s_x,
        desc: 'yes',
        color: 'red',
        free_shipping: true,
        brand: 'Apple',
        price: 900,
        new: false,
        discount: false,
        star_ratings: 3,

    },
    {
        id: '3',
        category: 'men',
        name: 'Shoe',
        image: image_s_x,
        desc: 'go',
        color: 'red',
        free_shipping: true,
        brand: 'Apple',
        price: 900,
        new: false,
        discount: false,
        star_ratings: 3,

    },
    {
        id: '4',
        category: 'men',
        name: 'hair comb',
        image: image_s_x,
        desc: 'go',
        color: 'red',
        free_shipping: false,
        brand: 'Apple',
        price: 900,
        new: false,
        star_ratings: 3,
    },
];