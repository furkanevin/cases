import { render, screen } from "@testing-library/react";
import TableDisplay from "../../pages/ide/Table";

test("Table renders rows", () => {
  render(<TableDisplay />);

  const rows = screen.getByRole("row");
  expect(rows.length).toBeGreaterThanOrEqual(1);
});
