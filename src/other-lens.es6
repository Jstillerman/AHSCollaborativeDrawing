import R from "ramda";

class OtherLens {
	constructor(operations, operation) {
		this.operations = operations || [];
		if (operation) {
			this.operations.push(operation);
		}
	}

	add(number) {
		return new OtherLens(this.operations, {
			add: number
		});
	}

	addX(number) {
		if (number == 0 || number == -0) return this
		return new OtherLens(this.operations, {
			addX: number
		});
	}

	addY(number) {
		if (number == 0 || number == -0) return this
		return new OtherLens(this.operations, {
			addY: number
		});
	}

	multiplyBy(number) {
		return new OtherLens(this.operations, {
			multiplyBy: number
		});
	}

	apply(point) {
		var newPoint = JSON.parse(JSON.stringify(point)); //Copy without reference
		for (var i = 0; i < this.operations.length; i++) {
			if (this.operations[i].add) {
				newPoint.x = newPoint.x + this.operations[i].add;
				newPoint.y = newPoint.y + this.operations[i].add;
				newPoint.r = newPoint.r + this.operations[i].add;
			}
			if (this.operations[i].multiplyBy) {
				newPoint.x = newPoint.x * this.operations[i].multiplyBy;
				newPoint.y = newPoint.y * this.operations[i].multiplyBy;
				newPoint.r = newPoint.r * this.operations[i].multiplyBy;
			}

			if (this.operations[i].addX) {
				newPoint.x = newPoint.x + this.operations[i].addX;
			}

			if (this.operations[i].addY) {
				newPoint.y = newPoint.y + this.operations[i].addY;
			}
		}
		return newPoint;
	}

	inverse() {
		//reverse the order of the operations
		var ops = [].concat(this.operations).reverse()

		//Make the operations the respective inverse
		return new OtherLens(ops.map((op) => {
			if (op.add) {
				return {
					add: -op.add
				}
			}
			if (op.multiplyBy) {
				return {
					multiplyBy: 1 / op.multiplyBy
				}
			}
			if (op.addX) {
				return {
					addX: -op.addX
				}
			}
			if (op.addY) {
				return {
					addY: -op.addY
				}
			}
		}));
	}

}

export default OtherLens;
