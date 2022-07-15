import { useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { ReactComponent as BiEdit } from './BiEdit.svg'
import { withRouter } from './withRouter'

const UploadField = (props) => {
    // styles
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: 'var(--text_default_pure)',
        borderStyle: 'dashed',  
        backgroundColor: 'transparent',
        color: 'var(--text_default_pure)',
        outline: 'none',
        transition: 'border .24s ease-in-out',
    }

    const activeStyle = {
        borderColor: '#2196f3',
    }

    const acceptStyle = {
        borderColor: '#00e676',
    }

    const rejectStyle = {
        borderColor: '#ff1744',
    }

    //   ###############################################################3333
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles,
        fileRejections,
    } = useDropzone({ maxFiles: props.match.path === '/create-nft' ? 1 : 15 })

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    )

    useEffect(() => {
        props.setImageSrc(acceptedFiles)
    }, [acceptedFiles])

    const acceptedFileItems = acceptedFiles.map((file) => (
        <li className='fileName' key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ))

    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        return (
            <>
                <li className='fileName' key={file.path}>
                    {file.path} - {file.size} bytes
                </li>
                {errors.map((e) => (
                    <p className='fileNameError' key={e.code}>
                        {e.message}
                    </p>
                ))}
            </>
        )
    })

    return !props.profile ? (
        <div className='upload__field'>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p style={{ fontWeight: 500 }}>
                    Drag 'n' drop some files here, or click to select files
                </p>
                <p style={{ fontWeight: 500 }}>
                    (Only *.jpeg, *.png, *.gif, *.jpg, *.mp4 images will be
                    accepted)
                </p>
            </div>
            <aside className='mt-3'>
                <h6>Files</h6>
                <ul>{acceptedFileItems}</ul>
                <ul>{fileRejectionItems}</ul>
            </aside>
        </div>
    ) : (
        <div className='upload_icon' {...getRootProps()}>
            <input {...getInputProps()} />
            <BiEdit />
        </div>
    )
}

export default withRouter(UploadField)