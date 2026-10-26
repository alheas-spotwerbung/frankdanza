/* Login a tutta pagina: validazione, accesso demo, transizione verso il profilo */
(function () {
  const { $, img, avatar, session, toast, M } = window.FD;

  document.addEventListener('DOMContentLoaded', () => {
    $('#auth-photo').innerHTML = img(M.heroDancer, 1100, 1400, { alt: 'Danzatrice in body nero durante un passo', eager: true, crop: 'entropy' });
    $('#auth-proof').innerHTML = `<span class="stack">${['marco-deluca', 'aurora-bianchi', 'carlos-rivera', 'beatrice-fontana'].map(id => avatar(id, 34)).join('')}</span>
      <span><b>12.400</b> tra insegnanti, ballerini e scuole già in sala</span>`;

    const params = new URLSearchParams(location.search);
    if (params.has('out')) toast('Hai effettuato l\'uscita. A presto in sala.', { ico: 'logout' });

    const form = $('#login'), email = $('#email'), pw = $('#password'), alertBox = $('#alert'), submit = $('#submit');
    const setErr = (input, el, msg) => { el.textContent = msg; input.setAttribute('aria-invalid', msg ? 'true' : 'false'); };

    $('#pw-toggle').addEventListener('click', (e) => {
      const show = pw.type === 'password';
      pw.type = show ? 'text' : 'password';
      e.currentTarget.textContent = show ? 'Nascondi' : 'Mostra';
      e.currentTarget.setAttribute('aria-pressed', String(show));
    });

    $('#fill-demo').addEventListener('click', () => {
      email.value = 'giulia@frankdanza.it';
      pw.value = 'danza2026';
      setErr(email, $('#email-err'), ''); setErr(pw, $('#pw-err'), '');
      submit.focus();
    });

    $('#forgot').addEventListener('click', (e) => {
      e.preventDefault();
      if (!/^\S+@\S+\.\S+$/.test(email.value)) { setErr(email, $('#email-err'), 'Scrivi la tua email e ti mandiamo il link per reimpostare la password.'); email.focus(); return; }
      toast(`Link inviato a ${window.FD.esc(email.value)}. Controlla anche lo spam.`, { ico: 'mail' });
    });

    const enter = () => {
      session.start($('#remember').checked);
      const next = params.get('next');
      const dest = next && /^[a-z]+\.html/.test(next) ? next : 'profile.html';
      if (window.FD.reduceMotion) { location.href = dest; return; }
      document.querySelector('.auth').classList.add('is-leaving');
      setTimeout(() => { location.href = dest; }, 650);
    };

    document.querySelectorAll('[data-sso]').forEach(b => b.addEventListener('click', () => {
      b.classList.add('is-loading');
      toast(`Accesso con ${b.dataset.sso} in corso…`, { ico: 'lock' });
      setTimeout(enter, 900);
    }));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alertBox.classList.remove('is-shown');
      let ok = true;
      if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) { setErr(email, $('#email-err'), 'Inserisci un indirizzo email valido.'); ok = false; } else setErr(email, $('#email-err'), '');
      if (pw.value.length < 6) { setErr(pw, $('#pw-err'), 'La password deve avere almeno 6 caratteri.'); ok = false; } else setErr(pw, $('#pw-err'), '');
      if (!ok) {
        alertBox.innerHTML = 'Controlla i campi evidenziati e riprova.';
        void alertBox.offsetWidth;
        alertBox.classList.add('is-shown');
        form.querySelector('[aria-invalid="true"]').focus();
        return;
      }
      submit.classList.add('is-loading');
      setTimeout(enter, 900);
    });

    [email, pw].forEach(i => i.addEventListener('input', () => i.setAttribute('aria-invalid', 'false')));
  });
})();
