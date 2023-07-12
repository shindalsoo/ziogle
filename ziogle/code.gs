const doGet = (request)=>{
  return HtmlService.createTemplateFromFile(`index`).evaluate();
}

const onOpen = () =>{
  let ui = SpreadsheetApp.getUi();
  ui.createMenu(`지오유`)
    .addItem(`본 문서를 전자결재로 상신`, `openZioYou`)
    .addSeparator()
    .addSubMenu(ui.createMenu(`바로가기`)
      .addItem(`그룹웨어로 이동`, `openTab`)
    )
    .addToUi();
};

// openZioYou : 전자결재 상신
const openZioYou = () =>{
  let htmlOutput = HtmlService.createHtmlOutputFromFile(`index.html`).setWidth(1200).setHeight(800);
  
  SpreadsheetApp.getUi().showModalDialog(htmlOutput,`전자결재 상신`);
};

// openTab : 새 탭으로 링크 오픈
const openTab = () =>{
  let url = `http://www.zioyou.com`;
  
  //HTML 파일을 만듦
  let html = "<script>window.open('" + url + "');google.script.host.close();</script>";

  //HtmlOutput 객체를 만듦
  let userInterface = HtmlService.createHtmlOutput(html);

  //웹 페이지가 열리는 UI를 띄어줌  
  SpreadsheetApp.getUi().showModalDialog(userInterface, `로딩 중입니다.`);
};

//A1 셀에 텍스트 출력
const displayText = () =>{
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let cell = sheet.getRange(`A1`);

  cell.setValue(`성공적으로 상신되었습니다.`);
};

//취소 경고창
const cancelMessage = ()=>{
  let result = SpreadsheetApp.getUi().alert(
    "취소되었습니다.",
    SpreadsheetApp.getUi().ButtonSet.OK);
}

const alertMessage = () => {
  let result = SpreadsheetApp.getUi().alert(
    "정말 상신하겠습니까?", 
    SpreadsheetApp.getUi().ButtonSet.YES_NO);
 
  if (result === SpreadsheetApp.getUi().Button.YES) {
    // 확인 버튼을 클릭한 경우, displayText() 함수를 호출하여 처리
    displayText();
  } else if (result === SpreadsheetApp.getUi().Button.NO) {
    // 취소 버튼을 클릭한 경우, cancelMessage() 함수를 호출하여 처리
    cancelMessage();
  } else {
    // 확인 및 취소 버튼 외의 다른 결과인 경우, cancelMessage() 함수를 호출하여 처리
    cancelMessage();
  }
}
