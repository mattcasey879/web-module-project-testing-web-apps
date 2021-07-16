import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const item = screen.queryByText(/contact form/i)
    expect(item).toBeInTheDocument()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText('First Name*')
        userEvent.type(firstNameInput, 'We');
        const firstNameError = screen.getByText(/firstName must have at least 5 characters./)
        expect(firstNameError).toBeInTheDocument()
    

    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const firstNameInput = screen.getByLabelText('First Name*')
    const MessageInput = screen.getByLabelText('Message')
    const EmailInput = screen.getByLabelText('Email*')
    userEvent.type(firstNameInput, '1')
    userEvent.type(MessageInput, '')
    userEvent.type(EmailInput, '')
    expect(screen.getByText(/firstName must have at least 5 characters./i)).toBeInTheDocument()
    expect(screen.getByText(/email must be a valid email address./i)).toBeInTheDocument()
    expect(screen.getByText(/message is a required field./i)).toBeInTheDocument()

    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});