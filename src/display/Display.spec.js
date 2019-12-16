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

test('When closed, uses the red-led class for the closed-status div', ()=> {
    const { getByTestId } = render(<Dashboard />);
    const gateButton = getByTestId('gateButton');
    fireEvent.click(gateButton);
    const closedStatusEl = getByTestId('closedStatus');
    expect(closedStatusEl).toHaveClass('red-led');
});

test('When locked, uses the red-led class for the locked-status div', ()=> {
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

test('when open, uses the green-led class for the closed-status div', () => {
    const { getByTestId, rerender } = render(<Display closed={false}/>);
    const closedStatusEl = getByTestId('closedStatus');
    expect(closedStatusEl).toHaveClass('green-led');
    rerender(<Display closed={true} />);
    expect(closedStatusEl).not.toHaveClass('green-led');
});

test('when unlocked, uses the green-led class for the locked-status div', () => {
    const { getByTestId, rerender } = render(<Display locked={false}/>);
    const lockedStatusEl = getByTestId('lockedStatus');
    expect(lockedStatusEl).toHaveClass('green-led');
    rerender(<Display locked={true} />);
    expect(lockedStatusEl).not.toHaveClass('green-led');
});

test('displays Closed if the closed prop is true', () => {
    const { getByText, rerender, queryByText} = render(<Display closed={true}/>);
    getByText(/closed/i);
    rerender(<Display closed={false} />);
    getByText(/open/i);   
});

test('displays Closed if the closed prop is true and Open if otherwise', () => {
    const { getByText, rerender } = render(<Display closed={true}/>);
    getByText(/closed/i);
    rerender(<Display closed={false} />);
    getByText(/open/i);   
});

test('displays Locked if the locked prop is true and Unlocked if otherwise', () => {
    const { getByText, rerender } = render(<Display locked={true}/>);
    getByText(/^locked$/i);
    rerender(<Display locked={false} />);
    getByText(/unlocked/i);   
});

