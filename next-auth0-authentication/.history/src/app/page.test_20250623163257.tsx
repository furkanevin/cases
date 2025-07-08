import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";
import * as nextAuth from "next-auth";
import AdminPage from "./page";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/components/AuthButton", () => () => <div>Mock AuthButton</div>);

describe("AdminPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Oturum yoksa redirect çağrılır", async () => {
    jest.spyOn(nextAuth, "getServerSession").mockResolvedValueOnce(null);
    // @ts-ignore
    await AdminPage();
    expect(redirect).toHaveBeenCalledWith("/api/auth/signin");
  });

  it("Oturum varsa kullanıcı adı ve AuthButton görünür", async () => {
    jest
      .spyOn(nextAuth, "getServerSession")
      .mockResolvedValueOnce({ user: { name: "Test Kullanıcı" } });
    // @ts-ignore
    const page = await AdminPage();
    render(page);
    expect(screen.getByText(/hoş geldin test kullanıcı/i)).toBeInTheDocument();
    expect(screen.getByText(/mock authbutton/i)).toBeInTheDocument();
  });
});
