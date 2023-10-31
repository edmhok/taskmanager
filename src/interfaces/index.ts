export interface taskInterface {
    //on UI level
    title : string,
    description: string,
    status: "open" | "in progress" | "done",
    category: "work" | "personal" | "hobby",
    priority: "low" | "medium" | "high",
    dateToStart: string,
    dateToFinish: string,
    reference: string,

    //on db Level
    _id ? : string,
    createdAt ? : string,
    updatedAt ? : string,
}