import DOMPurify from "dompurify";

// filter error msg from failed register api response
const filterFormErrorMsg = (errorList = [], searchItem) => {
  const errorMsg = errorList.find((item) => item.path === searchItem);
  if (errorMsg) {
    return errorMsg.msg;
  } else {
    return null;
  }
};

// unsanitized html element
const unsanitized = (data) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = data;
  const decodeHtml = txt.value;
  const cleanHtml = DOMPurify.sanitize(decodeHtml);
  return cleanHtml;
};

export default { filterFormErrorMsg, unsanitized };
