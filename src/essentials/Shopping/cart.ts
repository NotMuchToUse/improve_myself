// { id: number, name: string, price: number, category: string, weight: number }

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  weight: number;
}

interface Cart {
  product: Product;
  quantity: number;
}

export const createCart = () => {
  let items: Cart[] = [];

  return {
    addItem(product: Product, quantity: number): void {
      for (let i: number = 0; i < items.length; i++) {
        if (product.id === items[i].product.id) {
          items[i].quantity += quantity;
          return;
        }
      }

      items.push({ product, quantity });
    },

    getInventoryStats(): Record<string, number> {
      let stats: Record<string, number> = {};

      for (let i: number = 0; i < items.length; i++) {
        const category = items[i].product.category;
        const quantity = items[i].quantity;

        if (stats[category]) {
          stats[category] += quantity;
        } else {
          stats[category] = quantity;
        }
      }

      return stats;
    },

    calculateShipping(
      shippingStrategy: (totalWeight: number) => number,
    ): number {
      let totalWeight: number = 0;
      for (let i = 0; i < items.length; i++) {
        totalWeight += items[i].product.weight * items[i].quantity;
      }

      return shippingStrategy(totalWeight);
    },

    applyFlashSale(minAmount: number, discountPercent: number): void {
      let total: number = 0;

      for (let i: number = 0; i < items.length; i++) {
        total = items[i].product.price * items[i].quantity;
        if (total >= minAmount) {
          items[i].product.price =
            items[i].product.price * (1 - discountPercent / 100);
        }
      }
    },
  };
};
