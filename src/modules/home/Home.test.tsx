import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

describe("Application", () => {
  const { getByTestId } = render(<Home />);
  const transfersButton = getByTestId("transfers-button");
  const withdrawalButton = getByTestId("withdrawal-button");
  const depositsButton = getByTestId("deposits-button");

  it("renders the application correctly", () => {
    expect(transfersButton).toBeInTheDocument();
    expect(withdrawalButton).toBeInTheDocument();
    expect(depositsButton).toBeInTheDocument();
  });
});
