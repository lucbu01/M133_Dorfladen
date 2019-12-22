export class Product {
    id: string;
    productName: string;
    specialOffer?: number;
    normalPrice: number;
    imageName: string;
    description: string;

    get price(): number {
        return this.specialOffer ? this.specialOffer : this.normalPrice;
    }

    get hasSpecialOffer(): boolean {
        return this.specialOffer ? true : false;
    }
}