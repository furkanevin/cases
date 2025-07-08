import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthButton from "./AuthButton";
import { useSession, signIn, signOut } from "next-auth/react";

jest.mock("next-auth/react");

const mockUseSession = useSession as jest.Mock;
const mockSignIn = signIn as jest.Mock;
const mockSignOut = signOut as jest.Mock;

describe("AuthButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Shows sign in button and calls signIn when not authenticated", () => {
    mockUseSession.mockReturnValue({ data: null });
    render(<AuthButton />);
    const button = screen.getByText(/sign in with auth0/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockSignIn).toHaveBeenCalledWith("auth0");
  });

  it("Shows sign out button and calls signOut when authenticated", () => {
    mockUseSession.mockReturnValue({ data: { user: { name: "Test User" } } });
    render(<AuthButton />);
    const button = screen.getByText(/çıkış yap/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockSignOut).toHaveBeenCalled();
  });
});
