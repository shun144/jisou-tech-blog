import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("お試しテスト", () => {
    render(<Home />);

    expect(true).toBe(true);
  });
});
