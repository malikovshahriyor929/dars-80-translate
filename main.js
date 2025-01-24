let BASE_URL = "https://lingva.ml/api/v1"; //ru/uz/Привет
let source_text = document.querySelector("#source-text");
let target_text = document.querySelector("#target-text");
let source_language = document.querySelector("#source-language");
let target_language = document.querySelector("#target-language"); //target-language
let translateBTN = document.querySelector("#translateBTN");
let copyBtnTarget = document.querySelector("#copyBtnTarget");
let copyBtnSource = document.querySelector("#copyBtnSource");
let loading = document.querySelector(".loading"); //loading
function loader(boolean) {
  boolean ? (loading.style.display = "flex") : (loading.style.display = "none");
}

translateBTN.addEventListener("click", (e) => {
  if (source_text.value.trim() == "") {
    return alert("iltimos nimadur yozin");
  }
  loader(true);
  fetch(
    `${BASE_URL}/${source_language.value}/${target_language.value}/${source_text.value}`
  )
    .then((data) => data.json())
    .then((data) => {
      target_text.value = data.translation;
      loader(false);
    });


});

copyBtnSource.addEventListener("click", () => {
    if (source_text.value.trim() == "") {
        return alert("iltimos text yozin");
      }
    myFunction(source_text);
  });
  copyBtnTarget.addEventListener("click", () => {
    if (source_text.value.trim() == "") {
        return alert("iltimos text yozin");
      }
    myFunction(target_text);
  });
function myFunction(inputElement) {
  navigator.clipboard.writeText(inputElement.value).then(() => {
    alert("Copied the text:  " + inputElement.value);
  });
}



const voiceSelect = document.getElementById("voiceSelect");
const synth = window.speechSynthesis;

function populateVoices() {
  const voices = synth.getVoices(); // Get available voices
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = index;
    voiceSelect.appendChild(option);
  });
}

function textToSpeech(source_text) {
  const speech = new SpeechSynthesisUtterance(source_text);
  const selectedVoiceIndex = voiceSelect.value;
  const voices = synth.getVoices();
  speech.voice = voices[selectedVoiceIndex]; // Set the selected voice
  synth.speak(speech);
}

// Populate the voice list when available
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = populateVoices;
}
let speakButton = document.querySelector("#speakButton")
let speakButton2 = document.querySelector("#speakButton2")
speakButton.addEventListener("click", () => {

  if (source_text.value.trim() !== "") {
    textToSpeech(source_text.value);
  } else {
    alert("Please enter some text to speak!");
  }
  
});
speakButton2.addEventListener("click", () => {

    if (target_text.value.trim() !== "") {
      textToSpeech(target_text.value);
    } else {
      alert("Please enter some text to speak!");
    }
    
  });
