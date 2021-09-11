import React from 'react';
import MessageType from './MessageType';

interface Props {messages: MessageType[]};

function Message({messages}: Props) {
    return (
        <div className="messagesWindow">
            {messages.map((message) => {
                console.log(message);
                const postTime = message.created_at;
                console.log('message.content - ',message.content);

                return (<div className="messageWrapper">
                    { <p className="display-name">{message.display_name!=='' ? message.display_name+':': 'Anonymous:'}</p> }
                    {message.content && message.content !== '' && message.content !== '<p></p>' && <div className="chat-bubble" dangerouslySetInnerHTML={{ __html: message.content }} />}
                    {message.images && message.images.split(';').map((image) => <img src={`http://localhost:5000/static/images/${image}`} />)}
                    {postTime && <p className="message-post-time">{postTime}</p>}
                </div>
                );
            })}
        </div>
    );
}

export default Message;
