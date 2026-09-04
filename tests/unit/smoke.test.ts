/// <reference types="vitest/globals" />

import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  count: z.number().int().nonnegative(),
});

describe("smoke", () => {
  it("parses valid input", () => {
    expect(schema.parse({ name: "inbox", count: 1 })).toEqual({
      name: "inbox",
      count: 1,
    });
  });

  it("rejects invalid input", () => {
    expect(() => schema.parse({ name: "", count: -1 })).toThrow();
  });
});
