import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MyDropzone from './MyDropzone';
import Message from "./Message";
import { useSelector, useDispatch } from 'react-redux';
import { getMessages, postMessage } from '../store/message/actions';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import FormData from 'form-data';
import { browserName, browserVersion } from "react-device-detect";
import { AppDispatch } from '../store/StoreWrapper'
import { useFetchMessages } from './hooks/useFetchMessages';
import getUserIP from './util/GetUserIP';

export const Chat = (): JSX.Element => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [images, setImages] = useState<File[]>([]);
    const [username, setUsername] = useState('');
    const [userIp, setUserIP] = useState('');
    const userAgent = 'Browser Name: ' + browserName + ' | Browser Version: ' + browserVersion;
    
    useEffect(() => {
        (async () => {
            const data = await getUserIP();
            setUserIP(data.IPv4);
        })();
    }, [])


    console.log('User IP: ', userIp);
    console.log('User Agent: ', userAgent);

    const dispatch = useDispatch();
    const {
        isFetching,
        result: messages,
        success,
    } = useAppSelector((state) => state.getMessagesState);

    useFetchMessages(dispatch);

    const onSetImage = (droppedImages: File[]) => {
        setImages([...images, ...droppedImages])
    }

    const onClickSend = async () => {
        if (!editorState.getCurrentContent().hasText() && images.length === 0) {
            alert('Please write a message before submitting');
            return;
        }

        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const form = new FormData();

        form.append('content', content);
        images.forEach((image) => {
            form.append('images', image);
        });
        form.append('display_name', username);
        form.append('user_ip', userIp);
        form.append('user_agent', userAgent);

        await dispatch(postMessage(form));
        dispatch(getMessages())
        console.log('htmlText ', content);
        console.log('images - ', images);
        console.log('editorState - ', editorState);
        setEditorState(EditorState.createEmpty());
        setImages([]);
    }

    const onUsernameChange = (e: React.FocusEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    return (
        <>
            <h1 className="title">Shoutbox App</h1>
            <MyDropzone handleDrop={onSetImage} >
                <input
                    type='text'
                    name='text'
                    placeholder='Display your name as...'
                    value={username}
                    onChange={onUsernameChange}
                    className="displayName"
                />
                <>
                    {images.map((image) => <img src={URL.createObjectURL(image)} />)}
                    <Editor
                        editorState={editorState}
                        toolbarClassName="textEditorToolbar"
                        wrapperClassName="textEditor"
                        editorClassName="textInput"
                        onEditorStateChange={setEditorState}
                        placeholder='Type a message...'
                    />
                </>
            </MyDropzone>
            <button onClick={onClickSend} className="btn send-msg">Send message!</button>
            <hr />
            <br />
            <h3 className="recent-messages-title">Checkout the recent messages:</h3>
            <br/>
            <Message messages={messages} />
        </>
    );
    ;
};


