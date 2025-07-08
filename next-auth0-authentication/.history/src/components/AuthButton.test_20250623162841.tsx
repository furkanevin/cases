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

  it("Giriş yapılmamışsa Auth0 ile giriş butonunu gösterir ve tıklanınca signIn çağrılır", () => {
    mockUseSession.mockReturnValue({ data: null });
    render(<AuthButton />);
    const button = screen.getByText(/sign in with auth0/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockSignIn).toHaveBeenCalledWith("auth0");
  });

  it("Giriş yapılmışsa Çıkış Yap butonunu gösterir ve tıklanınca signOut çağrılır", () => {
    mockUseSession.mockReturnValue({ data: { user: { name: "Test User" } } });
    render(<AuthButton />);
    const button = screen.getByText(/çıkış yap/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockSignOut).toHaveBeenCalled();
  });
});
