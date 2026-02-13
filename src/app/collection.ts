class Collection<T> {

  private products: T[] = [];

  constructor(initProducts: T[] = []) {
    this.products = initProducts;
  }

  public getProducts(): T[] {
    return [...this.products];
  }

  public getByIndex(index: number): T | undefined {
    return this.products[index];
  }

  public clearProducts(): void {
    this.products = [];
  }

  public removeByIndex(index: number): void {
    if (index >= 0 && index < this.products.length) {
      this.products.splice(index, 1);
    } else {
      throw new Error(`Index ${index} is out of bounds for products array.`);
    }
  }

  public updateByIndex(index: number, newProduct: T): void {
    if (index >= 0 && index < this.products.length) {
      this.products[index] = newProduct;
    } else {
      throw new Error(`Index ${index} is out of bounds for products array.`);
    }
  }

}
