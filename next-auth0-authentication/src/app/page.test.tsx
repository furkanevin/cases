import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";
import AdminPage from "./page";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/app/api/auth/[...nextauth]/route", () => ({
  authOptions: {},
}));

jest.mock("@/components/AuthButton", () => () => <div>Mock AuthButton</div>);

describe("AdminPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls redirect if there is no session", async () => {
    const { getServerSession } = require("next-auth");
    getServerSession.mockResolvedValueOnce(null);
    // @ts-ignore
    await AdminPage();
    expect(redirect).toHaveBeenCalledWith("/api/auth/signin");
  });

  it("renders user name and AuthButton if session exists", async () => {
    const { getServerSession } = require("next-auth");
    getServerSession.mockResolvedValueOnce({ user: { name: "Test User" } });
    // @ts-ignore
    const page = await AdminPage();
    render(page);
    expect(screen.getByText(/hoş geldin test user/i)).toBeInTheDocument();
    expect(screen.getByText(/mock authbutton/i)).toBeInTheDocument();
  });
});
