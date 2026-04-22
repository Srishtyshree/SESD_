class Fine {
  #id;
  #amount;
  #status;
  #userId;
  #borrowRecordId;

  constructor({ id, amount, status, userId, borrowRecordId }) {
    this.#id = id;
    this.#amount = amount;
    this.#status = status;
    this.#userId = userId;
    this.#borrowRecordId = borrowRecordId;
  }

  isPaid() { return this.#status === 'PAID'; }

  toJSON() {
    return {
      id: this.#id,
      amount: this.#amount,
      status: this.#status,
      userId: this.#userId,
      borrowRecordId: this.#borrowRecordId
    };
  }
}

module.exports = Fine;
