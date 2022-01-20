import Client from './Client'

export default interface Player {
    client: Client,
    life: number,
    userAnswer?: number,
    isAnswered: boolean,

}
