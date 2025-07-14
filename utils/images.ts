export const heroImages = {
    hero1: require('@/assets/images/hero/hero.jpeg'),
    women_login: require('@/assets/images/hero/women_login.jpeg')
} as const;

export const productImages = {
    shoeBrown1: require('@/assets/images/products/ART_0043.jpeg'),
    shoeBrown2: require('@/assets/images/products/ART_0074.jpeg'),
    shoePink1: require('@/assets/images/products/ART_7558.jpeg'),
    shoePink2: require('@/assets/images/products/ART_7617.jpeg'),
    shoeOrange1: require('@/assets/images/products/N352_1L011FLAM_1.jpeg'),
    shoeOrange2: require('@/assets/images/products/N352_1L011FLAM_2.jpeg'),
    shoeGreen1: require('@/assets/images/products/N352_1L011SBLU_2.jpeg'),
    shoeGreen2: require('@/assets/images/products/N352_1L011SBLU_6.jpeg'),
    shoeViol1: require('@/assets/images/products/N352_1L011VIOL_2.jpeg'),
    shoeViol2: require('@/assets/images/products/N352_1L011VIOL_6.jpeg'),
    shoeCofe1: require('@/assets/images/products/N355_1L011COFE_2.jpeg'),
    shoeCofe2: require('@/assets/images/products/N355_1L011COFE_6.jpeg'),
} as const;

export const flagIcons = {
    kosovo: require('@/assets/icons/world.png'),
    denmark: require('@/assets/icons/denmark.png'),
    unitedStates: require('@/assets/icons/united-states.png'),
    unitedKingdom: require('@/assets/icons/united-kingdom.png'), 
    france: require('@/assets/icons/france.png'),
    germany: require('@/assets/icons/germany.png'),
}

export const getImageSource = (imagePath: any) => {
    return imagePath;
}

export const getIconSource = (imagePath: any) => {
    return imagePath;
}

export const getFlagIcon = (countryId: string) => {
    const flagMap: { [key: string]: any } = {
        'xk': flagIcons.kosovo,    
        'dk': flagIcons.denmark,     
        'us': flagIcons.unitedStates, 
        'gb': flagIcons.unitedKingdom, 
        'uk': flagIcons.unitedKingdom, 
        'fr': flagIcons.france,      
        'de': flagIcons.germany,     
    };
    
    return flagMap[countryId.toLowerCase()] || flagIcons.kosovo; 
};


export type HeroImageKey = keyof typeof heroImages;
export type ProductImageKey = keyof typeof productImages;
export type FlagIconKey = keyof typeof flagIcons;