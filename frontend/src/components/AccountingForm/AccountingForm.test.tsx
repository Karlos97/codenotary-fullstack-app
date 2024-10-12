import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AccountingForm from "./AccountingForm";

test("submits form with correct data", () => {
  const onAddRecord = jest.fn();
  render(<AccountingForm onAddRecord={onAddRecord} />);

  fireEvent.change(screen.getByLabelText(/Account Number/i), {
    target: { value: "123456" },
  });
  fireEvent.change(screen.getByLabelText(/Account Name/i), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText(/IBAN/i), {
    target: { value: "DE89 3704 0044 0532 0130 00" },
  });
  fireEvent.change(screen.getByLabelText(/Address/i), {
    target: { value: "123 Main St" },
  });
  fireEvent.change(screen.getByLabelText(/Amount/i), {
    target: { value: "1000" },
  });
  fireEvent.change(screen.getByLabelText(/Type/i), {
    target: { value: "sending" },
  });

  fireEvent.click(screen.getByText(/Add Record/i));

  expect(onAddRecord).toHaveBeenCalledWith({
    accountNumber: "123456",
    accountName: "John Doe",
    iban: "DE89 3704 0044 0532 0130 00",
    address: "123 Main St",
    amount: 1000,
    type: "sending",
  });
});
