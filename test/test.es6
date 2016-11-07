var OtherLens = require("../src/other-lens.es6").default;
var assert = require("assert");


describe("Lens", () => {
	describe('#add(number)', () => {
		it("should return 6 when .add(2).apply(4)", () => {
			assert.equal(6, new OtherLens().add(2).apply(4));
		});
	});

	describe("#multiplyBy(number)", () => {
		it("should return 15 when .multiplyBy(3).apply(5)", () => {
			assert.equal(15, new OtherLens().multiplyBy(3).apply(5));
		});
	});

	describe("#inverse()", () => {
		it("should undo an operation", () => {
			var op = new OtherLens().multiplyBy(5).add(1).multiplyBy(5);
			assert.equal(10, op.inverse().apply(op.apply(10)));
		});
	});
});
