export interface IPacman {
    x?: number,
    y?: number,
    wall?:boolean,
    next?: {
        x?: number,
        y?: number,
        value?: number,
    }
    dir: string,
    marker: number,
}