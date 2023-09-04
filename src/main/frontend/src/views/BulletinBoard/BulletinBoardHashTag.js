import React, { useRef, useState } from "react";
import "@yaireo/tagify/dist/tagify.css";
import Tagify from "@yaireo/tagify/dist/react.tagify";
import {} from "@coreui/react";

import "./css/BulletinBoardHashTag.css";
const baseTagifySettings = {
  blacklist: [],
  maxTags: 6,
  backspace: "edit",
  placeholder: "해시태그를 입력해보세요! 최대 6개 까지 가능합니다.",
  editTags: 1,
  dropdown: {
    maxItems: 20, // 드롭다운 메뉴에서 몇개 정도 항목을 보여줄지
    classname: "tags-look", // 드롭다운 메뉴 엘리먼트 클래스 이름. 이걸로 css 선택자로 쓰면 된다.
    enabled: 1, // 단어 몇글자 입력했을떄 추천 드롭다운 메뉴가 나타날지
    closeOnSelect: true, // 드롭다운 메뉴에서 태그 선택하면 자동으로 꺼지는지 안꺼지는지
  },
  callbacks: {},
};

function TagField({
  label,
  name,
  initialValue = [],
  suggestions = [],
  onChange,
}) {
  const handleChange = (e) => {
    const newTags = e.detail.tagify.value.map((item) => item.value);
    onChange(newTags);
  };

  const settings = {
    ...baseTagifySettings,
    whitelist: suggestions,
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      edit: handleChange,
      invalid: handleChange,
      click: handleChange,
      focus: handleChange,
      "edit:updated": handleChange,
      "edit:start": handleChange,
    },
  };

  return (
    <div className="form-group">
      <label htmlFor={"field-" + name}>{label}</label>
      <Tagify
        settings={settings}
        value={initialValue.join(",")}
        onAdd={handleChange}
        onRemove={handleChange}
        onBlur={handleChange}
        // ... other events ...
      />
    </div>
  );
}

function BulletinBoardHashTag({ onHashTagChange, value }) {
  const suggestions = [
    "급여",
    "연봉",
    "연차",
    "공지사항",
    "영업팀",
    "인사팀",
    // ... other suggestions ...
  ];

  const initialValue = value ? value.split(",") : [];

  return (
    <div className="BulletinBoardHashTag">
      <TagField
        initialValue={initialValue}
        suggestions={suggestions}
        onChange={onHashTagChange} // Pass the onChange function from parent
      />
    </div>
  );
}
export default BulletinBoardHashTag;
