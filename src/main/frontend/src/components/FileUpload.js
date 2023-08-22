import React from 'react';
import Dropzone from 'react-dropzone';

const FileUpload = ({ onImageChange, images }) => {
    const handleDrop = (acceptedFiles) => {
        onImageChange([...images, ...acceptedFiles]);
    };

    const handleDelete = (image) => {
        const updatedImages = images.filter((img) => img !== image);
        onImageChange(updatedImages);
    };

    return (
        <div className='flex gap-4'>
            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section className='min-w-[300px] h-[300px] border flex items-center justify-center'>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className='text-3xl'>+</p>
                        </div>
                    </section>
                )}
            </Dropzone>

            <div className='flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden'>
                {images.map((image, index) => (
                    <div key={index} onClick={() => handleDelete(image)}>
                        <img className='min-w-[300px] h-[300px]' src={URL.createObjectURL(image)} alt={image.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
