export type newLevel = {
    levelName:string,
}

export type level={
    id:string,
    levelName:string
}

export type updatedLevel = Partial<newLevel> |undefined