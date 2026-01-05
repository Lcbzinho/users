
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

    // Função auxiliar para retornar dados ou 'N/A' se não existir
    const getStats = (type) => {
      const perf = data.perfs?.[type];
      if (perf) {
        return `${perf.rating} (${perf.games} partidas)`;
      }
      return 'Sem dados';
    };

    resultado.innerHTML = `
      <p><strong>Usuário:</strong> ${data.username}</p>
      <p><strong>Blitz:</strong> ${getStats('blitz')}</p>
      <p><strong>Bullet:</strong> ${getStats('bullet')}</p>
      <p><strong>Rápido:</strong> ${getStats('rapid')}</p>
      <p><strong>Clássico:</strong> ${getStats('classical')}</p>
      <p><strong>Conta criada:</strong> ${new Date(data.createdAt).toLocaleDateString()}</p>
      <p><strong>Último acesso:</strong> ${new Date(data.seenAt).toLocaleDateString()}</p>
    `;
    resultado.classList.remove("d-none");
  } catch (err) {
    resultado.innerHTML = `<p class="text-danger">${err.message}</p>`;
    resultado.classList.remove("d-none");
  }
}
