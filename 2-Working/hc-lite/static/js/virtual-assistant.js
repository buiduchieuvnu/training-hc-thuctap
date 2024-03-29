(function () {
  "use strict";

  // Virtual Assistant by hieubd
  var toggleSwitch = document.getElementById("vaSwitch");
  var currentVa = localStorage.getItem("virtual-assistant");
  const btnVa = document.getElementById("btnVa");
  const microphone = document.querySelector('.va-microfone');
  const GG = new GoogleCloudService();
  const MSG_VA_HELLO = "Trợ lý ảo HC xin hân hạnh phục vụ quý khách.";
  const MSG_VA_BYE = "Trợ lý ảo HC xin tạm biệt quý khách. Hẹn gặp lại";
  const MSG_VA_UNKNOWN = "Xin lỗi HC không hiểu mệnh lệnh trên.";
  let datLichKham = false;

  if (currentVa) {
    document.documentElement.setAttribute("data-va", currentVa);
    if (currentVa === "on") {
      if (toggleSwitch) {
        toggleSwitch.checked = true;
        btnVa.style.display='block';
      }
    }
  }

  function switchVa(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-va", "on");
      localStorage.setItem("virtual-assistant", "on");
      btnVa.style.display='block';
      GG.speech(MSG_VA_HELLO, 1);
      console.log('virtual-assistant | on');
    } else {
      document.documentElement.setAttribute("data-va", "off");
      localStorage.setItem("virtual-assistant", "off");
      btnVa.style.display='none';
      GG.speech(MSG_VA_BYE, 1);
      console.log('virtual-assistant | off');
    }
  }

  if (toggleSwitch) {
    toggleSwitch.addEventListener("change", switchVa, false);

    toggleSwitch.addEventListener("click", function () {
      console.log('virtual-assistant | click');
    });
  }

  // Tro ly ao
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  const synth = window.speechSynthesis;
  recognition.lang = 'vi-VI';
  recognition.continuous = false;

  const speak = (text) => {
      if (synth.speaking) {
          console.error('Busy. Speaking...');
          return;
      }

      const utter = new SpeechSynthesisUtterance(text);

      utter.onend = () => {
          console.log('SpeechSynthesisUtterance.onend');
      }
      utter.onerror = (err) => {
          console.error('SpeechSynthesisUtterance.onerror', err);
      }

      synth.speak(utter);
  };

  microphone.addEventListener('click', (e) => {
    e.preventDefault();

    recognition.start();
    microphone.classList.add('recording');
  });

  const handleVoice = (text) => {
      const handledText = text.toLowerCase();
      console.log('text', text);

      if (handledText.includes('mấy giờ')) {
          const textToSpeech = `Bây giờ là ${moment().hours()} giờ ${moment().minutes()} phút`;
          GG.speech(textToSpeech, 1);
          //speak(textToSpeech);
          return;
      }

      if (handledText.includes('ở đấy không')) {
          const textToSpeech = `Em vẫn đang đợi yêu cầu từ quý khách.`;
          GG.speech(textToSpeech, 1);
          //speak(textToSpeech);
          return;
      }

      if (handledText.includes('thống kê') && handledText.includes('tổng số') && handledText.includes('bệnh nhân') && handledText.includes('trong ngày')) {
          const textToSpeech = `Tổng số bệnh nhân trong ngày phòng khám tiếp nhận là: 175 bệnh nhân`;
          GG.speech(textToSpeech, 1);
          //speak(textToSpeech);
          return;
      }

      if (handledText.includes('thống kê') && handledText.includes('tổng số') && handledText.includes('bệnh nhân') && handledText.includes('trong tuần')) {
          const textToSpeech = `Tổng số bệnh nhân trong tuần phòng khám tiếp nhận là: 1870 bệnh nhân`;
          GG.speech(textToSpeech, 1);
          //speak(textToSpeech);
          return;
      }

      if (handledText.includes('thống kê') && handledText.includes('tổng số') && handledText.includes('bệnh nhân') && handledText.includes('đang khám')) {
          const textToSpeech = `Tổng số bệnh nhân đang khám là: 30 bệnh nhân`;
          GG.speech(textToSpeech, 1);
          //speak(textToSpeech);
          return;
      }

      if (handledText.includes('đi đến') && handledText.includes('danh sách khám')) {
          window.location.href = 'hc-ds-kham.html';;
          //speak(textToSpeech);
          return;
      }

      if (handledText.includes('đi đến') && handledText.includes('kho thuốc')) {
          window.location.href = 'hc-page-medicine.html';;
          //speak(textToSpeech);
          return;
      }

      if (handledText.includes('đăng xuất')) {
          window.location.href = 'hc-login.html';;
          //speak(textToSpeech);
          return;
      }


      if (handledText.includes('đặt lịch khám')){
        datLichKham = true;
        speak('Chào bạn, bạn muốn đặt lịch khám tại phòng khám nào?');
        return;
      }

      if (handledText.includes('phòng khám') && datLichKham){
        speak(`Trợ lý ảo sẽ chuyển quý khách tới địa chỉ đặt lịch phòng khám ${handledText.substring('phòng khám '.length)}, vui lòng điền thông tin đặt lịch mong muốn. Xin cảm ơn quý khách`);
        window.location.href = 'https://homeclinic.vncare.vn/hen-kham';
        return;
      }

      GG.speech(MSG_VA_UNKNOWN, 1);
  }

  recognition.onspeechend = () => {
      recognition.stop();
      microphone.classList.remove('recording');
  }

  recognition.onerror = (err) => {
      console.error(err);
      microphone.classList.remove('recording');
  }

  recognition.onresult = (e) => {
    console.log('onresult', e);
    const text = e.results[0][0].transcript;
    handleVoice(text);
}


})();