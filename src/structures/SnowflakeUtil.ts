/**
 * Copyright 2015 - 2020 Amish Shah
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const EPOCH = 1420070400000;
let INCREMENT = 0;

interface DeconstructedSnowflake {
	timestamp: number;
	workerID: number;
	processID: number;
	increment: number;
	binary: string;
}

export default class SnowflakeUtil {
	static idToBinary(num: string): string {
		let bin = '';
		let high = parseInt(num.slice(0, -10)) || 0;
		let low = parseInt(num.slice(-10));
		while (low > 0 || high > 0) {
			bin = String(low & 1) + bin;
			low = Math.floor(low / 2);
			if (high > 0) {
				low += 5000000000 * (high % 2);
				high = Math.floor(high / 2);
			}
		}
		return bin;
	}

	static binaryToID(binary: string): string {
		let dec = '';

		while (binary.length > 50) {
			const high = parseInt(binary.slice(0, -32), 2);
			const low = parseInt((high % 10).toString(2) + binary.slice(-32), 2);

			dec = (low % 10).toString() + dec;
			binary =
				Math.floor(high / 10).toString(2) +
				Math.floor(low / 10)
					.toString(2)
					.padStart(32, '0');
		}

		let number = parseInt(binary, 2);
		while (number > 0) {
			dec = (number % 10).toString() + dec;
			number = Math.floor(number / 10);
		}

		return dec;
	}

	static generate() {
		const timestamp = Date.now();
		if (INCREMENT >= 4095) INCREMENT = 0;
		// eslint-disable-next-line max-len
		const BINARY = `${(timestamp - EPOCH).toString(2).padStart(42, '0')}0000100000${(INCREMENT++)
			.toString(2)
			.padStart(12, '0')}`;
		return this.binaryToID(BINARY);
	}
}
