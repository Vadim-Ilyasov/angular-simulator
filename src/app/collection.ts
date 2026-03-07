class Collection<T> {

  private elements: T[] = [];

  constructor(initElements: T[] = []) {
    this.elements = initElements;
  }

  getProducts(): T[] {
    return [...this.elements];
  }

  getByIndex(index: number): T | undefined {
    return this.elements[index];
  }

  clearProducts(): void {
    this.elements = [];
  }

  removeByIndex(index: number): void {
    if (index >= 0 && index < this.elements.length) {
      this.elements.splice(index, 1);
    } else {
      throw new Error(`Index ${index} is out of bounds for elements array.`);
    }
  }

  updateByIndex(index: number, newElement: T): void {
    if (index >= 0 && index < this.elements.length) {
      this.elements[index] = newElement;
    } else {
      throw new Error(`Index ${index} is out of bounds for elements array.`);
    }
  }

}
