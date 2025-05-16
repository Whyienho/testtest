let data = [];

const audioSuccess = new Audio('assets/success.mp3');
const audioFail = new Audio('assets/fail.mp3');

fetch('kelulusan.json')
  .then(response => response.json())
  .then(json => data = json)
  .catch(error => console.error('Gagal memuat data:', error));

function cekKelulusan() {
  const nisn = document.getElementById('nisn').value.trim();
  const password = document.getElementById('password').value.trim();
  const hasilDiv = document.getElementById('hasil');
  const formContainer = document.getElementById('form-container');

  const result = data.find(item => item.NISN === nisn && item.PASSWORD === password);

  if (result) {
    formContainer.style.display = 'none';
    let isiMiniCard = '';

    if (result["STATUS KELULUSAN"].toLowerCase() === "lulus") {
      audioSuccess.play();
      isiMiniCard = `
        <div class="success">
          <i class="fas fa-check-circle"></i>
          <strong class="selamat-nama">Selamat, ${result["NAMA LENGKAP"]}</strong><br>
          Anda <strong>${result["STATUS KELULUSAN"]}</strong> Tes BTQ & Dapat Mengikuti Tes Selanjutnya
        </div>
        <a href="${result["LINK PDF"]}" target="_blank">
          <i class="fas fa-file-alt"></i> Cetak Kartu Tes
        </a>
        <br>
        <button id="backButton" onclick="kembali()">Kembali</button>
      `;
    } else {
      audioFail.play();
      isiMiniCard = `
        <div class="fail">
          <i class="fas fa-times-circle"></i>
          <strong class="selamat-nama">Mohon maaf, ${result["NAMA LENGKAP"]}</strong><br>
          Anda <strong>${result["STATUS KELULUSAN"]}</strong> Tes BTQ & Tidak Dapat Mengikuti Tes Selanjutnya
        </div>
        <br>
        <button id="backButton" onclick="kembali()">Kembali</button>
      `;
    }

    hasilDiv.innerHTML = `<div class="mini-card">${isiMiniCard}</div>`;
  } else {
    hasilDiv.innerHTML = `
      <div class="mini-card fail">
        <i class="fas fa-times-circle"></i> NISN atau Password salah.
      </div>
    `;
  }
}

function kembali() {
  const formContainer = document.getElementById('form-container');
  const hasilDiv = document.getElementById('hasil');
  formContainer.style.display = 'block';
  hasilDiv.innerHTML = '';
  document.getElementById('nisn').value = '';
  document.getElementById('password').value = '';
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter") cekKelulusan();
});

document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const icon = this;
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye", !isPassword);
  icon.classList.toggle("fa-eye-slash", isPassword);
});
