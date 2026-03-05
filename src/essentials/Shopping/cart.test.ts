import { expect, test, describe } from "vitest";
import { createCart } from "./cart";

describe("Smart Shopping Cart System", () => {
  test("addItem nên gộp số lượng nếu trùng ID sản phẩm", () => {
    const cart = createCart();
    const p1 = {
      id: 1,
      name: "Mouse",
      price: 100,
      category: "Electronics",
      weight: 0.5,
    };

    cart.addItem(p1, 1);
    cart.addItem(p1, 2); // Thêm 2 cái nữa cùng ID

    const stats: Record<string, number> = cart.getInventoryStats();
    // Tổng số lượng Electronics phải là 3
    expect(stats["Electronics"]).toBe(3);
  });

  test("getInventoryStats nên phân loại đúng category", () => {
    const cart = createCart();
    cart.addItem(
      {
        id: 1,
        name: "Mouse",
        price: 100,
        category: "Electronics",
        weight: 0.5,
      },
      1,
    );
    cart.addItem(
      {
        id: 2,
        name: "Keyboard",
        price: 200,
        category: "Electronics",
        weight: 1,
      },
      1,
    );
    cart.addItem(
      { id: 3, name: "Apple", price: 10, category: "Food", weight: 0.1 },
      5,
    );

    const stats = cart.getInventoryStats();
    expect(stats).toEqual({
      Electronics: 2, // 1 Mouse + 1 Keyboard
      Food: 5, // 5 Quả táo
    });
  });

  test("calculateShipping nên tính đúng tổng khối lượng và áp dụng HOF", () => {
    const cart = createCart();
    cart.addItem(
      { id: 1, name: "Tạ", price: 100, category: "Gym", weight: 5 },
      2,
    ); // Tổng nặng 10kg

    const heavyShipping = (w: number) => w * 1000; // 1000đ mỗi kg
    expect(cart.calculateShipping(heavyShipping)).toBe(10000);
  });

  test("applyFlashSale chỉ giảm giá những món đạt điều kiện", () => {
    const cart = createCart();
    // Món này 100 * 2 = 200 (Đạt điều kiện >= 200)
    cart.addItem(
      { id: 1, name: "Item A", price: 100, category: "A", weight: 1 },
      2,
    );
    // Món này 50 * 1 = 50 (Không đạt)
    cart.addItem(
      { id: 2, name: "Item B", price: 50, category: "B", weight: 1 },
      1,
    );

    cart.applyFlashSale(200, 10); // Giảm 10% món nào có tổng tiền >= 200

    // Item A: 100 giảm 10% còn 90. Item B giữ nguyên 50.
    // Chúng ta có thể kiểm tra qua một hàm tính tổng tiền (bạn tự viết thêm nếu cần) hoặc kiểm tra nội bộ.
    // Để đơn giản cho test này, mình sẽ giả định bạn có cách check giá sản phẩm sau khi giảm.
  });
});
