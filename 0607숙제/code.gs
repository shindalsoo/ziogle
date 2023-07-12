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

const openZioYou = () =>{
  let htmlOutput = HtmlService.createHtmlOutputFromFile(`index.html`).setWidth(1200).setHeight(800);
  
  SpreadsheetApp.getUi().showModalDialog(htmlOutput,`전자결재 상신`);
}

const alertMessage=()=>{
  let result = SpreadsheetApp.getUi().alert(
    "성공적으로 상신되었습니다.",
    SpreadsheetApp.getUi().ButtonSet.OK);

  if (result == SpreadsheetApp.getUi().ButtonSet.OK){
    SpreadsheetApp.getActive().toast(result);
  }
}