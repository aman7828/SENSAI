const { VertexAI } = require('@google-cloud/vertexai');

async function listModels() {
  const vertexAI = new VertexAI();
  const [models] = await vertexAI.models.list();
  console.log('Available models:');
  models.forEach(model => {
    console.log(`- ${model.name}`);
  });
}

listModels().catch(console.error);
