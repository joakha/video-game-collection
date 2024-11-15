//interfaces for SearchPage

export interface SearchGame {
    gameId: number,
    name: string,
    released: string,
    backgroundImage: string,
    parentPlatform: string,
    genres: string
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

//interfaces for CollectionCard

export interface CollectionCardProps {
    game: CollectionGame,
    navigation: any
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
