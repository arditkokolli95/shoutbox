import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MyDropzone from './MyDropzone';
import Message from "./Message";
import { useSelector, useDispatch } from 'react-redux';
import { getMessages, postMessage, cleanMessages } from '../store/message/actions';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import FormData from 'form-data';
import { browserName, browserVersion } from "react-device-detect";

let interval: NodeJS.Timeout;

export const Chat = (): JSX.Element => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [images, setImages] = useState<File[]>([]);
    const [username, setUsername] = useState('');
    const [userIp, setUserIP] = useState('');
    const userAgent = 'Browser Name: ' + browserName + ' | Browser Version: ' + browserVersion;



    async function getUserIP() {
        const response = await fetch('https://geolocation-db.com/json/');
        const data = await response.json();
        setUserIP(data.IPv4);
    }

    getUserIP();

    console.log('User IP: ', userIp);
    console.log('User Agent: ', userAgent);

    const dispatch = useDispatch();
    const {
        isFetching,
        result: messages,
        success,
    } = useAppSelector((state) => state.getMessagesState);

    useEffect(() => {
        interval = setInterval(() => {
            dispatch(getMessages())
        }, 25000)
        return () => {
            if (interval) clearInterval(interval);
            dispatch(cleanMessages())
        };
    }, [getMessages, cleanMessages]);

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
            <hr></hr>
            <Message messages={messages} />
        </>
    );
    ;
};
