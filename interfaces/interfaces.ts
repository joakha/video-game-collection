//interfaces for SearchPage
export interface SearchGame {
    gameId: number,
    name: string,
    released: string,
    backgroundImage: string,
    parentPlatform: string,
    genres: string
}

export interface SearchPageProps {
    navigation: any
}

//interfaces for SearchCard
export interface SearchCardProps {
    game: SearchGame,
    navigation: any
}

//interfaces for CollectionPage
export interface CollectionGame {
    gameId: number,
    name: string,
    released: string,
    backgroundImage: string,
    parentPlatform: string,
    genres: string,
    status: string,
    review: string,
    reviewScore: string,
    firebaseId: string
}

export interface MyGame {
    gameId: number,
    name: string,
    released: string,
    backgroundImage: string,
    parentPlatform: string,
    genres: string,
    status: string,
    review: string,
    reviewScore: string
}

export interface FilterOptions {
    black: string,
    green: string,
    blue: string,
    orange: string,
    red: string,
    grey: string
}

export interface CollectionPageProps {
    navigation: any
}

//interfaces for CollectionCard
export interface CollectionCardProps {
    game: CollectionGame,
    navigation: any
}

export interface StatusOptions {
    green: string,
    blue: string,
    orange: string,
    red: string,
    grey: string
}

//interfaces for ReviewModal
export interface ReviewModalProps {
    game: CollectionGame
}

//interfaces for DetailsPage
export interface GameDetails {
    name: string,
    released: string,
    backgroundImageAdditional: string,
    platforms: string,
    stores: string,
    developers: string,
    tags: string,
    publishers: string,
    descriptionRaw: string,
}

export interface DetailsPageProps {
    route: any
}

//interfaces for statistics page
export interface PieData {
    value: number,
    color?: string,
    text: string
}