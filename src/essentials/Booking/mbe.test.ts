import { expect, test, describe } from "vitest";
import { createBookingSystem } from "./mbe";

describe("Movie Booking System", () => {
  test("Nên khởi tạo đúng số ghế trống", () => {
    const system = createBookingSystem("Spider-Man", 5);
    expect(system.getAvailableSeats()).toEqual([1, 2, 3, 4, 5]);
  });

  test("Nên đặt được ghế trống và trả về true", () => {
    const system = createBookingSystem("Spider-Man", 5);
    expect(system.book(2)).toBe(true);
    expect(system.getAvailableSeats()).toEqual([1, 3, 4, 5]);
  });

  test("Không được đặt lại ghế đã có người đặt", () => {
    const system = createBookingSystem("Spider-Man", 5);
    system.book(3);
    expect(system.book(3)).toBe(false);
    expect(system.getAvailableSeats().length).toBe(4);
  });

  test("Không được đặt ghế ngoài phạm vi (ví dụ ghế số 0 hoặc 10 trong khi chỉ có 5 ghế)", () => {
    const system = createBookingSystem("Spider-Man", 5);
    expect(system.book(0)).toBe(false);
    expect(system.book(6)).toBe(false);
  });

  test("Tính đúng tổng tiền với các chiến lược giảm giá khác nhau (HOF)", () => {
    const system = createBookingSystem("Spider-Man", 10);
    system.book(1);
    system.book(2); // Tổng gốc: 200.000

    // Chiến lược 1: Giảm 10%
    const discount10 = (price: number) => price * 0.9;
    expect(system.calculatePrice(discount10)).toBe(180000);

    // Chiến lược 2: Giảm cố định 50.000
    const flatDiscount = (price: number) => price - 50000;
    expect(system.calculatePrice(flatDiscount)).toBe(150000);
  });

  test("Nên hiển thị đúng thông số thống kê", () => {
    const system = createBookingSystem("Batman", 10);
    system.book(1);
    system.book(5);
    expect(system.getBookingStats()).toEqual({
      movieName: "Batman",
      bookedCount: 2,
      availableCount: 8,
    });
  });

  test("Tính bảo mật: Không được để lộ biến lưu trữ ghế ra ngoài", () => {
    const system: any = createBookingSystem("Batman", 10);
    // Giả sử bạn đặt tên biến lưu trữ là 'seats' hoặc 'data'
    expect(system.seats).toBeUndefined();
    expect(system.data).toBeUndefined();
  });
});
