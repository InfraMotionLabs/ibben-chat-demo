'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function speechResponse({ data }: { data: string }) {
  const response = await openai.audio.speech.create({
    model: 'tts-1-hd',
    voice: 'shimmer',
    input: data,
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  const base64Audio = buffer.toString('base64');
  return base64Audio;
  //   await fs.promises.writeFile(speechFile, buffer);
}

export default speechResponse;
