
async function buscar() {
  const username = document.getElementById('user').value.trim();
  const resultado = document.getElementById('resultado');

  if (!username) {
    alert('Digite o nome de usuário do Lichess');
    return;
  }

  const url = `https://lichess.org/api/user/${username}`;

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error('Usuário não encontrado');
    const data = await resposta.json();

    resultado.innerHTML = `
      <p><strong>Usuário:</strong> ${data.username}</p>
      <p><strong>Blitz:</strong> ${data.perfs.blitz.rating} (${data.perfs.blitz.games} partidas)</p>
      <p><strong>Bullet:</strong> ${data.perfs.bullet.rating} (${data.perfs.bullet.games} partidas)</p>
      <p><strong>Rápido:</strong> ${data.perfs.rapid.rating} (${data.perfs.rapid.games} partidas)</p>
      <p><strong>Clássico:</strong> ${data.perfs.classical.rating} (${data.perfs.classical.games} partidas)</p>
      <p><strong>Conta criada:</strong> ${new Date(data.createdAt).toLocaleDateString()}</p>
      <p><strong>Último acesso:</strong> ${new Date(data.seenAt).toLocaleDateString()}</p>
    `;
    resultado.classList.remove("d-none");
  } catch (err) {
    resultado.innerHTML = `<p class="text-danger">${err.message}</p>`;
    resultado.classList.remove("d-none");
  }
}
