import { footerProps } from "../types"

export const products = [
    {
        id: '32423',
        name: 'Iphone Pro MAX',
        image: 'phoniee.jpg',
        desc: 'Lorem Ipsum dlee fhbsvuh h fshis sfh jhsfjlfj sfh hfs al',
        price: 300
    },
    {
        id: '2342',
        name: 'Mara Mo',
        image: 'phoniee.jpg',
        desc: 'Lorem Ipsum dlee fhbsvuh h fshis sfh jhsfjlfj sfh hfs al',
        price: 300
    },
    {
        id: '99403',
        name: 'Pie Chart',
        image: 'phoniee.jpg',
        desc: 'Lorem Ipsum dlee fhbsvuh h fshis sfh jhsfjlfj sfh hfs al',
        price: 300
    },
]


export const footerLinks: footerProps[] = [
    {
        header: 'Need Help?',
        links: ['Contact Us', 'How to shop on Jumia', 'Delivery options and timelines', 'How to return a product on PickMe?', 'Corporate and bulk purchases', 'Report a Product', 'Ship your package anywhere in Nigeria', 'Dispute Resolution Policy', 'Returns and Refunds Policy']
    },
    {
        header: 'Get to Know Us',
        links: ['Careers', 'Blogs', 'About PickMe', 'Investor Relations']
    },
    {
        header: 'Become a Seller with PickMe',
        links: ['Careers', 'Blogs', 'About PickMe', 'Investor Relations']
    },
]


export const heroDisplayTexts = [
    {
        tag: 1,
        title: "Where Sophistication and style meets.",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius accusantium nulla totam esse repellendus sit nostrum porro consequuntur quam minus. Voluptas eligendi eius ipsa suscipit consectetur minima nemo tempore doloribus."
    },
    {
        tag: 2,
        title: "Where Sophistication and style meets.",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius accusantium nulla totam esse repellendus sit nostrum porro consequuntur quam minus. Voluptas eligendi eius ipsa suscipit consectetur minima nemo tempore doloribus."
    },
    {
        tag: 3,
        title: "Where Sophistication and style meets.",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius accusantium nulla totam esse repellendus sit nostrum porro consequuntur quam minus. Voluptas eligendi eius ipsa suscipit consectetur minima nemo tempore doloribus."
    },
    {
        tag: 4,
        title: "Where Sophistication and style meets.",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius accusantium nulla totam esse repellendus sit nostrum porro consequuntur quam minus. Voluptas eligendi eius ipsa suscipit consectetur minima nemo tempore doloribus."
    },
    {
        tag: 5,
        title: "All in one place!",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius accusantium nulla totam esse repellendus sit nostrum porro consequuntur quam minus. Voluptas eligendi eius ipsa suscipit consectetur minima nemo tempore doloribus."
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
