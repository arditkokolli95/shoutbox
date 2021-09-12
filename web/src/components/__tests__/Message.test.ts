import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from '../Message';
import MessageType from '../MessageType';

const DEFAULT_PROPS = {
};

const makeComponent = (props: { messages: MessageType[]}) =>
  React.createElement(Message, { ...DEFAULT_PROPS, ...props });


describe('<Message />', () => {
    let messages: MessageType[];
    beforeEach(() =>{
        messages=[];
    })
    it('renders Anonymous when no display name is provided', () => {
        messages = [{
            id: 1,
            content : '<p><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: Open Sans", Arial, sans-serif;">Cras aliquet sapien ut metus vehicula facilisis. In eu nibh viverra, pretium nulla vitae, porttitor tortor.</span>&nbsp;&nbsp;</p>',
            created_at:  new Date('2021-09-11T19:37:29.000Z'),
            images: 'shoutbox_1631405162223_IMG_1756.JPG;shoutbox_1631405162223_IMG_3180.JPG',
            display_name: ''
        }];
        render(makeComponent({messages}));
        const linkElement = screen.getByText(/Anonymous:/i);
        expect(linkElement).toBeInTheDocument();
    });
    it('renders no chat bubble when no message is provided', () => {
        messages = [{
            id: 1,
            content : '',
            created_at:  new Date('2021-09-11T19:37:29.000Z'),
            images: 'shoutbox_1631405162223_IMG_1756.JPG;shoutbox_1631405162223_IMG_3180.JPG',
            display_name: 'Baba'
        }];
        const { container } = render(makeComponent({messages}));
        const chatBubbles = container.querySelector('div.chat-bubble');
        expect(chatBubbles).toBeNull() // it doesn't exist
    });
})

  