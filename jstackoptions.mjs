const INPUT_STYLE = 'width: 100%; padding: 5px; border-radius: 5px; border: 1px solid #ccc;';
const LABEL_STYLE = 'display: block; margin-bottom: 10px;';

function createLabel(content) {
  return `<label style="${LABEL_STYLE}">${content}</label>`;
}

function createInput(type, id, name) {
  return `<input style="${INPUT_STYLE}" type="${type}" id="${id}" name="${name}">`;
}

function createCheckbox(id, name, value) {
  return `<input style="${INPUT_STYLE}" type="checkbox" name="${name}" id="${id}" value="${value}">`;
}

function createSelect(id, name, options) {
  const selectOptions = options.map(option => `<option value="${option}">${option}</option>`).join('');
  console.log(selectOptions)
  return `<select style="${INPUT_STYLE}" id="${id}" name="${name}">${selectOptions}</select>`;
}

function getProcessID() {
  const urlParams = new URLSearchParams(window.location.search);
  let pidStrings = ["node1:1234", "node2:4567"];

  try {
    const urlPidStrings = urlParams.get("pidstring");
    if (urlPidStrings) {
      pidStrings = JSON.parse(urlPidStrings);
    }
  } catch (err) {
    console.log("Error in getting pidstring from URL");
  }

  const selectHtml = createSelect('jProcID', 'jProcID', pidStrings);
  return createLabel(`Select Node name / Proc ID: ${selectHtml}`);
}

function getNumStacks() {
  const inputHtml = createInput('number', 'jNumStacks', 'jNumStacks');
  return createLabel(`Number of JStacks: ${inputHtml}`);
}

function getStackIntervals() {
  const inputHtml = createInput('number', 'jWaitTime', 'jWaitTime');
  return createLabel(`Wait time bw consec. JStacks: ${inputHtml}`);
}

function getFOpt() {
  const checkboxHtml = createCheckbox('jFopt', 'jFopt', 'true');
  return createLabel(`Use -F option: ${checkboxHtml}`);
}

function getThreadRegex() {
  const inputHtml = createInput('text', 'jRegexThrd', 'jRegexThrd');
  return createLabel(`Only show threads that match this regex: ${inputHtml}`);
}

function getClassRegex() {
  const inputHtml = createInput('text', 'jRegexCls', 'jRegexCls');
  return createLabel(`Only show classes that match this regex: ${inputHtml}`);
}

function getIncludeRaw() {
  const checkboxHtml = createCheckbox('jRawStack', 'jRawStack', 'true');
  return createLabel(`Include raw JStacks: ${checkboxHtml}`);
}

function getAllJStackOptions() {
  const options = [
    getProcessID(),
    getNumStacks(),
    //getStackIntervals(),
    //getFOpt(),
    getThreadRegex(),
    getClassRegex(),
    //getIncludeRaw()
  ];

  return options.join('');
}

export default getAllJStackOptions;
