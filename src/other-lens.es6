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

	multiplyBy(number) {
		return new OtherLens(this.operations, {
			multiplyBy: number
		});
	}

	apply(number) {
		for (var i = 0; i < this.operations.length; i++) {
			if (this.operations[i].add) number = number + this.operations[i].add;
			if (this.operations[i].multiplyBy) number = number * this.operations[i].multiplyBy;
		}
		return number;
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
		}));
	}

}

export default OtherLens;
