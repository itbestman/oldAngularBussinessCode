export interface DefaultFoodPlanner {
    Count: number,
    CountType: string,
    Currency: string
    Details: string
    FoodId: number
    FoodItemName: string
    FoodtypeName: string
    PricePerPice: number
    TotelPrice: number
}

export interface OrderedItemsOfDate {
    orders: number,
    TimeSlot: string,
    orderItem: { ItemId: number, Count: number }[]
}
export interface SelectedFoodItemForBucket{
    B?:DefaultFoodPlanner,
    L?:DefaultFoodPlanner,
    D?:DefaultFoodPlanner
}