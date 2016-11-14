var OtherLens = require("../src/other-lens.es6").default;
var assert = require("assert");
var expect = require('chai').expect;

function fakePoint(x, y, r) {
	return {
		x: x,
		y: y,
		r: r
	};
}

function compare(a, b) {
	if (typeof a === 'number' && typeof b === 'number') {
		// using the expect() semantics here might not be the best idea...
		expect(a).to.be.closeTo(b, 0.0001);
	} else {
		return this._super(a, b);
	}
}


describe("Lens", () => {
	var Lens = new OtherLens();
	describe('#add(number)', () => {
		it("should add to both x and y", () => {
			var point = fakePoint(5, 5, 5);
			expect(new OtherLens().add(2).apply(point)).to.deep.equal(fakePoint(7, 7, 7));
			expect(new OtherLens().add(6).add(10).apply(point)).to.deep.equal(fakePoint(21, 21, 21));
		});
		it("should work on floats", () => {
			var point = fakePoint(11, 10, 9)
			expect(new OtherLens().add(2.3).apply(point)).to.deep.equal(fakePoint(13.3, 12.3, 11.3));
		});
	});

	describe('#addX(number)', () => {
		it("should add to only x", () => {
			var point = fakePoint(5, 5, 5);
			expect(new OtherLens().addX(2).apply(point)).to.deep.equal(fakePoint(7, 5, 5));
			expect(new OtherLens().addX(6).addX(10).apply(point)).to.deep.equal(fakePoint(21, 5, 5));
		});
	});

	describe('#addY(number)', () => {
		it("should add to only y", () => {
			var point = fakePoint(5, 5, 5);
			expect(new OtherLens().addY(2).apply(point)).to.deep.equal(fakePoint(5, 7, 5));
			expect(new OtherLens().addY(6).addY(10).apply(point)).to.deep.equal(fakePoint(5, 21, 5));
		});
	});

	describe("#multiplyBy(number)", () => {
		it("should multiply x, y, and r", () => {
			var point = fakePoint(10, 10, 10)
			expect(new OtherLens().multiplyBy(3).apply(point)).to.deep.equal(fakePoint(30, 30, 30));
			expect(new OtherLens().multiplyBy(2).multiplyBy(10).apply(point)).to.deep.equal(fakePoint(200, 200, 200));
		});
	});

	describe("#inverse()", () => {
		it("should undo any operation", () => {
			var point = fakePoint(10, 12, 56);
			var op = new OtherLens().multiplyBy(5).add(1).addX(10).multiplyBy(5).addY(100);

			var newPoint = op.apply(point);
			var oldPoint = op.inverse().apply(newPoint);

			expect(oldPoint).to.deep.equal(point);
		});
	});

	describe("Misc", () => {
		it("should leave other values intact", () => {
			var point = {
				x: 10,
				y: 20,
				r: 30,
				color: "blue",
				blah: false
			};

			var op = new OtherLens().multiplyBy(2).add(4);
			var newPoint = op.apply(point);
			var oldPoint = op.inverse().apply(newPoint);
			expect(point).to.deep.equal(newPoint);
		});
	})
});
