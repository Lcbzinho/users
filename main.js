
async function buscar() {
  const username = document.getElementById('user').value.trim();
  const resultado = document.getElementById('resultado');

  if (!username) {
    alert('Digite o nome de usuário do GitHub');
    return;
  }

  const url = `https://api.github.com/users/${username}`;

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error('Usuário não encontrado');
    const data = await resposta.json();

    resultado.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <img src="${data.avatar_url}" alt="Avatar" width="80" height="80" style="border-radius: 50%;">
        <div>
           <h2 style="margin: 0;">${data.name || data.login}</h2>
           <a href="${data.html_url}" target="_blank" style="color: #4da6ff;">@${data.login}</a>
        </div>
      </div>
      <p><strong>Repositórios públicos:</strong> ${data.public_repos}</p>
      <p><strong>Seguidores:</strong> ${data.followers}</p>
      <p><strong>Seguindo:</strong> ${data.following}</p>
      <p><strong>Localização:</strong> ${data.location || 'Não informada'}</p>
      <p><strong>Conta criada:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>
    `;
    resultado.classList.remove("d-none");
  } catch (err) {
    resultado.innerHTML = `<p class="text-danger">${err.message}</p>`;
    resultado.classList.remove("d-none");
  }
}
