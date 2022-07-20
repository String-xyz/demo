export const nfts = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black'
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
        imageAlt: "Front of men's Basic Tee in Aspen White.",
        price: '$45',
        color: 'Aspen White'
    },
    {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
        imageAlt: "Front of men's Basic Tee in Charcoal.",
        price: '$45',
        color: 'Charcoal'
    },

    {
        id: 4,
        name: 'Basic Tee',
        href: '#',
        imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
        imageAlt: "Front of men's Basic Tee Iso Dots.",
        price: '$45',
        color: 'Iso Dots'
    }
];

export const byId = (id:number) => {
    return nfts.filter(((item) => item.id === id)).pop()
}