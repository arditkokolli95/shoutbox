import React from 'react';
import MessageType from './MessageType';

interface Props { messages: MessageType[] };

function Message({ messages }: Props) {
    return (
        <div className="messagesWindow">
            {messages.map((message) => {
                console.log(message);
                const postTime = message.created_at;
                console.log('message.content - ', message.content);
                console.log('postTime: ', postTime);

                return (<div className="messageWrapper" key={message.id}>
                    {<p className="display-name">{!!message.display_name ? message.display_name + ':' : 'Anonymous:'}</p>}
                    {message.content && message.content !== '' && message.content !== '<p></p>\n' && <div className="chat-bubble" dangerouslySetInnerHTML={{ __html: message.content }} />}
                    {message.images && message.images.split(';').map((image) => <img key={image} src={`http://localhost:5000/static/images/${image}`} />)}
                    {postTime && <p className="message-post-time">Posted on {new Date(postTime).toLocaleDateString()} at {new Date(postTime).toLocaleTimeString()}</p>}
                </div>
                );
            })}
        </div>
    );
}

export default Message;
