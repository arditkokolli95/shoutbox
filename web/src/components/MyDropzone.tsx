import React, { useMemo,useCallback, FC } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
    handleDrop: (files: File[]) => void;
    children?: React.ReactChild | React.ReactChild[];
};


const MyDropzone = ({ children, handleDrop }: Props): JSX.Element => {
    const onDrop = useCallback(acceptedFiles => {
        handleDrop(acceptedFiles)
    }, [handleDrop]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true, multiple: true });

    return (
        <div {...getRootProps()} className={isDragActive ? "dropZone isDropping": "dropZone"}>
            <input {...getInputProps()} />
            {isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>}
            {children}
        </div>
    );
};

export default MyDropzone;
