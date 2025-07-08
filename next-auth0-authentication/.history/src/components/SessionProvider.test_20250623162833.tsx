import { render } from "@testing-library/react";
import SessionWrapper from "./SessionProvider";

describe("SessionWrapper", () => {
  it("Çocuk bileşenleri doğru şekilde render eder", () => {
    const { getByText } = render(
      <SessionWrapper>
        <div>Test Çocuğu</div>
      </SessionWrapper>
    );
    expect(getByText("Test Çocuğu")).toBeInTheDocument();
  });
});
