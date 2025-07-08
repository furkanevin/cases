import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SessionWrapper from "./SessionProvider";

describe("SessionWrapper", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <SessionWrapper>
        <div>Test Child</div>
      </SessionWrapper>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });
});
