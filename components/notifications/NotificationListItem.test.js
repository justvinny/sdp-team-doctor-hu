import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NotificationListItem from './NotificationListItem';

test("Tests if notification list item renders correctly", () => {
    const mockData = {
        type: "message",
        isRead: false,
        content: "Test message.",
        timestamp: 1631615638522
    }

    const { getByText} = render(<NotificationListItem notification={mockData} />);

    const title = getByText("New message"); // Title of all message notifications based on type
    const content = getByText("Test message."); // Actual message
    const date = getByText("14/9/2021 - 10:33 PM"); // Converted from timestamp

    expect(title).toBeTruthy();
    expect(content).toBeTruthy();
    expect(date).toBeTruthy();
});

test("Check if notification item is clickable as we need it to navigate to different screens.", () => {
    const mockFunction = jest.fn();
    const mockData = {
        type: "message",
        isRead: false,
        content: "Test message.",
        date: 1631615638522
    }
    
    const { getByText, debug} = render(<NotificationListItem notification={mockData} notificationClick={mockFunction}/>);

    const button = getByText("Test message.");
    fireEvent.press(button);
    expect(mockFunction).toHaveBeenCalled(); 
});