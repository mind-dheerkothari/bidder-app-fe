import React, { useEffect, useRef, useState } from "react";
import "./customEditor.css";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FormGroup, Label } from "reactstrap";
import { htmlToText } from "../../utils/commonFunction";

export default function CustomEditor({
  label,
  name,
  value,
  placeholder = "Write something...",
  required = false,
  onChange,
  theme = "snow",
  readOnly = false,
  error,
  maxLength,
}) {
  const [charCount, setCharCount] = useState(0);
  const quillRef = useRef(null);
  const lastContentRef = useRef(value || "");

  useEffect(() => {
    const text = htmlToText(value)
    setCharCount(text.length);
  }, [value]);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const handleTextChange = (source) => {
      const text = quill.getText().trim();
      if (text.length > maxLength) {
        quill.root.innerHTML = lastContentRef.current;
      } else {
        const html = quill.root.innerHTML;
        lastContentRef.current = html;
        if (name) {
          onChange(html, name);
        } else {
          onChange(html);
        }
      }
    };
    quill.on("text-change", handleTextChange);
    return () => {
      quill.off("text-change".handleTextChange);
    };
  }, [maxLength, onChange, name]);

  return (
    <div className="custom-editor-wrapper position-relative">
      <FormGroup>
        {label && (
          <Label className="form-label !text-black !font-bold !m-0 !mb-[5px]">
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </Label>
        )}
        <ReactQuill
          theme={theme}
          value={value}
          onChange={() => {}}
          readOnly={readOnly}
          placeholder={placeholder}
          ref={quillRef}
        />
        {error && <div className="invalid-feedback d-block">{error}</div>}
        {/* Char count */}
        {maxLength && (
          <div className="absolute bottom-2 right-4 text-[0.85rem] text-[#6c757d] pointer-events-none">
            {charCount} / {maxLength}
          </div>
        )}
      </FormGroup>
    </div>
  );
}
