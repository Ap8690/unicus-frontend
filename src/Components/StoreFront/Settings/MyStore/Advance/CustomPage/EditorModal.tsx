import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { defaultPrivacyText } from '../../../../../../Utilities/Util';

const EditorModal = ({show, setShow, key, advance, setAdvance, title}) => {
  const [editedValue, setEditedValue] = useState(advance[key])
  useEffect(() => {
    console.log("key", key)
  }, [key, show])
  
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Editor
          apiKey="hby5ed0sjo2htpw24mfkn2z980dqux7stt44b15hzmrxo63r"
          initialValue={defaultPrivacyText}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap preview anchor autosave save",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            autosave_ask_before_unload: true,
            autosave_interval: "30s",
            skin: "oxide",
          }}
          onEditorChange={(value, editor) => {
            setEditedValue(value)
            // console.log("edited", value);
            
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={()=>{setAdvance({...advance, [key]:editedValue}); setShow(false); console.log("sv", key, editedValue, advance)}}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditorModal