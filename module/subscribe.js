import { ICON, POPUP, GLOBAL } from "./variable.js";

let targetsrc;

function checkSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  return targetNews.is_subscribe === "true" ? true : false;
}

function clickSubscribeBtn(src) {
  if (checkSubscribe(src) === true) {
    showAlert(src);
    targetsrc = src;
    return "true";
  } else {
    return toggleSubscribe(src);
  }
}

function toggleSubscribe(src) {
  const targetNews = findTargetNewsFromSrc(src);
  targetNews.is_subscribe = targetNews.is_subscribe === "true" ? "false" : "true";
  if (targetNews.is_subscribe === "true") {
    showSnackBar(targetNews.is_subscribe);
  }
  return targetNews.is_subscribe;
}

function findTargetNewsFromSrc(src) {
  for (let news of GLOBAL.NEWS_DATA) {
    if (news.path.slice(-6) === src.slice(-6)) {
      return news;
    }
  }
}

function showSnackBar(isSubscribe) {
  if (isSubscribe === "false") return;

  GLOBAL.DOM.SNACK_BAR.style.display = "block";
  window.setTimeout(() => {
    GLOBAL.DOM.SNACK_BAR.style.display = "none";
  }, POPUP.SNACK_BAR_TIME);
}

function showAlert(src) {
  const targetNews = findTargetNewsFromSrc(src);
  GLOBAL.DOM.ALERT.querySelector(".alert-main-press").innerHTML = targetNews.name;
  GLOBAL.DOM.ALERT.style.display = "flex";
}

function alertBtnHandler(event) {
  GLOBAL.DOM.ALERT.style.display = "none";
  if (event.target.classList[0] === "yes-btn") {
    toggleSubscribe(targetsrc);
  }
}

function makeSubscribeBtn(src) {
  const isSubscribe = checkSubscribe(src);
  const subscribeBtn = document.createElement("button");
  subscribeBtn.className = "list-sub-btn";
  const subscribeImg = document.createElement("img");
  subscribeImg.src = isSubscribe ? ICON.X : ICON.PLUS;
  const subscribeSpan = document.createElement("span");
  subscribeSpan.className = "available-medium12";
  subscribeSpan.innerHTML = isSubscribe ? "해지하기" : "구독하기";
  subscribeBtn.appendChild(subscribeImg);
  subscribeBtn.appendChild(subscribeSpan);

  subscribeBtn.addEventListener("click", (event) => {
    const target = event.target.localName === "button" ? event.target.parentNode.firstChild : event.target.parentNode.parentNode.firstChild;
    const result = clickSubscribeBtn(target.src);
    target.nextSibling.childNodes[0].src = result === "true" ? ICON.X : ICON.PLUS;
    target.nextSibling.childNodes[1].innerHTML = result === "true" ? "해지하기" : "구독하기";
  });

  return subscribeBtn;
}

export { alertBtnHandler, makeSubscribeBtn };
