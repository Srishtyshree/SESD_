class IFineStrategy {
  calculate(overdueDays) {
    throw new Error('Method calculate() must be implemented');
  }
}

class DailyFineStrategy extends IFineStrategy {
  #ratePerDay;

  constructor(ratePerDay = 1.5) {
    super();
    this.#ratePerDay = ratePerDay;
  }

  calculate(overdueDays) {
    return overdueDays * this.#ratePerDay;
  }
}

class WeeklyFineStrategy extends IFineStrategy {
  #ratePerWeek;

  constructor(ratePerWeek = 10) {
    super();
    this.#ratePerWeek = ratePerWeek;
  }

  calculate(overdueDays) {
    const weeks = Math.ceil(overdueDays / 7);
    return weeks * this.#ratePerWeek;
  }
}

module.exports = { DailyFineStrategy, WeeklyFineStrategy };
