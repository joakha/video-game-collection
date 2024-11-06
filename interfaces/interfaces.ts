//interfaces for SearchPage

export interface SearchGame {
    gameId: number,
    name: string,
    released?: string,
    backgroundImage?: string,
    parentPlatform?: string,
    genres?: string
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
    released?: string,
    backgroundImage?: string,
    parentPlatform?: string,
    genres?: string,
    firebaseId: string
}

//interfaces for CollectionCard

export interface CollectionCardProps {
    game: CollectionGame,
    navigation: any
}

//interfaces for DetailsPage

export interface GameDetails {
    name: string,
    released?: string,
    backgroundImageAdditional?: string,
    platforms?: string,
    stores?: string,
    developers?: string,
    tags?: string,
    publishers?: string,
    descriptionRaw?: string,
}
