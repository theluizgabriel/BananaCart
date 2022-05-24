// 1. Implemente o módulo de acesso à api do Mercado Livre
export async function getCategories() {
  const resposta = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const respostaJson = await resposta.json();
  return respostaJson;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const resposta = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const respostaJson = await resposta.json();
  return respostaJson;
}
