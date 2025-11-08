import { describe, it, expect } from "vitest";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "../main.ts";

describe("sum", () => {
    it("sum to n a should work to be 15", () => {
        expect(sum_to_n_a(5)).toBe(15);
    });
    it("sum to n b should work 15", () => {
        expect(sum_to_n_b(5)).toBe(15);
    });
    it("sum to n c should work 15", () => {
        expect(sum_to_n_c(5)).toBe(15);
    });
});

