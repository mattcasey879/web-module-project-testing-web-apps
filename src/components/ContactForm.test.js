import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/First Name*/i)
        userEvent.type(firstNameInput, 'We');
        const firstNameError = await screen.findAllByTestId('error')
        expect(firstNameError).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />);
  const button = screen.getByRole('button')
  userEvent.click(button);
  const errormsg = await screen.findAllByTestId('error');
  expect(errormsg).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole('button');
    const firstNameInput = screen.getByLabelText(/First Name*/i)
    const LastNameInput = screen.getByLabelText(/Last Name*/i)
    userEvent.type(firstNameInput,'Matthew');
    userEvent.type(LastNameInput,'Casey');
    userEvent.click(button);
    const errormsg = await screen.getAllByTestId('error');
    expect(errormsg).toHaveLength(1);
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, 'asdfasdfa');
    const errorMsg = await screen.findByText(/email must be a valid email address/i);
    expect(errorMsg).toBeInTheDocument();
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const FirstNameInput = screen.getByLabelText(/first name*/i);
        userEvent.type(FirstNameInput, 'Matthew');

    const EmailInput = screen.getByLabelText(/email*/i);
        userEvent.type(EmailInput, 'mattcasey879@gmail.com');

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMsg = await screen.findByText(/lastName is a required field/i)
    expect(errorMsg).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)
    const firstNameInput = screen.getByLabelText(/first name*/i);
        userEvent.type(firstNameInput, 'Matthew');
        
    const lasttNameInput = screen.getByLabelText(/last name*/i);
        userEvent.type(lasttNameInput, 'Casey');
    
    const emailInput = screen.getByLabelText(/email*/i)
        userEvent.type(emailInput, 'mattcasey879@gmail.com');
    
    const button = screen.getByRole('button');
        userEvent.click(button);
    
     waitFor(()=> {
        const firstName = screen.queryByText('Matthew');
        const lastName = screen.queryByText('Casey');
        const email = screen.queryByText('mattcasey879@gmail.com');
        const message = screen.getAllByTestId('messageDisplay');
        
        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(message).not.toBeInTheDocument();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstNameInput = screen.getByLabelText(/first name*/i);
        userEvent.type(firstNameInput, 'Matthew');
        
    const lasttNameInput = screen.getByLabelText(/last name*/i);
        userEvent.type(lasttNameInput, 'Casey');
    
    const emailInput = screen.getByLabelText(/email*/i)
        userEvent.type(emailInput, 'mattcasey879@gmail.com');

    const messageInput = screen.getByLabelText(/message/i)
        userEvent.type(messageInput, 'This is my message. YAY')
    
    const button = screen.getByRole('button');
        userEvent.click(button);
    
     waitFor(()=> {
        const firstName = screen.queryByText('Matthew');
        const lastName = screen.queryByText('Casey');
        const email = screen.queryByText('mattcasey879@gmail.com');
        const message = screen.getAllByTestId('messageDisplay');
        
        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(message).toBeInTheDocument();
    })
});