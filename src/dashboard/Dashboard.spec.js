// Test away
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Dashboard from './Dashboard';
import '@testing-library/jest-dom/extend-expect';


test('Gate defaults to unlocked', () => {
    const { getByText } = render(<Dashboard/>);
    getByText(/unlocked/i);
    });

test('Gate defaults to open', ()=> {
    const { getByText } = render(<Dashboard />);
    getByText(/open/i);
});

test('Gate cannot be closed or opened if it is locked', () => {
    const { getByText, getByTestId } = render(<Dashboard />);
    const gateButton = getByTestId('gateButton');
    expect(gateButton).toHaveTextContent(/close gate/i);
    fireEvent.click(gateButton);
    expect(gateButton).toHaveTextContent(/open gate/i);
    const lockButton = getByText(/lock gate/i);
    fireEvent.click(lockButton);
    getByText(/locked/i);
    //fireEvent.click(gateButton);
    expect(gateButton).toBeInTheDocument();
    expect(gateButton).toHaveClass('toggle-btn');
    expect(gateButton).toHaveAttribute('disabled');
});

test('Dashboard shows the controls', () => {
    const { getByTestId } = render(<Dashboard />);
    const controls = getByTestId('controls');
    expect(controls).toBeInTheDocument();
    expect(controls).toBeVisible();
});

test('Dashboard shows the display', () => {
    const { getByTestId } = render(<Dashboard />);
    const display = getByTestId('display');
    expect(display).toBeInTheDocument();
    expect(display).toBeVisible();
});