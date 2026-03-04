const createBookingSystem = (movieName: string, totalSeats: number) => {
  let seatStatus = new Array(totalSeats).fill(false); // ví dụ totalSeats = 3 => [false, false, false]
  return {
    book(seatNumber: number): boolean {
      if (seatNumber < 1 || seatNumber > totalSeats) return false;
      if (seatStatus[seatNumber - 1] === true) return false; // chưa hiểu lắm so seatStatus = true được trong khi đã fill nó thành false hết rồi

      seatStatus[seatNumber - 1] = true; // gán luôn cho bằng true
      return true;
    },

    getAvailableSeats(): number[] {
      const available: number[] = [];
      for (let i = 0; i < seatStatus.length; i++) {
        if (seatStatus[i] === false) {
          // mặc định nó đã là false ở trên rồi mà nên nó sẽ push thôi, ví dụ: totalSeats = 10 thì chạy sẽ được từ ghế 1 --> 9 (không biết đúng không nữa)
          available.push(i + 1);
        }
      }

      return available;
    },

    // Chỗ này mình chưa giỏi ở vòng lặp cho lắm nhưng mình nghĩ là nếu dùng filter thì nó sẽ là
    // order = []
    // order.filter((seat) => ()) tới đây mình chịu rồi :)) còn tính thì nó như ở dưới thôi
    calculatePrice(discountStrategy: (price: number) => number): number {
      let order: number = 0;
      // Cách dùng filter
      // let order = seatStatus.filter(seat => seat === true).length;
      for (let i = 0; i < seatStatus.length; i++) {
        if (seatStatus[i] === true) {
          order++;
        }
      }
      const totalPrice: number = order * 100000; // Mình bị lỗi như này The left-hand side of an arithmetic operation must be of type any, number , bigint or an enum type
      return discountStrategy(totalPrice);
    },

    getBookingStats(): object {
      let bookedCount = 0;
      for (let i = 0; i < seatStatus.length; i++) {
        if (seatStatus[i] === true) {
          bookedCount++;
        }
      }
      return {
        movieName,
        bookedCount: bookedCount,
        availableCount: totalSeats - bookedCount,
      };
    },
  };
};

export { createBookingSystem };
