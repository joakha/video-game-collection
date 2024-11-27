import { ReactNode } from "react"

//types for SearchPage
export type SearchGame = {
    gameId: number,
    name: string,
    released: string,
    backgroundImage: string,
    parentPlatform: string,
    genres: string
}

export type SearchPageProps = {
    navigation: any
}

//types for SearchCard
export type SearchCardProps = {
    game: SearchGame,
    navigation: any
}

//types for CollectionPage
export type CollectionGame = {
    gameId: number,
    name: string,
    released: string,
    backgroundImage: string,
    parentPlatform: string,
    genres: string,
    isFavorite: boolean,
    status: string,
    review: string,
    reviewScore: string,
    defaultImage: string
    firebaseId: string
}

export type FilterOptions = {
    cyan: string,
    black: string,
    green: string,
    blue: string,
    orange: string,
    red: string,
    grey: string,
}

export type CollectionPageProps = {
    navigation: any
}

//types for CollectionCard
export type CollectionCardProps = {
    game: CollectionGame,
    navigation: any
}

export type StatusOptions = {
    green: string,
    blue: string,
    orange: string,
    red: string,
    grey: string
}

//types for ReviewModal
export type ReviewModalProps = {
    game: CollectionGame
}

//types for DetailsPage
export type GameDetails = {
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

export type DetailsPageProps = {
    route: any
}

//types for statistics page
export type PieData = {
    value: number,
    color?: string,
    text: string
}

//types for GameContext and GameProvider

export type FirebaseGame = {
    gameId: number,
    name: string,
    released: string,
    backgroundImage: string,
    parentPlatform: string,
    genres: string,
    isFavorite: boolean,
    status: string,
    review: string,
    reviewScore: string,
    defaultImage: string
}

export type GameContextType = {
    loadingGames: boolean,
    firebaseGamesWithKeys: CollectionGame[],
}

export type GameProviderType = {
    children: ReactNode
}

//types for artwork modal
export type ArtworkModalProps = {
    game: CollectionGame
}