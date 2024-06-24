import { TesteService } from "../src";

let testService: TesteService;

describe("TestService", () => {
  beforeAll(() => {
    testService = new TesteService();
  });

  test("Should return 5", () => {
    const value = testService.retornar();

    expect(value).toBe(2);
  });
});
