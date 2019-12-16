// Test away!
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from '../dashboard/Dashboard';
import Controls from './Controls';


test('The locked toggle button is disabled if the gate is open', () => {
    const { getByTestId, rerender } = render(<Controls closed={false} />);
    const lockButton = getByTestId('lockButton');
    expect(lockButton).toHaveAttribute('disabled');
    rerender(<Controls closed={true} />);
    expect(lockButton).not.toHaveAttribute('disabled');
});

test('The closed toggle button is disabled if the gate is locked', () => {
    const { getByTestId, rerender } = render(<Controls locked={true} />);
    const gateButton = getByTestId('gateButton');
    expect(gateButton).toHaveAttribute('disabled');
    rerender(<Controls locked={false} />);
    expect(gateButton).not.toHaveAttribute('disabled');
});

test('Provides button to toggle the closed state', () => {
    const { getByTestId } = render(<Controls/>);
    const gateButton = getByTestId('gateButton');
    expect(gateButton).toBeInTheDocument();
    expect(gateButton).toBeVisible();
    expect(gateButton).toHaveClass('toggle-btn');
})

test('Provides button to toggle the locked state', () => {
    const { getByTestId } = render(<Controls/>);
    const lockButtonEl = getByTestId('lockButton');
    expect(lockButtonEl).toBeInTheDocument();
    expect(lockButtonEl).toBeVisible();
    expect(lockButtonEl).toHaveClass('toggle-btn');
});

test('Buttons\' text changes to reflect the state the door will be in when clicked', () => {
    const { getByTestId } = render(<Dashboard />);
    const gateButton = getByTestId('gateButton');
    expect(gateButton).toHaveTextContent(/close gate/i);
    fireEvent.click(gateButton);
    expect(gateButton).toHaveTextContent(/open gate/i);

    const lockButton = getByTestId('lockButton');
    expect(lockButton).toHaveTextContent(/lock gate/i);
    fireEvent.click(lockButton);
    expect(lockButton).toHaveTextContent(/unlock gate/i);
});
