// Test away!
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './Display';
import Dashboard from '../dashboard/Dashboard';

test('Dashboard shows the display', () => {
    const { getByTestId } = render(<Display />);
    const display = getByTestId('display');
    expect(display).toBeInTheDocument();
    expect(display).toBeVisible();
});

test('When closed, uses the red-led class', ()=> {
    const { getByTestId } = render(<Dashboard />);
    const gateButton = getByTestId('gateButton');
    fireEvent.click(gateButton);
    const closedStatusEl = getByTestId('closedStatus');
    expect(closedStatusEl).toHaveClass('red-led');
});

test('When locked, uses the red-led class', ()=> {
    const { getByTestId } = render(<Dashboard />);
    //Close the gate first
    const gateButton = getByTestId('gateButton');
    fireEvent.click(gateButton);
    //Then click lock button
    const lockButton = getByTestId('lockButton');
    fireEvent.click(lockButton);
    const lockedStatusEl = getByTestId('lockedStatus');
    expect(lockedStatusEl).toHaveClass('red-led');
});