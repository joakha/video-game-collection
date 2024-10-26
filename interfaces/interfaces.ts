//interfaces for handling api platforms

export interface PlatformObject {
    id: number,
    name: string,
    slug: string,
}

export interface PlatformEntity {
    platform: PlatformObject,
}

export interface ParentPlatforms {
    parent_platforms: PlatformEntity[],
}

//interfaces for handling api stores

export interface StoreObject {
    id: number,
    name: string,
    slug: string,
}

export interface StoreEntity {
    store: StoreObject,
}

export interface Stores {
    stores: StoreEntity[],
}

//other interfaces for api

export interface Genre {
    id: number,
    name: string,
    slug: string,
}

export interface Tag {
    id: number,
    name: string,
    slug: string,
    language: string,
    games_count: number,
    image_background: string,
}

//interfaces for GameCard

export interface GameCardEntity {
    id: string,
    name: string | null,
    platforms: Platforms | null,
    stores: Stores | null,
    released: string | null,
    background_image: string | null,
    rating: number | null,
    metacritic: string | null,
    tags: Tag[] | null,
    parent_platforms: ParentPlatforms | null,
    genres: Genre[] | null,
}

export interface GameCardProps {
    game: GameCardEntity,
    navigation: any
}

//interfaces for Details Page

export interface Platforms {
    platforms: PlatformEntity[],
}

export interface DetailEntity {
    name: string,
    metacritic?: string,
    released?: string,
    backgroundImage?: string,
    backgroundImageAdditional?: string,
    parentPlatforms?: string,
    platforms?: string,
    stores?: string,
    developers?: string,
    genres?: string,
    tags?: string,
    publishers?: string,
    descriptionRaw?: string,
}