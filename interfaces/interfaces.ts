//interfaces for handling api platforms

export interface PlatformObject {
    id: number,
    name: string,
    slug: string
}

export interface PlatformEntity {
    platform: PlatformObject
}

export interface Platforms {
    platforms: PlatformEntity[]
}

export interface ParentPlatforms {
    parent_platforms: PlatformEntity[]
}

//interfaces for handling api stores

export interface StoreObject {
    id: number,
    name: string,
    slug: string
}

export interface StoreEntity {
    store: StoreObject
}

export interface Stores {
    stores: StoreEntity[]
}

//other types for api

export interface Genre {
    id: number,
    name: string,
    slug: string
}

export interface Tag {
    id: number,
    name: string,
    slug: string,
    language: string,
    games_count: number,
    image_background: string
}

//types for GameCard

export interface GameCardEntity {
    name: string | null,
    platforms: Platforms | null,
    stores: Stores | null,
    released: string | null,
    background_image: string | null,
    rating: number | null,
    metacritic: string | null,
    tags: Tag[] | null
    parent_platforms: ParentPlatforms | null
    genres: Genre[] | null
}

export interface GameCardProps {
    game: GameCardEntity
}