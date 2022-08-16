class CreateError extends Error {
  constructor(status, message) {
    super(status, message);
    this.status = status;
    this.message = message;
    this.isCustom = 1;
  }
}

module.exports = { CreateError };
